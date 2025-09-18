// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-slate-800">
      <div className="max-w-5xl mx-auto p-4 text-sm text-slate-300 grid gap-2 md:grid-cols-3">
        <div>
          <div className="font-semibold text-slate-200">Contact us</div>
          <div>
            Phone:{" "}
            <a
              className="underline-offset-2 hover:underline"
              href={`tel:${process.env.NEXT_PUBLIC_SUPPORT_PHONE || ""}`}
            >
              {process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+91-XXXXXXXXXX"}
            </a>
          </div>
          <div>
            Email:{" "}
            <a
              className="underline-offset-2 hover:underline"
              href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || ""}`}
            >
              {process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@example.com"}
            </a>
          </div>
        </div>

        <div>
          <div className="font-semibold text-slate-200">Address</div>
          <div>
            {process.env.NEXT_PUBLIC_ADDRESS_LINE1 || "Line 1, Locality"}
          </div>
          <div>
            {process.env.NEXT_PUBLIC_ADDRESS_LINE2 || "City, State, PIN"}
          </div>
        </div>

        <div>
          <div className="font-semibold text-slate-200">Hours</div>
          <div>Mon–Sat: 9:00–20:00</div>
          <div>Sun: 10:00–16:00</div>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 pb-4">
        © {new Date().getFullYear()} XzeCure. All rights reserved.
      </div>
    </footer>
  );
}
