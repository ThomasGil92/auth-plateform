import { getVerificationTokenByEmail } from "@/data/verification-token";
import prisma from "./db";

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
