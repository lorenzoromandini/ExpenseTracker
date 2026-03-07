-- Migration: Add expenses table
CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`merchant` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text NOT NULL DEFAULT 'EUR',
	`date` integer NOT NULL,
	`category_id` text,
	`notes` text,
	`receipt_image_path` text,
	`vat_amount` real,
	`is_manual_entry` integer DEFAULT false,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);

-- Index for user queries
CREATE INDEX `idx_expenses_user_id` ON `expenses` (`user_id`);

-- Index for date sorting
CREATE INDEX `idx_expenses_date` ON `expenses` (`date`);
