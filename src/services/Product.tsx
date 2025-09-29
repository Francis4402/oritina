"use server"


import { product } from "@/app/types/Types";
import { revalidateTag } from "next/cache";


const baseurl = process.env.BASE_URL;

export const getProducts = async (page?: string, Size?: string, query?: { [key: string]: string | string[] | undefined }) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (Size) params.append('Size', Size);

    const queryParams = [
        'minPrice', 'maxPrice', 'producttype', 'sort', 'totalRating', 'name'
    ];

    queryParams.forEach(param => {
        if (query?.[param]) {
          params.append(param, query[param]!.toString());
        }
    });

    try {
        const res = await fetch(`${baseurl}/products?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
            next: {
                tags: ['products']
            }
        });

        const data = await res.json();

        return {
            ...data,
            pagination: {
              ...data.pagination,
              total: Number(data.pagination.total)
            }
        }
    } catch (error) {
        console.log(error);
    }
}


export const getProduct = async (id: string) => {
    try {
        const res = await fetch(`${baseurl}/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
            next: {
                tags: ['products']
            }
        });

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (product: product) => {
    try {
        const res = await fetch(`${baseurl}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
            cache: 'no-store',
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || `HTTP error! status: ${res.status}`);
          }

        revalidateTag('products');

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (product: product) => {
    try {
        const res = await fetch(`${baseurl}/products/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
            cache: 'no-store',
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }

        revalidateTag('products');

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (id: string) => {
    try {
        const res = await fetch(`${baseurl}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }

        revalidateTag('products');

        return data;
    } catch (error) {
        console.log(error);
    }
}