import { boolean, doublePrecision, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const providersTable = pgTable("providers", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  websiteUrl: text("website_url"),
  pricingUrl: text("pricing_url"),
  docsUrl: text("docs_url"),
  logoUrl: text("logo_url"),
  isOpenSource: boolean("is_open_source").notNull().default(false),
  headquarters: text("headquarters"),
  verifiedByAdmin: boolean("verified_by_admin").notNull().default(false),
  lastVerifiedAt: timestamp("last_verified_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertProviderSchema = createInsertSchema(providersTable).omit({
  id: true,
  createdAt: true,
});
export type InsertProvider = z.infer<typeof insertProviderSchema>;
export type ProviderRow = typeof providersTable.$inferSelect;

export const modelsTable = pgTable("models", {
  id: serial("id").primaryKey(),
  providerId: integer("provider_id")
    .notNull()
    .references(() => providersTable.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  pricingType: text("pricing_type").notNull(),
  priceInputPerMillionTokens: doublePrecision("price_input_per_million_tokens"),
  priceOutputPerMillionTokens: doublePrecision("price_output_per_million_tokens"),
  priceUnit: text("price_unit"),
  priceNotes: text("price_notes"),
  contextWindowTokens: integer("context_window_tokens"),
  maxOutputTokens: integer("max_output_tokens"),
  modalitiesInput: text("modalities_input").array().notNull().default([]),
  modalitiesOutput: text("modalities_output").array().notNull().default([]),
  specialties: text("specialties").array().notNull().default([]),
  usageLimits: text("usage_limits"),
  apiAvailable: boolean("api_available").notNull().default(false),
  officialLink: text("official_link"),
  releaseDate: text("release_date"),
  verifiedByAdmin: boolean("verified_by_admin").notNull().default(false),
  lastUpdatedAt: timestamp("last_updated_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertModelSchema = createInsertSchema(modelsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertModel = z.infer<typeof insertModelSchema>;
export type ModelRow = typeof modelsTable.$inferSelect;
