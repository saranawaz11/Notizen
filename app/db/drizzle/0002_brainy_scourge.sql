ALTER TABLE "notes" ALTER COLUMN "content" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "userId" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "isArchived" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "parent_document" integer;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "cover_image" text;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "icon" varchar;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "isPublished" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX "by_user" ON "notes" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "by_user_parent" ON "notes" USING btree ("userId","parent_document");