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
import { signIn } from "@/auth";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen font-nunito">
      <Card className="w-full max-w-sm border-none shadow-none">
        {/* Logo */}
        <div className="flex justify-center mt-4">
          <Image src="/nest-logo.png" alt="Nest Logo" width={80} height={50} priority className="w-auto" />
        </div>

        <CardHeader className="text-center">
          <CardTitle className="text-lg font-bold">
            Create your Nest account
          </CardTitle>
          <CardDescription>
            Sign up with your GitHub or Google account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          
          <form action={async () =>{
            "use server";
            await signIn('github');
          }}>
            <Button className="flex items-center justify-center w-full gap-2 cursor-pointer">
              <Github className="w-5 h-5" />
              Sign up with GitHub
            </Button>

          </form>

          
          <form action={async () => {
            "use server";
            await signIn('google');
          }}>
            
            <Button className="flex items-center justify-center w-full gap-2 cursor-pointer">
              <Image
                src="/google-icon.png"
                alt="Google Logo"
                width={18}
                height={18}
              />
              Sign up with Google
            </Button>


          </form>

        </CardContent>

        <CardFooter className="justify-center text-sm">
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-blue-600"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
