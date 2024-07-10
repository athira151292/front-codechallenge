import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from '../redux/articles/articlesSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch