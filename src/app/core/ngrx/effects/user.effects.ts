import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as UserActions from '../actions/user.actions';
import { map, concatMap, catchError } from 'rxjs/operators';
import { StorageService } from '@app/core/storage/storage.service';
import { UserService } from '@app/core/services/user/user.service';
import { InteractionService } from '@app/core/services/interaction/interaction.service';

@Injectable()

export class UserEffects {
  constructor(private actions: Actions,
              private user: UserService,
              private interaction: InteractionService,
              private ls: StorageService) { }
  // SET USER
  setUserEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.setUser),
      concatMap((action) =>
         of(UserActions.setUserSuccess({user: action.user}))),
          catchError(error =>
              of(UserActions.setUserFailure({ error: error.message }))
        )
      )
  );

  // GET ALL USER
  getUsersEffect$ = createEffect(() => this.actions
  .pipe(
    ofType(UserActions.getAllUsers),
    concatMap((action) =>
    this.user.getUsers()
    .pipe(
      map(res => UserActions.getAllUsersSuccess({users: res.users})),
        catchError(error =>
            of(UserActions.setUserFailure({ error: error.message }))
      )
     )
    )
   )
  );

  // GET USER BY NAME
  getUserByNameEffect$ = createEffect(() => this.actions
  .pipe(
    ofType(UserActions.getUserByName),
    concatMap((action) =>
    this.user.getUserByName(action.name)
      .pipe(
        map(res => UserActions.getUserByNameSuccess({user: res.user})),
        catchError(error =>
            of(UserActions.getUserByNameFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // GET INTERACTION BY USER
  getInteractionByUserEffect$ = createEffect(() => this.actions
  .pipe(
    ofType(UserActions.getInteractionByUser),
    concatMap(() =>
    this.interaction.getInteractionByUser()
      .pipe(
        map(res => UserActions.getInteractionByUserSuccess({interaction: res.interaction})),
        catchError(error =>
            of(UserActions.getInteractionByUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // GET MOST ACTIVE USERS
  getMostActiveUsersEffect$ = createEffect(() => this.actions
  .pipe(
    ofType(UserActions.getMostActiveUsers),
    concatMap(() =>
    this.user.getMostActiveUsers()
      .pipe(
        map(res => UserActions.getMostActiveUsersSuccess({active: res.users})),
        catchError(error =>
            of(UserActions.getMostActiveUsersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // SET USER EMAIL
  setUserEmailEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.setUserEmail),
      concatMap((action) =>
         of(UserActions.setUserEmailSuccess({email: action.email}))),
          catchError(error =>
              of(UserActions.setUserEmailFailure({ error: error.message }))
        )
      )
  );

  // VERIFY TOKEN
  verifyTokenEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.verifyToken),
      concatMap(() =>
      this.user.verifyToken()
        .pipe(
          map(res => UserActions.verifyTokenSuccess({user: res.user})),
          catchError(error =>
              of(UserActions.verifyTokenFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // REFRESH TOKEN
  refreshTokenEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(UserActions.refreshToken),
      concatMap((action) =>
      this.user.refreshToken(action.id)
        .pipe(
          map(res => {
            if (res.ok) {
              this.ls.setKey('token', res.token);
              this.user.setUser(res.user);
              return UserActions.refreshTokenSuccess({ user: res.user });
            }
          }),
          catchError(error =>
              of(UserActions.refreshTokenFailure({ error: error.message }))
          )
        )
      )
    )
  );

}
