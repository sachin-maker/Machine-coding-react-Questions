import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sampleQuestions from "../sampleQuestions";

export const fetchQuestions = createAsyncThunk("quiz/fetchQuestions", async () => {
  if (process.env.NODE_ENV === 'development') {
    return sampleQuestions; // fallback in dev
  }
  const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
  const data = await res.json();
  return data.results;
});


const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [],
    answers: [],
    currentQuestionIndex: 0,
    completed: false,
    status: "idle",
    error: null,
  },
  reducers: {
    selectAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.answers[questionIndex] = answer;
    },
    nextQuestion: (state) => {
  if (Array.isArray(state.questions) && state.currentQuestionIndex < state.questions.length - 1) {
    state.currentQuestionIndex++;
  } else {
    state.completed = true;
  }
},
    resetQuiz: (state) => {
      state.questions = [];
      state.answers = [];
      state.currentQuestionIndex = 0;
      state.completed = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { selectAnswer, nextQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
