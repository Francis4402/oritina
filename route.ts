export const publicRoutes = [
    "/", "/blogs", "/aboutus", "/shop", "/product/:id", "/blogs/:id", "/success", "/cancel", "/orders"
];

export const adminRoutes = [
    "/dashboard", "/product/:id", "/blogs/:id", "/dashboard/proudct-comments", "/dashboard/blog-comments", "/dashboard/products", "/dashboard/blogs", "/dashboard/category", "/dashboard/orders", "/cart"
];

export const userRoutes = [
    "/:id", "/product/:id", "/blogs/:id", "/cart"
];

export const authRoutes = ["/login", "/register"];


export const DEFAULT_LOGIN_REDIRECT = "/";
