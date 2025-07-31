import Day from "@/components/day";
import Firebase from "@/components/firebase";
import Push from "@/components/push";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const startDateCookie = cookieStore.get("startDate");

  let startDate = new Date();
  if (startDateCookie) {
    startDate = new Date(parseInt(startDateCookie.value));
  }

  return (
    <>
			<Firebase />
      <Push />
      <Day initDate={startDate} />
    </>
  );
}
