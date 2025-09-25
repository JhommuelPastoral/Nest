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

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen font-nunito">
      <Card className="w-full max-w-sm border-none shadow-none">
        {/* Logo */}
        <div className="flex justify-center">
          <Image src="/nest-logo.png" alt="Nest Logo" width={80} height={50} />
        </div>

        <CardHeader className="text-center">
          <CardTitle className="text-lg font-bold">Welcome back to Nest</CardTitle>
          <CardDescription>
            Login with your GitHub or Google account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <Button className="flex items-center justify-center w-full gap-2 cursor-pointer">
            <Github className="w-5 h-5" />
            Log in with GitHub
          </Button>

          <Button className="flex items-center justify-center w-full gap-2 cursor-pointer">
            <Image
              src="/google-icon.png"
              alt="Google Logo"
              width={18}
              height={18}
            />
            Log in with Google
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
