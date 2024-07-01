"use client";
import Link from "next/link";
import { Button } from "../ui/button";
interface BackButtonProps {
  href: string;
  label: string;
}
export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button
      asChild
      size='sm'
      className='font-normal w-full'
      variant={"link"}
      onClick={() => {}}
    >
      <Link href={href}> {label} </Link>
    </Button>
  );
};
