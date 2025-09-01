

export interface product {
    id?: string;
    name: string;
    description: string;
    price: number;
    productImage: string[];
    category: string;
    producttype: string;
    color: string[];
    size: string[];
    spcefication: string[];
    totalRating?: string;
    reviews?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface blog {
    id?: string;
    title: string;
    description: string;
    blogImage: string;
    blogtype: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface category {
    id?: string;
    category: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface comment {
    id?: string;
    blogId: string;
    userId: string;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface like {
    id?: string;
    blogId: string;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface rating {
    id?: string;
    productId: string;
    userId: string;
    rating: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface SearchParams {
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    sort?: string;
    page?: string;
    view?: string;
}
  