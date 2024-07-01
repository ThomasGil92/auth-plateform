import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: "600" });
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import prisma from "@/lib/db";

export default function Home() {
  return (
    <main className='flex h-full min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <div className='space-x-6 text-center'>
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className,
          )}
        >
          🔐 Auth
        </h1>
        <p className='text-lg text-white drop-shadow-md'>
          A simple authentication system for your next project
        </p>
        <div>
          <LoginButton>
            <Button variant={"secondary"} size={"lg"}>
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
