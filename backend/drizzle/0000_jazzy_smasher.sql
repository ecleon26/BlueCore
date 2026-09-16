CREATE TABLE "action_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid,
	"timestamp_secs" integer DEFAULT 0 NOT NULL,
	"action_type" text NOT NULL,
	"action_data" jsonb
);
--> statement-breakpoint
CREATE TABLE "game_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"level" integer DEFAULT 1,
	"started_at" timestamp with time zone DEFAULT now(),
	"ended_at" timestamp with time zone,
	"outcome" text,
	"final_cash" integer,
	"final_revenue" integer,
	"final_morale" integer,
	"final_reputation" integer,
	"ai_summary" jsonb,
	CONSTRAINT "valid_outcome" CHECK ("game_sessions"."outcome" IN ('win', 'loss_time', 'loss_bankrupt'))
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"full_name" text NOT NULL,
	"age" integer NOT NULL,
	"avatar" text DEFAULT '🧒',
	"total_games" integer DEFAULT 0,
	"total_wins" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "profiles_username_unique" UNIQUE("username"),
	CONSTRAINT "age_range" CHECK ("profiles"."age" >= 7 AND "profiles"."age" <= 14)
);
--> statement-breakpoint
ALTER TABLE "action_logs" ADD CONSTRAINT "action_logs_session_id_game_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."game_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "game_sessions_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;