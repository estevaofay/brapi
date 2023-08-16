ALTER TABLE "APIUsage" ADD COLUMN "apiTokenId" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "APIUsage" ADD CONSTRAINT "APIUsage_apiTokenId_APIToken_id_fk" FOREIGN KEY ("apiTokenId") REFERENCES "APIToken"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
