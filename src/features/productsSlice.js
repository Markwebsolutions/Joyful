import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://joyful-backend-backend-final-4-production.up.railway.app/categories');
        if (!response.ok) throw new Error('Failed to fetch data');
        return await response.json();
    }
);

export const fetchProductDetails = createAsyncThunk(
    'products/fetchProductDetails',
    async (productId) => {
        const response = await fetch(`https://joyful-backend-backend-final-4-production.up.railway.app/products/${productId}`);
        if (!response.ok) throw new Error('Product not found');
        return { productId, data: await response.json() };
    }
);

const processApiData = (data) => {
    const publishedCategories = data.filter(category => category.published);

    const processedCategories = [
        {
            name: 'All Categories',
            subcategories: []
        },
        ...publishedCategories.map(category => ({
            ...category,
            subcategories: category.subcategories
                .filter(sub => sub.ispublished)
                .map(sub => sub.name)
        }))
    ];

    const processedProducts = publishedCategories.flatMap(category =>
        category.subcategories
            .filter(sub => sub.ispublished)
            .flatMap(sub =>
                sub.products
                    .filter(product => product.ispublished)
                    .map(product => ({
                        ...product,
                        category: category.name,
                        subcategory: sub.name,
                        variants: product.variantsMap ? JSON.parse(product.variantsMap) : {}
                    }))
            )
    );

    return { processedCategories, processedProducts };
};

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        categories: [],
        productDetails: {},
        status: 'idle',
        error: null,
        lastFetch: null,
    },
    reducers: {
        refreshProducts: (state) => {
            state.status = 'idle';
        },
        clearProductDetails: (state, action) => {
            delete state.productDetails[action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { processedCategories, processedProducts } = processApiData(action.payload);
                state.categories = processedCategories;
                state.data = processedProducts;
                state.lastFetch = new Date().toISOString();
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.productDetails[action.payload.productId] = action.payload.data;
            });
    },
});

export const { refreshProducts, clearProductDetails } = productsSlice.actions;
export default productsSlice.reducer;