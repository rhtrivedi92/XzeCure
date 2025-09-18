// components/FloatingWhatsApp.tsx
"use client";

export default function FloatingWhatsApp() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"; // e.g., 91 + number
  const text = encodeURIComponent("Hello XzeCure! I’d like to chat.");
  const href = `https://wa.me/${phone}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
      style={{
        background: "#25D366", // WhatsApp green
      }}
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="currentColor"
        viewBox="0 0 16 16"
        className="text-white"
      >
        <path d="M13.601 2.326A7.854 7.854 0 0 0 8.032.002C3.64.002.069 3.579.07 7.973c0 1.408.369 2.782 1.07 3.993L.004 16l4.13-1.11a7.93 7.93 0 0 0 3.9 1.004h.003c4.393 0 7.963-3.578 7.963-7.972a7.922 7.922 0 0 0-2.399-5.596m-5.57 12.67h-.003a6.63 6.63 0 0 1-3.385-.93l-.242-.144-2.454.66.657-2.392-.157-.246a6.65 6.65 0 0 1-1.02-3.545c0-3.65 2.972-6.62 6.626-6.62a6.58 6.58 0 0 1 4.708 1.949 6.56 6.56 0 0 1 1.917 4.686c0 3.651-2.972 6.622-6.647 6.622m3.644-4.96c-.2-.1-1.177-.58-1.36-.646-.183-.067-.317-.1-.45.1-.134.2-.517.646-.634.78-.116.134-.234.15-.434.05-.2-.1-.85-.313-1.62-.998-.6-.534-1.004-1.194-1.12-1.394-.116-.2-.013-.308.087-.407.09-.089.2-.233.3-.35.1-.116.133-.2.2-.333.067-.134.033-.25-.017-.35-.05-.1-.45-1.083-.617-1.48-.162-.388-.327-.334-.45-.34l-.383-.007c-.133 0-.35.05-.534.25-.183.2-.7.683-.7 1.666 0 .983.716 1.934.817 2.067.1.133 1.4 2.133 3.385 2.99.473.205.842.326 1.13.418.475.151.906.13 1.247.079.38-.058 1.177-.48 1.344-.944.167-.467.167-.867.117-.95-.05-.083-.183-.133-.383-.233" />
      </svg>
    </a>
  );
}
