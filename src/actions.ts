"use server";

import webpush from 'web-push'
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

 
webpush.setVapidDetails(
  '<mailto:your-email@example.com>',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)
 
let subscription: PushSubscription | null = null
 
export async function subscribeUser(sub: PushSubscription) {
  subscription = sub
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true }
}
 
export async function unsubscribeUser() {
  subscription = null
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true }
}
 
export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error('No subscription available')
  }
 
  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: 'Test Notification',
        body: message,
        icon: '/icon.jpg',
      })
    )
    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}
