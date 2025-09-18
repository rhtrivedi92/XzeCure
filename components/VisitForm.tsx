"use client";

import { useMemo, useState } from "react";
import {
  FaUserMd,
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFileAlt,
  FaClock,
  FaHistory,
  FaHeartbeat,
  FaThermometerHalf,
  FaPrescriptionBottleAlt,
  FaFlask,
  FaCalendarAlt,
  FaWhatsapp,
  FaBriefcaseMedical,
  FaRupeeSign,
  FaHashtag,
} from "react-icons/fa";

/* ── Services (all categories from your list) ── */
type Service = { label: string; price: number };
type ServiceCat = { cat: string; items: Service[] };

const serviceCatalog: ServiceCat[] = [
  {
    cat: "Doctor Services",
    items: [
      { label: "Doctor Home Visit (Daytime) - ₹999", price: 999 },
      { label: "Emergency / Night Visit - ₹1499", price: 1499 },
      { label: "Tele / Video Consultation - ₹499", price: 499 },
    ],
  },
  {
    cat: "Nursing Services",
    items: [
      { label: "Nursing Visit (Injection / Dressing) - ₹400", price: 400 },
      { label: "12-hour Nursing Shift - ₹1200", price: 1200 },
      { label: "24-hour Nursing Care - ₹2200", price: 2200 },
      { label: "ICU-trained Nurse - ₹1500", price: 1500 },
    ],
  },
  {
    cat: "Attendant / Caregiver Services",
    items: [
      { label: "Daytime Attendant (12 hours) - ₹900", price: 900 },
      { label: "24-hour Attendant - ₹1800", price: 1800 },
    ],
  },
  {
    cat: "Physiotherapy",
    items: [
      { label: "One-time Physiotherapy Consultation - ₹400", price: 400 },
      { label: "Follow-up Physiotherapy Session (avg) - ₹600", price: 600 },
      { label: "Package (10 sessions, avg) - ₹4999", price: 4999 },
    ],
  },
  {
    cat: "Other Medical Services",
    items: [
      { label: "Nebulisation at Home - ₹99", price: 99 },
      { label: "ECG at Home - ₹199", price: 199 },
      { label: "IV / Injection at Home - ₹99", price: 99 },
      { label: "Wound Dressing - ₹199", price: 199 },
      { label: "Catheter/Ryle's Tube Change (avg) - ₹499", price: 499 },
      { label: "Blood Sample Collection at Home - ₹149", price: 149 },
    ],
  },
  {
    cat: "Additional Services",
    items: [{ label: "Medicine Delivery at Home - ₹150", price: 150 }],
  },
];

const allServices = serviceCatalog.flatMap((c) => c.items);

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
  const [status, setStatus] = useState<string | null>(null);

  const total = useMemo(
    () => (form.price || 0) * (form.quantity || 1),
    [form.price, form.quantity]
  );

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

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

  /* Styles: no input-leading icons -> normal left padding */
  const inputBase =
    "w-full h-11 bg-slate-700 text-slate-100 border border-slate-600 rounded-xl px-3 " +
    "outline-none focus:ring-2 focus:ring-[#155e9e] focus:border-[#155e9e]/80";
  const textAreaBase =
    "w-full min-h-[96px] bg-slate-700 text-slate-100 border border-slate-600 rounded-xl px-3 py-2 " +
    "outline-none focus:ring-2 focus:ring-[#155e9e] focus:border-[#155e9e]/80";
  const labelCls =
    "text-slate-200 text-sm font-medium inline-flex items-center gap-2 leading-none mb-1.5";
  const section =
    "rounded-2xl bg-slate-800/80 border border-slate-700 shadow-lg p-6 space-y-4";
  const iconSize = 16;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Patient & Contact */}
      <section className={section}>
        <h2 className="text-lg font-semibold">Patient & Contact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Staff/Doctor */}
          <div>
            <label htmlFor="staffName" className={labelCls}>
              <FaUserMd size={iconSize} aria-hidden="true" />
              <span>
                Staff/Doctor Name <span className="text-red-400">*</span>
              </span>
            </label>
            <input
              id="staffName"
              required
              className={inputBase}
              value={form.staffName}
              onChange={(e) => set("staffName", e.target.value)}
            />
          </div>

          {/* Patient Name */}
          <div>
            <label htmlFor="patientName" className={labelCls}>
              <FaUser size={iconSize} aria-hidden="true" />
              <span>
                Patient Name <span className="text-red-400">*</span>
              </span>
            </label>
            <input
              id="patientName"
              required
              className={inputBase}
              value={form.patientName}
              onChange={(e) => set("patientName", e.target.value)}
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className={labelCls}>
              <FaFileAlt size={iconSize} aria-hidden="true" />
              <span>Age</span>
            </label>
            <input
              id="age"
              type="number"
              className={inputBase}
              value={form.age}
              onChange={(e) => set("age", e.target.value)}
            />
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className={labelCls}>
              <FaPhoneAlt size={iconSize} aria-hidden="true" />
              <span>Contact Number</span>
            </label>
            <input
              id="contactNumber"
              className={inputBase}
              placeholder="+91 98765 43210"
              value={form.contactNumber}
              onChange={(e) => {
                const v = e.target.value;
                setForm((f) => ({ ...f, contactNumber: v, whatsappNumber: v }));
              }}
            />
          </div>

          {/* Address (full width) */}
          <div className="md:col-span-2">
            <label htmlFor="address" className={labelCls}>
              <FaMapMarkerAlt size={iconSize} aria-hidden="true" />
              <span>Address</span>
            </label>
            <textarea
              id="address"
              className={textAreaBase}
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label htmlFor="whatsappNumber" className={labelCls}>
              <FaWhatsapp size={iconSize} aria-hidden="true" />
              <span>Patient WhatsApp Number</span>
            </label>
            <input
              id="whatsappNumber"
              className={inputBase}
              value={form.whatsappNumber}
              onChange={(e) => set("whatsappNumber", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Clinical Information */}
      <section className={section}>
        <h2 className="text-lg font-semibold">Clinical Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Complaints */}
          <div className="md:col-span-2">
            <label htmlFor="complaints" className={labelCls}>
              <FaFileAlt size={iconSize} aria-hidden="true" />
              <span>
                Current Complaints <span className="text-red-400">*</span>
              </span>
            </label>
            <textarea
              id="complaints"
              required
              className={textAreaBase}
              value={form.complaints}
              onChange={(e) => set("complaints", e.target.value)}
            />
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className={labelCls}>
              <FaClock size={iconSize} aria-hidden="true" />
              <span>Duration of Complaints</span>
            </label>
            <input
              id="duration"
              className={inputBase}
              value={form.duration}
              onChange={(e) => set("duration", e.target.value)}
            />
          </div>

          {/* History */}
          <div>
            <label htmlFor="history" className={labelCls}>
              <FaHistory size={iconSize} aria-hidden="true" />
              <span>Previous Medical/Surgical History</span>
            </label>
            <textarea
              id="history"
              className={textAreaBase}
              value={form.history}
              onChange={(e) => set("history", e.target.value)}
            />
          </div>

          {/* Vitals */}
          <div>
            <label htmlFor="vitals" className={labelCls}>
              <FaHeartbeat size={iconSize} aria-hidden="true" />
              <span>Current Vitals</span>
            </label>
            <input
              id="vitals"
              className={inputBase}
              placeholder="BP: 120/80, Pulse: 85, SpO2: 98%, Temp: 98.6°F"
              value={form.vitals}
              onChange={(e) => set("vitals", e.target.value)}
            />
          </div>

          {/* Signs */}
          <div>
            <label htmlFor="signs" className={labelCls}>
              <FaThermometerHalf size={iconSize} aria-hidden="true" />
              <span>Specific Signs or Symptoms</span>
            </label>
            <textarea
              id="signs"
              className={textAreaBase}
              value={form.signs}
              onChange={(e) => set("signs", e.target.value)}
            />
          </div>

          {/* Treatment */}
          <div className="md:col-span-2">
            <label htmlFor="treatment" className={labelCls}>
              <FaPrescriptionBottleAlt size={iconSize} aria-hidden="true" />
              <span>
                Treatment Advised <span className="text-red-400">*</span>
              </span>
            </label>
            <textarea
              id="treatment"
              required
              className={textAreaBase}
              value={form.treatment}
              onChange={(e) => set("treatment", e.target.value)}
            />
          </div>

          {/* Investigations */}
          <div className="md:col-span-2">
            <label htmlFor="investigations" className={labelCls}>
              <FaFlask size={iconSize} aria-hidden="true" />
              <span>Any Blood Investigations Advised</span>
            </label>
            <textarea
              id="investigations"
              className={textAreaBase}
              value={form.investigations}
              onChange={(e) => set("investigations", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Follow-up */}
      <section className={section}>
        <h2 className="text-lg font-semibold">Follow-up</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div>
            <label className={labelCls}>
              <FaCalendarAlt size={iconSize} aria-hidden="true" />
              <span>Follow-up required?</span>
            </label>
            <div className="mt-2 flex items-center gap-6 text-slate-200">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="followup"
                  checked={form.followup === "Yes"}
                  onChange={() => set("followup", "Yes")}
                />
                Yes
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="followup"
                  checked={form.followup === "No"}
                  onChange={() =>
                    setForm((f) => ({ ...f, followup: "No", followupDate: "" }))
                  }
                />
                No
              </label>
            </div>
          </div>

          {form.followup === "Yes" && (
            <div>
              <label htmlFor="followupDate" className={labelCls}>
                <FaCalendarAlt size={iconSize} aria-hidden="true" />
                <span>Suggested Follow-up Date</span>
              </label>
              <input
                id="followupDate"
                type="date"
                className={inputBase}
                value={form.followupDate}
                onChange={(e) => set("followupDate", e.target.value)}
              />
            </div>
          )}
        </div>
      </section>

      {/* Service & Charges */}
      <section className={section}>
        <h2 className="text-lg font-semibold">Service & Charges</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Service Select (with categories) */}
          <div className="md:col-span-2">
            <label htmlFor="serviceLabel" className={labelCls}>
              <FaBriefcaseMedical size={iconSize} aria-hidden="true" />
              <span>Select Service</span>
            </label>
            <select
              id="serviceLabel"
              className={inputBase}
              value={form.serviceLabel}
              onChange={(e) => {
                const svc = allServices.find((s) => s.label === e.target.value);
                setForm((f) => ({
                  ...f,
                  serviceLabel: e.target.value,
                  price: svc?.price || 0,
                }));
              }}
            >
              <option value="">-- Select a Service --</option>
              {serviceCatalog.map((group) => (
                <optgroup key={group.cat} label={group.cat}>
                  {group.items.map((s) => (
                    <option key={s.label} value={s.label}>
                      {s.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className={labelCls}>
              <FaRupeeSign size={iconSize} aria-hidden="true" />
              <span>Visit Charge (₹)</span>
            </label>
            <input
              id="price"
              type="number"
              className={inputBase}
              value={form.price}
              onChange={(e) => set("price", Number(e.target.value) || 0)}
            />
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className={labelCls}>
              <FaHashtag size={iconSize} aria-hidden="true" />
              <span>Quantity</span>
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              className={inputBase}
              value={form.quantity}
              onChange={(e) => set("quantity", Number(e.target.value) || 1)}
            />
          </div>

          {/* Total (full width) */}
          <div className="md:col-span-4">
            <label className={labelCls}>
              <FaRupeeSign size={iconSize} aria-hidden="true" />
              <span>Total Charges (₹)</span>
            </label>
            <input
              readOnly
              className={inputBase}
              value={`₹${total.toFixed(2)}`}
            />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-[#155e9e] hover:brightness-110 text-white shadow-md
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#155e9e] focus:ring-offset-slate-900"
        >
          Save
        </button>
      </div>

      {/* Status */}
      {status && (
        <p
          className={
            status.startsWith("Saved")
              ? "text-sm text-emerald-400"
              : "text-sm text-rose-400"
          }
        >
          {status}
        </p>
      )}
    </form>
  );
}
