import { pgEnum, text, pgTable, timestamp, uuid, varchar, integer, boolean } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum('user_role', ['User', 'Admin']);


export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }),
  image: varchar("image", { length: 255 }),
  address: varchar({ length: 1000 }).notNull(),
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
  readTime: integer("read_time"),
  quantity: integer("quantity").notNull(),
  size: varchar({ length: 255 }).array().notNull(),
  isFavorite: boolean("is_favorite").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const categoriesTable = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  category: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blogsTable = pgTable("blogs", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar({ length: 255 }).notNull(),
  blogImage: text("blog_image").notNull(),
  readTime: integer("read_time"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const commentTable = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  blogId: uuid("blog_id").references(() => blogsTable.id, { onDelete: "cascade" }).notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const productCommentTable = pgTable("productComment", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => usersTable.id, {onDelete: "cascade"}).notNull(),
  productId: uuid("product_id").references(() => productsTable.id, {onDelete: "cascade"}).notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const likeTable = pgTable("likes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => usersTable.id).notNull(),
  blogId: uuid("blog_id").references(() => blogsTable.id, { onDelete: "cascade" }).notNull(),
  liked: boolean("liked").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const ratingTable = pgTable("rating", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => productsTable.id, {onDelete: "cascade"}).notNull(),
  userId: uuid("user_id").references(() => usersTable.id).notNull(),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const orderTable = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  products: text("products").notNull(),
  total: integer("total").notNull(),
  shipping: integer("shipping").notNull(),
  tax: integer("tax").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  status: varchar("status").notNull().default("Pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});