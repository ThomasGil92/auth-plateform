"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const callBackUrl = useSearchParams().get("callbackUrl");
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callBackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button
        size='lg'
        className='w-full'
        variant={"outline"}
        onClick={() => {
          onClick("google");
        }}
      >
        <FcGoogle className='size-5' />
      </Button>
      <Button
        size='lg'
        className='w-full'
        variant={"outline"}
        onClick={() => {}}
      >
        <FaGithub className='size-5' />
      </Button>
    </div>
  );
};
