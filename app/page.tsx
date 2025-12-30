import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link2, Zap, BarChart3, Shield } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Shorten Your Links,
                  <br />
                  Amplify Your Reach
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Transform long URLs into short, memorable links. Track clicks,
                  analyze performance, and share with confidence.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <SignUpButton mode="modal">
                  <Button size="lg">Get Started</Button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Powerful Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage and track your shortened links
                  effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <Link2 className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Easy Link Shortening</CardTitle>
                  <CardDescription>
                    Create short, memorable links in seconds. Just paste your
                    long URL and get a shortened version instantly.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Lightning Fast</CardTitle>
                  <CardDescription>
                    Our optimized infrastructure ensures your links redirect
                    quickly, providing the best experience for your users.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart3 className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Analytics & Insights</CardTitle>
                  <CardDescription>
                    Track clicks, monitor performance, and gain valuable
                    insights into how your links are being used.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Secure & Reliable</CardTitle>
                  <CardDescription>
                    Your links are protected with enterprise-grade security. We
                    ensure 99.9% uptime for uninterrupted service.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of users who trust our platform for their link
                  management needs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <SignUpButton mode="modal">
                  <Button size="lg">Create Free Account</Button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            © 2025 Link Shortener App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
