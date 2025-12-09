import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from '@/config/apiConfig.ts';


interface customerAuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    customerData: any;
    loginTimestamp: number | null;
    phoneNum: number | null;
}

const initialState: customerAuthState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    customerData: null,
    loginTimestamp: null,
    phoneNum: null
};


export const fetchCustomerAuth = createAsyncThunk(
    'customerAuth/fetchCustomerAuth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}/api/customer/authentication`, {
                credentials: 'include',
            });

            if (!res.ok) {
                return rejectWithValue('Unauthorized');
            }

            const data = await res.json();
            return data;
        } catch (err) {
            return rejectWithValue('Network error');
        }
    }
);

export const logoutCustomerSession = createAsyncThunk(
    'customerAuth/logoutCustomerSession',
    async (_, { dispatch }) => {
        try {
            const res = await fetch(`${BASE_URL}/api/customer/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            if (res.ok) {
                dispatch(logoutCustomer());
            }
        } catch (err) {
            dispatch(logoutCustomer());
        }
    }
);



const customerAuthSlice = createSlice({
    name: 'customerAuth',
    initialState,
    reducers: {
        logoutCustomer: (state) => {
            state.isAuthenticated = false;
            state.customerData = null;
            state.loginTimestamp = null; // if you're tracking login time
            state.error = null;
        },
        setCustomerLoginSession: (
            state,
            action: PayloadAction<{ timestamp: number; customerId: string, phoneNum: number }>
        ) => {
            console.log(action.payload.timestamp);

            state.loginTimestamp = action.payload.timestamp;
            state.customerData = { customerId: action.payload.customerId };
            state.phoneNum =  action.payload.phoneNum;
            state.isAuthenticated = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomerAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomerAuth.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.customerData = action.payload;
            })
            .addCase(fetchCustomerAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
                state.customerData = null;
            });
    },
});


export const { logoutCustomer, setCustomerLoginSession } = customerAuthSlice.actions;
export default customerAuthSlice.reducer;
