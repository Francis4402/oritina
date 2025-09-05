export const publicRoutes = [
    "/", "/blogs", "/aboutus", "/shop", "/product/:id", "/blogs/:id",
];

export const adminRoutes = [
    "/dashboard", "/product/:id", "/blogs/:id", "/dashboard/comments", "/dashboard/products", "/dashboard/blogs", "/dashboard/category"
];

export const userRoutes = [
    "/:id", "/product/:id", "/blogs/:id",
];

export const authRoutes = ["/login", "/register"];


export const DEFAULT_LOGIN_REDIRECT = "/";
