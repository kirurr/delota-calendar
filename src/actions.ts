"use server";

import { add } from "date-fns";
import { cookies } from "next/headers";

export type ActionResult = { status: true } | { status: false; error: string };

export async function setStartDateAction(date: Date): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();

    cookieStore.set("startDate", date.getTime().toString(), {
      expires: add(new Date(), { years: 1 }),
    });
    //TODO: send to db
    return { status: true };
  } catch (error) {
    return { status: false, error: error as string };
  }
}
