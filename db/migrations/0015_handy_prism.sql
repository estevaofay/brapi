ALTER TABLE "APIUsage" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "APIToken" ALTER COLUMN "createdAt" SET DEFAULT now();