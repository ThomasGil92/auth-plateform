"use server";
import bcrypt from "bcryptjs"
import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { error: "Invalid email or password!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );
    return {
      success:
        "Please confirm your email by clicking the link in the confirmation email sent to " +
        existingUser.email,
    };
  }

if (existingUser.isTwoFactorEnabled && existingUser.email) {
  if (code) {
    const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
    if (!twoFactorToken||twoFactorToken.token !== code) {
      return { error: "Invalid code!" };
    }
    
    const hasExpires = twoFactorToken.expires.getTime() > new Date().getTime();
    if (!hasExpires) {
      return { error: "Code expired!" };
    }
    await prisma.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

    const existingConfirmation = await getTwoFactorConfirmationByUserId(
      existingUser.id,
    );
    if (existingConfirmation) {
      await prisma.twoFactorConfirmation.delete({
        where: { id: existingConfirmation.id },
      });
    }
    await prisma.twoFactorConfirmation.create({
      data: {
        userId: existingUser.id,
      },
    });
  } else {
    const twoFactorToken = await generateTwoFactorToken(existingUser.email);
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return { error: "Invalid password!" };
    }
    await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
    return {
      twoFactor: true,
    };
  }
}

try {
  await signIn("credentials", {
    email,
    password,
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });

  return { success: "You are logged in!" };
} catch (error) {
  if (error instanceof AuthError) {
    switch (error.type) {
      case "CredentialsSignin":
        return { error: "Invalid email or password!" };
      default:
        return { error: "Something went wrong!" };
    }
  }
  throw error;
}
  
  
};
