import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalsService from "./goalsService";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Goals
export const getGoals = createAsyncThunk(
  "goals/get",
  async (user, thunkAPI) => {
    try {
      return await goalsService.getGoals();
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Post Goal
export const postGoal = createAsyncThunk(
  "goals/post",
  async (goal, thunkAPI) => {
    try {
      return await goalsService.postGoal(goal);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update Goal
export const updateGoal = createAsyncThunk(
  "goals/update",
  async (data, thunkAPI) => {
    const { id, text } = data;
    try {
      return await goalsService.updateGoal(id, text);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id, thunkAPI) => {
    try {
      await goalsService.deleteGoal(id);
      return await goalsService.getGoals();
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset(state) {
      state.goals = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postGoal.pending(), (state, action) => {
        state.isLoading = true;
      })
      .addCase(postGoal.fulfilled(), (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(postGoal.rejected(), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending(), (state, action) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled(), (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected(), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending(), (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled(), (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(deleteGoal.rejected(), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalsSlice.actions;
export default goalsSlice.reducer;
