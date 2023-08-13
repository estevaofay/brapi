CREATE TABLE IF NOT EXISTS "APIToken" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"active" boolean NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "APIToken_token_index" ON "APIToken" ("token");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "APIToken" ADD CONSTRAINT "APIToken_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
