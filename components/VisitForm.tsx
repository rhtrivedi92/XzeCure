"use client";

import { useState } from "react";

const services = [
  { label: "Doctor Home Visit (Daytime) - ₹999", price: 999 },
  { label: "Emergency / Night Visit - ₹1499", price: 1499 },
  { label: "Tele / Video Consultation - ₹499", price: 499 },
  { label: "Nursing Visit (Injection / Dressing) - ₹400", price: 400 },
];

export default function VisitForm() {
  const [form, setForm] = useState({
    staffName: "",
    patientName: "",
    age: "",
    contactNumber: "",
    address: "",
    complaints: "",
    duration: "",
    history: "",
    vitals: "",
    signs: "",
    treatment: "",
    investigations: "",
    followup: "No",
    followupDate: "",
    whatsappNumber: "",
    serviceLabel: "",
    price: 0,
    quantity: 1,
  });

  const total = (form.price || 0) * (form.quantity || 1);
  const [status, setStatus] = useState<string | null>(null);

  const cls = {
    card: "rounded-2xl bg-slate-800/80 border border-slate-700 shadow-lg p-6 space-y-6",
    sectionTitle: "text-lg font-semibold tracking-wide text-white/95",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-4",
    input:
      // uses brand blue #155e9e for focus ring (Tailwind v4 hex ok)
      "bg-slate-700 text-slate-100 border border-slate-600 rounded-xl px-3 py-2 w-full " +
      "outline-none focus:ring-2 focus:ring-[#155e9e] focus:border-[#155e9e]/80",
    textarea:
      "bg-slate-700 text-slate-100 border border-slate-600 rounded-xl px-3 py-2 w-full min-h-[96px] " +
      "outline-none focus:ring-2 focus:ring-[#155e9e] focus:border-[#155e9e]/80",
    select:
      "bg-slate-700 text-slate-100 border border-slate-600 rounded-xl px-3 py-2 w-full " +
      "outline-none focus:ring-2 focus:ring-[#155e9e] focus:border-[#155e9e]/80",
    label: "block mb-1 text-slate-200",
    subtle: "text-sm text-slate-300",
    row: "grid grid-cols-1 md:grid-cols-4 gap-4",
    btnPrimary:
      "inline-flex items-center gap-2 rounded-xl px-4 py-2 " +
      "bg-[#155e9e] hover:brightness-110 text-white shadow-md " +
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#155e9e] focus:ring-offset-slate-900",
    badgeReq: "ml-1 text-red-400",
    statusOk: "text-sm text-emerald-400",
    statusErr: "text-sm text-rose-400",
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");
    try {
      const res = await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setStatus("Saved to Google Sheets ✅");
    } catch (err: unknown) {
      setStatus(
        err instanceof Error ? `Error: ${err.message}` : "Error: Failed"
      );
    }
  }

  return (
    <div className={cls.card}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Patient Visit Form</h2>
          <p className={cls.subtle}>
            Fill patient details and clinical information. Submissions save to
            your Google Sheet.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Section: Patient & Contact */}
        <section className="space-y-4">
          <h3 className={cls.sectionTitle}>Patient & Contact</h3>
          <div className={cls.grid}>
            <div>
              <label className={cls.label}>
                Staff/Doctor Name <span className={cls.badgeReq}>*</span>
              </label>
              <input
                className={cls.input}
                required
                value={form.staffName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, staffName: e.target.value }))
                }
              />
            </div>
            <div>
              <label className={cls.label}>
                Patient Name <span className={cls.badgeReq}>*</span>
              </label>
              <input
                className={cls.input}
                required
                value={form.patientName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, patientName: e.target.value }))
                }
              />
            </div>
            <div>
              <label className={cls.label}>Age</label>
              <input
                type="number"
                className={cls.input}
                value={form.age}
                onChange={(e) =>
                  setForm((f) => ({ ...f, age: e.target.value }))
                }
              />
            </div>
            <div>
              <label className={cls.label}>Contact Number</label>
              <input
                className={cls.input}
                value={form.contactNumber}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    contactNumber: e.target.value,
                    whatsappNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className={cls.label}>Address</label>
              <textarea
                className={cls.textarea}
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
              />
            </div>
          </div>
        </section>

        {/* Section: Clinical Information */}
        <section className="space-y-4">
          <h3 className={cls.sectionTitle}>Clinical Information</h3>
          <div className={cls.grid}>
            <div className="md:col-span-2">
              <label className={cls.label}>
                Current Complaints <span className={cls.badgeReq}>*</span>
              </label>
              <textarea
                required
                className={cls.textarea}
                value={form.complaints}
                onChange={(e) =>
                  setForm((f) => ({ ...f, complaints: e.target.value }))
                }
              />
            </div>
            <div>
              <label className={cls.label}>Duration</label>
              <input
                className={cls.input}
                value={form.duration}
                onChange={(e) =>
                  setForm((f) => ({ ...f, duration: e.target.value }))
                }
              />
            </div>
            <div>
              <label className={cls.label}>
                Previous Medical/Surgical History
              </label>
              <textarea
                className={cls.textarea}
                value={form.history}
                onChange={(e) =>
                  setForm((f) => ({ ...f, history: e.target.value }))
                }
              />
            </div>
            <div>
              <label className={cls.label}>Current Vitals</label>
              <input
                className={cls.input}
                value={form.vitals}
                onChange={(e) =>
                  setForm((f) => ({ ...f, vitals: e.target.value }))
                }
              />
            </div>
            <div>
              <label className={cls.label}>Specific Signs or Symptoms</label>
              <textarea
                className={cls.textarea}
                value={form.signs}
                onChange={(e) =>
                  setForm((f) => ({ ...f, signs: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className={cls.label}>
                Treatment Advised <span className={cls.badgeReq}>*</span>
              </label>
              <textarea
                required
                className={cls.textarea}
                value={form.treatment}
                onChange={(e) =>
                  setForm((f) => ({ ...f, treatment: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className={cls.label}>
                Any Blood Investigations Advised
              </label>
              <textarea
                className={cls.textarea}
                value={form.investigations}
                onChange={(e) =>
                  setForm((f) => ({ ...f, investigations: e.target.value }))
                }
              />
            </div>
          </div>
        </section>

        {/* Section: Follow-up */}
        <section className="space-y-4">
          <h3 className={cls.sectionTitle}>Follow-up</h3>
          <div className={cls.grid}>
            <div>
              <label className={cls.label}>Follow-up required?</label>
              <div className="flex items-center gap-4 text-slate-200">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="followup"
                    checked={form.followup === "Yes"}
                    onChange={() => setForm((f) => ({ ...f, followup: "Yes" }))}
                  />
                  Yes
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="followup"
                    checked={form.followup === "No"}
                    onChange={() =>
                      setForm((f) => ({
                        ...f,
                        followup: "No",
                        followupDate: "",
                      }))
                    }
                  />
                  No
                </label>
              </div>
            </div>

            {form.followup === "Yes" && (
              <div>
                <label className={cls.label}>Suggested Follow-up Date</label>
                <input
                  type="date"
                  className={cls.input}
                  value={form.followupDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, followupDate: e.target.value }))
                  }
                />
              </div>
            )}
          </div>
        </section>

        {/* Section: Services & Charges */}
        <section className="space-y-4">
          <h3 className={cls.sectionTitle}>Service & Charges</h3>
          <div className={cls.row}>
            <div className="md:col-span-2">
              <label className={cls.label}>Select Service</label>
              <select
                className={cls.select}
                value={form.serviceLabel}
                onChange={(e) => {
                  const svc = services.find((s) => s.label === e.target.value);
                  setForm((f) => ({
                    ...f,
                    serviceLabel: e.target.value,
                    price: svc?.price || 0,
                  }));
                }}
              >
                <option value="">-- Select a Service --</option>
                {services.map((s) => (
                  <option key={s.label} value={s.label}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={cls.label}>Visit Charge (₹)</label>
              <input
                type="number"
                className={cls.input}
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: Number(e.target.value) || 0 }))
                }
              />
            </div>
            <div>
              <label className={cls.label}>Quantity</label>
              <input
                type="number"
                min={1}
                className={cls.input}
                value={form.quantity}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    quantity: Number(e.target.value) || 1,
                  }))
                }
              />
            </div>
            <div className="md:col-span-4">
              <label className={cls.label}>Total Charges (₹)</label>
              <input
                readOnly
                className={cls.input}
                value={`₹${total.toFixed(2)}`}
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-end">
          <button type="submit" className={cls.btnPrimary}>
            Save to Google Sheets
          </button>
        </div>

        {/* Status */}
        {status && (
          <p
            className={
              status.startsWith("Saved") ? cls.statusOk : cls.statusErr
            }
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
