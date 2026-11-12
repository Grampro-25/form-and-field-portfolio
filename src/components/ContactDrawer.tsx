"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, Check, Loader2, X } from "lucide-react";
import Modal from "./Modal";
import { scopes, formats, budgets, validateContact, type ContactData, type ContactErrors } from "@/lib/contact";

const initial: ContactData = { mode: "project", scope: [], format: "", budget: "", name: "", email: "", company: "", timeline: "", note: "", website: "" };
export default function ContactDrawer({ onClose }: { onClose: () => void }) {
  const [data, setData] = useState<ContactData>(initial);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [serverError, setServerError] = useState("");
  const [local, setLocal] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => { if (status === "success") document.getElementById("contact-thanks")?.focus(); }, [status]);
  function update<K extends keyof ContactData>(key: K, value: ContactData[K]) { setData(d => ({ ...d, [key]: value })); setErrors(e => ({ ...e, [key]: undefined })); }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (status === "sending") return;
    const nextErrors = validateContact(data); setErrors(nextErrors); setServerError("");
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid="true"] button')?.focus()); return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) { setErrors(result.errors || {}); throw new Error(result.message || "Your enquiry couldn’t be sent. Please try again."); }
      setLocal(result.delivery === "local"); setStatus("success");
    } catch (error) { setServerError(error instanceof Error ? error.message : "Check your connection and try again."); setStatus("idle"); }
  }
  const fieldError = (key: keyof ContactData) => errors[key] ? <span id={`error-${key}`} className="field-error" role="alert">{errors[key]}</span> : null;
  return <Modal id="contact-drawer" label="Contact the studio" onClose={onClose} className="contact-drawer" drawer>
    <div className="drawer-top"><span>Good things start with a conversation.</span><button className="icon-button" aria-label="Close contact drawer" onClick={onClose}><X strokeWidth={1.25} /></button></div>
    <AnimatePresence mode="wait">{status === "success" ? <motion.div key="success" className="contact-success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} role="status" onAnimationComplete={() => document.getElementById("contact-thanks")?.focus()}><span className="success-mark"><Check size={36} strokeWidth={1} /></span><h2 id="contact-thanks" tabIndex={-1}>thank you<span>.</span></h2><p>Thank you — I reply within 48 hours.</p>{local && <p className="local-notice">This development preview saved your enquiry locally. Email delivery is not connected yet.</p>}<button onClick={onClose} className="text-link"><ArrowLeft size={16} />Back to the good stuff</button></motion.div> : <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="contact-modes" role="group" aria-label="Contact mode"><button aria-pressed={data.mode === "project"} onClick={() => update("mode", "project")}>Start a Project</button><button aria-pressed={data.mode === "collaborate"} onClick={() => update("mode", "collaborate")}>Collaborate</button></div>
      <h2 className="drawer-title">{data.mode === "project" ? <>let’s make<br />something matter.</> : <>good people.<br />great possibilities.</>}</h2>
      <div className="contact-intro"><p>{data.mode === "project" ? "Tell me a little about what you have in mind." : "Tell me about your practice and how we could work together."}</p><span><i className="status-dot" />I reply within 48 hours</span></div>
      <form ref={form} noValidate onSubmit={submit}>
        <fieldset data-invalid={!!errors.scope} aria-describedby={errors.scope ? "error-scope" : undefined}><legend><span>01.</span> Scope <span className="legend-hint">Choose a few</span></legend><div className="pill-group">{scopes.map(scope => <button type="button" key={scope} className="select-pill" aria-pressed={data.scope.includes(scope)} onClick={() => update("scope", data.scope.includes(scope) ? data.scope.filter(s => s !== scope) : [...data.scope, scope])}>{scope}{data.scope.includes(scope) && <Check size={13} />}</button>)}</div>{fieldError("scope")}</fieldset>
        <fieldset data-invalid={!!errors.format} aria-describedby={errors.format ? "error-format" : undefined}><legend><span>02.</span> Format</legend><div className="pill-group">{formats.map(format => <button type="button" key={format} className="select-pill" aria-pressed={data.format === format} onClick={() => update("format", format)}>{format}</button>)}</div>{fieldError("format")}</fieldset>
        <fieldset data-invalid={!!errors.budget} aria-describedby={errors.budget ? "error-budget" : undefined}><legend><span>03.</span> Budget</legend><div className="pill-group">{budgets.map(budget => <button type="button" key={budget} className="select-pill" aria-pressed={data.budget === budget} onClick={() => update("budget", budget)}>{budget}</button>)}</div>{fieldError("budget")}</fieldset>
        <div className="contact-fields">{([{ key: "name", label: "04. Name", placeholder: "Your name", required: true }, { key: "email", label: "05. Email", placeholder: "you@company.com", required: true }, { key: "company", label: "06. Company", placeholder: "Company or studio (optional)" }, { key: "timeline", label: "07. Timeline", placeholder: "When are you thinking? (optional)" }] as const).map(field => <div className="input-field" key={field.key}><label htmlFor={`contact-${field.key}`}>{field.label}{"required" in field && <span> *</span>}</label><input id={`contact-${field.key}`} name={field.key} type={field.key === "email" ? "email" : "text"} autoComplete={field.key === "name" ? "name" : field.key === "email" ? "email" : field.key === "company" ? "organization" : "off"} maxLength={field.key === "email" ? 254 : field.key === "name" ? 120 : 200} value={data[field.key]} onChange={e => update(field.key, e.target.value)} onBlur={() => { const error = validateContact(data)[field.key]; if (error) setErrors(v => ({ ...v, [field.key]: error })); }} placeholder={field.placeholder} required={"required" in field} aria-invalid={!!errors[field.key]} aria-describedby={errors[field.key] ? `error-${field.key}` : undefined} />{fieldError(field.key)}</div>)}<div className="input-field full-field"><label htmlFor="contact-note">08. Note</label><textarea id="contact-note" maxLength={5000} rows={3} value={data.note} onChange={e => update("note", e.target.value)} placeholder="A little context goes a long way. (optional)" aria-invalid={!!errors.note} aria-describedby={errors.note ? "error-note" : undefined} />{fieldError("note")}</div></div>
        <div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" tabIndex={-1} autoComplete="off" value={data.website} onChange={e => update("website", e.target.value)} /></div>
        {serverError && <p className="field-error" role="alert">{serverError}</p>}
        <button type="submit" disabled={status === "sending"} className="send-button">{status === "sending" ? "Sending your enquiry…" : "Send enquiry"}{status === "sending" ? <Loader2 className="spinner" size={22} /> : <ArrowUpRight size={24} strokeWidth={1.25} />}</button><p className="form-footnote">Your details are only used to reply to your enquiry.</p>
      </form>
    </motion.div>}</AnimatePresence>
  </Modal>;
}
