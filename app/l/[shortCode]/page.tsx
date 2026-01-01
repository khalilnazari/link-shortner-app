import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { getLinkByShortCode } from "@/data/queries/links";
import { incrementLinkClicks } from "@/data/mutations/links";

type Params = Promise<{ shortCode: string }>;

export default async function ShortLinkPage({ params }: { params: Params }) {
  const { shortCode } = await params;

  // Look up the link by short code
  const [link] = await getLinkByShortCode(shortCode);

  if (!link) {
    notFound();
  }

  // Gather click analytics data from headers
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? undefined;
  const referrer = headersList.get("referer") ?? undefined;

  // Get IP and hash it for privacy
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? realIp ?? "unknown";
  const ipHash = await hashIP(ip);

  // Increment click count and record analytics
  await incrementLinkClicks(link.id, {
    userAgent,
    referrer,
    ipHash,
  });

  // Redirect to the original URL
  redirect(link.originalUrl);
}

async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
