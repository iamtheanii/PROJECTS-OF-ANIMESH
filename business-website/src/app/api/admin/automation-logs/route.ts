export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAllNotificationLogs } from "@/lib/notifications";
import { getAllSyncLogs } from "@/lib/google-sheets";

export async function GET() {
  try {
    const notifications = getAllNotificationLogs();
    const syncLogs = getAllSyncLogs();
    return NextResponse.json({
      success: true,
      notifications,
      syncLogs,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
