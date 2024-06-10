import { createReducer, on, ActionCreator, ReducerTypes } from "@ngrx/store";
import { AppState } from "./app.state";
import { loadVideosSuccess } from "./videos.actions";

export const initialState: AppState = {
  videos: []
};

export const videosReducer = createReducer(
  initialState,
  on(loadVideosSuccess, (state: AppState, {videos}) => {
    return {...state, videos}
  })
)