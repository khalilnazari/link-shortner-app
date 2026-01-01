import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LinkNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6 py-12 max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-muted p-4">
            <LinkIcon className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Link Not Found
        </h1>

        <p className="text-muted-foreground mb-6 text-lg">
          We couldn&apos;t find the link you&apos;re looking for. It may have
          been removed, expired, or the URL might be incorrect.
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/">Go to Homepage</Link>
          </Button>

          <p className="text-sm text-muted-foreground">
            Need to create your own short links?{" "}
            <Link
              href="/dashboard"
              className="text-primary underline-offset-4 hover:underline"
            >
              Get started for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
