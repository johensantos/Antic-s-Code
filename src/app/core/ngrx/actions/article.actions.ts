import { props, createAction } from '@ngrx/store';
import { Article } from '@app/shared/interfaces/interfaces';

// GET ARTICLES
export const getArticles =
  createAction('[Articles API] Get Articles');

export const getArticlesSuccess =
  createAction('[Articles API] Get Articles Success',
  props<{ articles: Article[] }>());

export const getArticlesFailure =
  createAction('[Articles API] Get Articles Failure',
  props<{ error: string }>());

// GET LAST ARTICLES
export const getLastArticles =
  createAction('[Articles API] Get Last Articles');

export const getLastArticlesSuccess =
  createAction('[Articles API] Get Last Articles Success',
  props<{ articles: Article[] }>());

export const getLastArticlesFailure =
  createAction('[Articles API] Get Last Articles Failure',
  props<{ error: string }>());

// GET MOST LIKED ARTICLES
export const getMostLikedArticles =
  createAction('[Articles API] Get Most Liked Articles');

export const getMostLikedArticlesSuccess =
  createAction('[Articles API] Get Most Liked Articles Success',
  props<{ articles: Article[] }>());

export const getMostLikedArticlesFailure =
  createAction('[Articles API] Get Most Liked Articles Failure',
  props<{ error: string }>());

// GET ARTICLES COUNT
export const getArticlesCount =
  createAction('[Articles API] Get Articles Count');

export const getArticlesCountSuccess =
  createAction('[Articles API] Get Articles Count Success',
  props<{ count: number }>());

export const getArticlesCountFailure =
  createAction('[Articles API] Get Articles Count Failure',
  props<{ error: string }>());

// GET ARTICLE BY SLUG
export const getArticleBySlug =
  createAction('[Articles API] Get Article by Slug',
  props<{ slug: string }>());

export const getArticleBySlugSuccess =
  createAction('[Articles API] Get Articles by Slug Success',
  props<{ article: Article }>());

export const getArticleBySlugFailure =
  createAction('[Articles API] Get Article by Slug Failure',
  props<{ error: string }>());

// RESET ARTICLES
export const resetArticles =
  createAction('[Articles API] Reset Articles');

export const resetSlug =
  createAction('[Articles API] Reset Article Slug');

