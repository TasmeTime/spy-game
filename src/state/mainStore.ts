import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./slices/gameSlice";

const store = configureStore({
  reducer: {
    game: gameSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
