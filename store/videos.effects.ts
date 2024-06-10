import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadVideos, loadVideosFailure, loadVideosSuccess } from "./videos.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { VideosService } from "../src/app/services/videos.service";

@Injectable()
export class VideosEffects {
  constructor(
    private actions$: Actions,
    private videoService: VideosService
  ) {}

  loadVideos$ = createEffect(() => 
    this.actions$.pipe(
    ofType(loadVideos),
    mergeMap(()=> 
      this.videoService.getVideos().pipe(
        map(videos => loadVideosSuccess({videos})),
        catchError(error => of(loadVideosFailure({error})))
      )
    ) 
  ))
}