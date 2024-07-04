import { getVerificationTokenByEmail } from "@/data/verification-token";
import prisma from "./db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset";
import crypto from 'crypto'
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({ where: { id: existingToken.id } });
  }
  const verifiationToken = await prisma.verificationToken.create({
    data: { token, expires, email },
  });
  return verifiationToken;
};
export const generatePasswordResetToken=async(email:string)=>{
  const token=crypto.randomUUID();
  const expires=new Date(new Date().getTime()+3600*1000);
  const existingToken=await getPasswordResetTokenByEmail(email);
  if(existingToken){
    await prisma.passwordResetToken.delete({where:{id:existingToken.id}});
  }
  const passwordResetToken=await prisma.passwordResetToken.create({
    data:{token,expires,email}
  })
  return passwordResetToken
}

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await prisma.twoFactorToken.delete({ where: { id: existingToken.id } });
  }
  const twoFactorToken = await prisma.twoFactorToken.create({
    data: { token, expires, email },
  });
  return twoFactorToken;
};
