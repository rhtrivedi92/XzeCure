import { NextResponse } from "next/server";
import { appendVisitRow } from "@/lib/sheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const now = new Date();

    const values = [
      now.toISOString(),
      body.staffName || "",
      body.patientName || "",
      body.age || "",
      body.contactNumber || "",
      body.address || "",
      body.complaints || "",
      body.duration || "",
      body.history || "",
      body.vitals || "",
      body.signs || "",
      body.treatment || "",
      body.investigations || "",
      body.followup || "",
      body.followupDate || "",
      body.whatsappNumber || "",
      body.serviceLabel || "",
      body.price ?? "",
      body.quantity ?? "",
      body.total ?? "",
    ];

    await appendVisitRow(values);
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed" },
      { status: 500 }
    );
  }
}
