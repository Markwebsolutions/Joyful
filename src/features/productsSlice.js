// features/productsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Make sure this thunk is properly defined and exported
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://joyfulbackend-production.up.railway.app/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        loading: false,
        error: null,
        selectedCategory: 'All Categories',
        selectedSubcategory: null,
        isMobileView: window.innerWidth < 768
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            state.selectedSubcategory = null;
        },
        setSelectedSubcategory: (state, action) => {
            state.selectedSubcategory = action.payload;
        },
        setIsMobileView: (state, action) => {
            state.isMobileView = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

// Make sure all actions are exported
export const {
    setSelectedCategory,
    setSelectedSubcategory,
    setIsMobileView
} = productsSlice.actions;

export default productsSlice.reducer;