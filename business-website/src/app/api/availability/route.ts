import { NextResponse } from "next/server";
import { getBookedSlotsForDate } from "@/lib/db";
import { getStandardTimeSlots } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ success: false, error: "Date parameter is required" }, { status: 400 });
    }

    const allSlots = getStandardTimeSlots();
    const bookedSlots = await getBookedSlotsForDate(date);

    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

    return NextResponse.json({
      success: true,
      date,
      allSlots,
      bookedSlots,
      availableSlots,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
