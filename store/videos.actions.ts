import { createAction, props } from "@ngrx/store";


export const loadVideos = createAction('[Videos] Load Videos');
export const loadVideosSuccess = createAction('[Videos] Load Videos Success', props<{ videos: any[] }>());
export const loadVideosFailure = createAction('[Videos] Load Videos Failure', props<{ error: string }>());