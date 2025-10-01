"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useTransition, useState } from "react";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (provider: "github" | "google") => {
    if (isLoading) return; // prevent spamming
    setIsLoading(true);

    startTransition(async () => {
      await signIn(provider, { callbackUrl: "/dashboard" });
      // no need to reset isLoading here, redirect will happen
    });
  };

  const disabled = isPending || isLoading;

  return (
    <div className="flex items-center justify-center min-h-screen font-nunito">
      <Card className="w-full max-w-sm border-none shadow-none">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/nest-logo.png"
            alt="Nest Logo"
            width={80}
            height={50}
            priority
            className="w-auto"
          />
        </div>

        <CardHeader className="text-center">
          <CardTitle className="text-lg font-bold">Welcome back to Nest</CardTitle>
          <CardDescription>
            Login with your GitHub or Google account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* GitHub Login */}
          <Button
            onClick={() => handleLogin("github")}
            disabled={disabled}
            className="flex items-center justify-center w-full gap-2 cursor-pointer"
          >
              <Github className="w-5 h-5" />
              Sign in with GitHub
          </Button>

          {/* Google Login */}
          <Button
            onClick={() => handleLogin("google")}
            disabled={disabled}
            className="flex items-center justify-center w-full gap-2 cursor-pointer"
          >
            <Image src="/google-icon.png" alt="Google Logo" width={18} height={18} />
            Sign in with Google
          </Button>
        </CardContent>

        <CardFooter className="justify-center text-sm">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="underline underline-offset-4 hover:text-blue-600"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
