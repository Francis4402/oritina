import { pgEnum, text, pgTable, timestamp, uuid, varchar, integer, boolean } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum('user_role', ['User', 'Admin']);
export const orderStatusEnum = pgEnum('order_status', ['Pending', 'Shipped', 'Delivered', 'Cancelled']);
export const blogCategoryEnum = pgEnum('category_status', ['fashion', 'lifestyle', 'trends', 'sustainability']);

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
  totalRating: varchar({ length: 255 }),
  reviews: varchar({ length: 255 }),
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
  category: blogCategoryEnum().notNull(),
  blogImage: text("blog_image").notNull(),
  readTime: integer("read_time").notNull(),
  likes: uuid("likes").references(() => likeTable.id).notNull(),
  comments: uuid("comments").references(() => commentTable.id).notNull(),
  blogtype: varchar("blog_type", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const commentTable = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => usersTable.id).notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const likeTable = pgTable("likes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => usersTable.id).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const ratingTable = pgTable("rating", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => productsTable.id).notNull(),
  userId: uuid("user_id").references(() => usersTable.id).notNull(),
  rating: varchar({ length: 255 }).notNull(),
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
  order: orderStatusEnum("order_status").notNull().default("Pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});