import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '@app/app.config';

import * as fromArticles from './article.reducer';
import * as fromCategories from './category.reducer';
import * as fromUsers from './user.reducer';
import * as fromSearch from './search.reducer';
import * as fromInteractions from './interaction.reducer';

export const reducers: ActionReducerMap<AppState> = {
  articles: fromArticles.reducer,
  categories: fromCategories.reducer,
  user: fromUsers.reducer,
  search: fromSearch.reducer,
  interaction: fromInteractions.reducer
};

export const getAppState = createFeatureSelector<AppState>('AppState');


