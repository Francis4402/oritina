export const publicRoutes = [
    "/", "/blogs", "/aboutus", "/shop", "/product/:id", "/blogs/:id", "/success", "/cancel", "/not-found", "/404", "/forgot-password", "/reset-password", "/services", "/contactus", "/wishlist"
];

export const adminRoutes = [
    "/dashboard", "/product/:id", "/blogs/:id", "/dashboard/proudct-comments", "/dashboard/blog-comments", "/dashboard/products", "/dashboard/blogs", "/dashboard/category", "/dashboard/orders", "/cart", "/orders", "/services"
];

export const userRoutes = [
    "/:id", "/product/:id", "/blogs/:id", "/cart", "/orders", "/services"
];

export const authRoutes = ["/login", "/register"];


export const DEFAULT_LOGIN_REDIRECT = "/";
