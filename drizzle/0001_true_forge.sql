CREATE TABLE "feedback" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "feedback_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sessionId" varchar NOT NULL,
	"doctorName" varchar(255),
	"rating" integer NOT NULL,
	"comment" text,
	"createdBy" varchar,
	"createdOn" varchar
);
--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_createdBy_users_email_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("email") ON DELETE no action ON UPDATE no action;