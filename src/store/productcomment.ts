import { create } from "zustand";


export const productStore = create((set) => ({
    comment: {},
    isLoading: false,
    error: null,
    fetchData: async () => {
        set({isLoading: true});

        try {
            const response = await fetch(`${process.env.BASE_URL}/product-comment`);

            const data = await response.json();
            set({comment: data});
        } catch (error: any) {
            set({error: error.message});
        } finally {
            set({isLoading: false});
        }
    }
}))