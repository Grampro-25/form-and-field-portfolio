import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { validateContact, type ContactData } from "@/lib/contact";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    let allowed = false;
    try {
      const incoming = new URL(origin);
      const target = new URL(request.url);
      const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || target.host;
      allowed = incoming.host === host;
      if (process.env.NODE_ENV !== "production" && ["localhost", "127.0.0.1", "[::1]"].includes(incoming.hostname) && incoming.port === target.port) allowed = true;
    } catch { allowed = false; }
    if (!allowed) return NextResponse.json({ message: "Please send your enquiry from this website." }, { status: 403 });
  }
  let data: ContactData;
  try {
    const raw = await request.text();
    if (raw.length > 20000) return NextResponse.json({ message: "Your enquiry is too long. Please shorten the note." }, { status: 413 });
    const input = JSON.parse(raw);
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid data");
    data = Object.fromEntries(["mode", "format", "budget", "name", "email", "company", "timeline", "note", "website"].map(key => [key, typeof input[key] === "string" ? input[key].trim() : ""])) as unknown as ContactData;
    data.scope = Array.isArray(input.scope) ? input.scope.filter((v: unknown): v is string => typeof v === "string") : [];
  } catch { return NextResponse.json({ message: "Please check the form and try again." }, { status: 400 }); }
  if (data.website) return NextResponse.json({ ok: true, delivery: "filtered" });
  const errors = validateContact(data);
  if (Object.keys(errors).length) return NextResponse.json({ errors, message: "Please check the highlighted fields." }, { status: 422 });
  const { website: _website, ...enquiry } = data;
  const payload = { ...enquiry, id: crypto.randomUUID(), receivedAt: new Date().toISOString() };
  try {
    if (process.env.CONTACT_WEBHOOK_URL) {
      const url = new URL(process.env.CONTACT_WEBHOOK_URL);
      if (url.protocol !== "https:") throw new Error("HTTPS required");
      const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify(payload), signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error("Delivery failed");
      return NextResponse.json({ ok: true, delivery: "webhook" });
    }
    if (process.env.NODE_ENV !== "production") {
      const folder = path.join(process.cwd(), ".data"); await mkdir(folder, { recursive: true });
      await appendFile(path.join(folder, "enquiries.jsonl"), JSON.stringify(payload) + "\n", "utf8");
      return NextResponse.json({ ok: true, delivery: "local" });
    }
    return NextResponse.json({ message: "The contact form is not connected yet. Please try again once the studio has enabled delivery." }, { status: 503 });
  } catch { return NextResponse.json({ message: "Your enquiry couldn’t be delivered. Please try again in a moment." }, { status: 502 }); }
}
