export const publicRoutes = [
    "/", "/blogs", "/aboutus",
];

export const adminRoutes = [
    "/dashboard", "/", "/:id", "/projects/:id", "/blogs/:id", "/dashboard/projects", "/dashboard/blogs", "/dashboard/messages"
];

export const userRoutes = [
    "/", "/:id", "/projects/:id", "/blogs/:id",
];

export const authRoutes = ["/signin", "/singup"];


export const DEFAULT_LOGIN_REDIRECT = "/";
