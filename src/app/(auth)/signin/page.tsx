import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Signin({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/signin?message=Could not authenticate user");
    }

    return redirect("/projects");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/signin?message=Could not authenticate user");
    }

    return redirect("/signin?message=Check email to continue sign in process");
  };

  const signInWithGoogle = async () => {
    "use server";

    // 1. Create a Supabase client
    const supabase = createClient();
    const origin = headers().get("origin") || process.env.NEXT_PUBLIC_APP_URL;
    console.log(
      "process.env.NEXT_PUBLIC_APP_URL",
      process.env.NEXT_PUBLIC_APP_URL
    );
    console.log("origin:", origin);
    // 2. Sign in with GitHub
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
    } else {
      console.log("Inside else Redirecting to:", data.url);
      console.log("Inside else Full data:", data);
      return redirect(data.url);
    }
    // 3. Redirect to landing page
  };

  return (
    <div className="mx-auto max-w-sm mt-20 space-y-10">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your email and password below to sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form action={signIn} method="post" className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="me@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              {/* <div className="flex flex-row w-full items-center justify-between gap-4"> */}
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
            {/* <span className="text-sm text-center">or</span>
                <form action={signUp} className="w-1/2">
                  <Button className="w-full">Sign up</Button>
                </form>
              </div> */}

            <form action={signInWithGoogle}>
              <Button variant="outline" className="w-full" type="submit">
                Sign in with Google
              </Button>
            </form>
          </div>
          <div className="mt-8 text-center text-sm">
            Don&apos;t have an account?
            <Link href="/signup" className="ml-4 underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
      {searchParams?.message && (
        <Alert>
          <AlertDescription className="text-center">
            {searchParams.message}
          </AlertDescription>
        </Alert>
      )}

      {/* <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <Link
          href="/"
          className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>

        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          <SubmitButton
            formAction={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
        <form
          action={signInWithGoogle}
          className="flex-1 flex min-h-screen justify-center items-center"
        >
          <Button className="">Sign in with Google</Button>
        </form>
      </div> */}
    </div>
  );
}
