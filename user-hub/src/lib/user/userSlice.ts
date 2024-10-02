// slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API call to fetch all users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const userList = state.user.users;
    
    console.log(userList);
    if (userList.length) {
      return userList;
    }

    try {
      const response = await fetch("https://dummyjson.com/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      return data.users; // Assuming the API returns an object with a 'users' array
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// API call to fetch a user by ID
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId, thunkApi) => {
    const state = thunkApi.getState();
    const existingUser = state.user.users.find((user) => user.id === parseInt(userId));
    console.log(existingUser);
    if (existingUser) {
      return existingUser;
    }

    try {
      console.log(`https://dummyjson.com/users/${userId}`);
      const response = await fetch(`https://dummyjson.com/users/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      return data; // Assuming the API returns the user object directly
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
