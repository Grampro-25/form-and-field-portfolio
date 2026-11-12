import assert from "node:assert/strict";

const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const post = (body, headers = {}) => fetch(`${base}/api/contact`, {
  method: "POST",
  headers: { "Content-Type": "application/json", ...headers },
  body: typeof body === "string" ? body : JSON.stringify(body),
});

const page = await fetch(base);
assert.equal(page.status, 200);
assert.match(await page.text(), /Independent digital design/);
console.log("PASS homepage responds with portfolio content");

const invalid = await post({});
assert.equal(invalid.status, 422);
const result = await invalid.json();
for (const field of ["name", "email", "scope", "format", "budget"]) assert.ok(result.errors[field]);
console.log("PASS incomplete enquiries receive field-specific errors");

assert.equal((await post("{invalid-json")).status, 400);
console.log("PASS malformed JSON is rejected");
assert.equal((await post("x".repeat(20001))).status, 413);
console.log("PASS oversized payloads are rejected");
assert.equal((await post({}, { Origin: "https://unrelated.example" })).status, 403);
console.log("PASS cross-origin form submissions are rejected");
assert.equal((await fetch(`${base}/api/contact`)).status, 405);
console.log("PASS contact endpoint only accepts POST");
