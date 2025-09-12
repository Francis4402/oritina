export const publicRoutes = [
    "/", "/blogs", "/aboutus", "/shop", "/product/:id", "/blogs/:id", "/success", "/cancel"
];

export const adminRoutes = [
    "/dashboard", "/product/:id", "/blogs/:id", "/dashboard/comments", "/dashboard/products", "/dashboard/blogs", "/dashboard/category", "/cart"
];

export const userRoutes = [
    "/:id", "/product/:id", "/blogs/:id", "/cart"
];

export const authRoutes = ["/login", "/register"];


export const DEFAULT_LOGIN_REDIRECT = "/";
