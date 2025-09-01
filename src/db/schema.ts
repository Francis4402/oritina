
import { pgEnum, text, pgTable, timestamp, uuid, varchar, integer, boolean } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum('user_role', ['User', 'Admin']);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }),
  image: varchar("image", { length: 255 }),
  role: userRoleEnum('role').notNull().default('User'),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const productsTable = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  productImage: text("product_image").array().notNull(),
  color: varchar({ length: 255 }).array().notNull(),
  spcefication: varchar({ length: 255 }).array().notNull(),
  category: varchar({ length: 255 }).notNull(),
  producttype: varchar({ length: 255 }).notNull(),
  totalRating: varchar({ length: 255 }),
  reviews: varchar({ length: 255 }),
  size: varchar({ length: 255 }).array().notNull(),
  isFavorite: boolean("is_favorite").notNull().default(false),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const categoriesTable = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  category: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const blogsTable = pgTable("blogs", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  description: text("description").notNull(),
  blogImage: text("blog_image").notNull(),
  blogtype: varchar("blog_type", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const commentTable = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  blogId: uuid("blog_id").references(() => blogsTable.id).notNull(),
  userId: uuid("user_id").references(() => usersTable.id).notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const likeTable = pgTable("likes", {
  id: uuid("id").primaryKey().defaultRandom(),
  blogId: uuid("blog_id").references(() => blogsTable.id).notNull(),
  userId: uuid("user_id").references(() => usersTable.id).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const ratingTable = pgTable("rating", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => productsTable.id).notNull(),
  userId: uuid("user_id").references(() => usersTable.id).notNull(),
  rating: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})