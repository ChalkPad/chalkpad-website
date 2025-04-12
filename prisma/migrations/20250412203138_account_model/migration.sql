-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "providerAccountId" DROP NOT NULL,
ALTER COLUMN "providerId" DROP NOT NULL,
ALTER COLUMN "providerType" DROP NOT NULL;
