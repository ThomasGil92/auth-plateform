import prisma from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  // userId
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
      {
        where: {
          userId,
        },
      },
    );
    return twoFactorConfirmation;
  } catch (e) {
    return null;
  }
};
