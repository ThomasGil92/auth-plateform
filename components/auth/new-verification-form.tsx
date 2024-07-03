"use client";

import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { set } from "zod";
import { FormSuccess } from "../form-success.tsx";
import { FormError } from "../form-error";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success !== "" || error !== "") return;
    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token!)
      .then((res) => {
        if (res.success) {
          setSuccess(res.success);
        } else {
          setError(res.error!);
        }
      })
      .catch((err) => {
        setError("Something went wrong!");
      });
  }, [token,success,error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel='Confirming your verification'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <div className='flex items-center w-full justify-center'>
        <BeatLoader />
        <FormSuccess message={success} />
        {success === "" && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
