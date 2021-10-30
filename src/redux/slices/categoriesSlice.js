import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMovies = createAsyncThunk('movies/getMovies', async () => {
  const { data } = await axios.get('db/movies-data.json');
  return data;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      const category = {
        id: Date.now(),
        name: action.payload.name,
        description: action.payload.description
          ? action.payload.description
          : '',
        movies: [],
      };
      state.push(category);
    },
    addMovie: (state, action) => {
      const newMovie = {
        id: Date.now(),
        name: action.payload.name,
        description: action.payload.description
          ? action.payload.description
          : '',
        rate: 0,
      };

      const index = state.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      state[index].movies.push(newMovie);
    },
    editMovie: (state, action) => {
      const newMovie = {
        id: action.payload.movieId,
        name: action.payload.newName,
        description: action.payload.newDescription,
        rate: action.payload.rate,
      };

      const index = state.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      const movieIndex = state[index].movies.findIndex(
        (movie) => movie.id === action.payload.movieId
      );

      state[index].movies[movieIndex] = newMovie;
    },
    deleteMovie: (state, action) => {
      const index = state.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      state[index].movies = state[index].movies.filter(
        (movie) => movie.id !== action.payload.movieId
      );
    },
  },
  extraReducers: {
    [getMovies.pending]: (state, action) => {
      console.log('fetching...');
    },
    [getMovies.fulfilled]: (state, action) => {
      console.log('fetched successfully...');
      return action.payload.categories;
    },
  },
});

const { actions, reducer } = categoriesSlice;

export const { addCategory, addMovie, editMovie, deleteMovie } = actions;
export default reducer;
