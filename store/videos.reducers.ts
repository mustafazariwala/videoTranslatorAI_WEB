import { createReducer, on, ActionCreator, ReducerTypes } from "@ngrx/store";
import { AppState } from "./app.state";
import { clearVideos, loadVideosSuccess } from "./videos.actions";

export const initialState: AppState = {
  videos: []
};

export const videosReducer = createReducer(
  initialState,
  on(loadVideosSuccess, (state: AppState, {videos}) => {
    return {...state, videos}
  }),
  on(clearVideos, (state: AppState) => {
    return {...state, videos: []}
  })
)