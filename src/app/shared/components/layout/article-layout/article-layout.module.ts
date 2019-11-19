import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { ArticleCardComponent } from './article-card/article-card.component';
import { ArticleCardBadgesComponent } from './article-card-badges/article-card-badges.component';
import { ScrollSpyService } from '@layout/article-layout/services/scrollspy.service';
import { ArticleReactionsComponent } from './article-reactions/article-reactions.component';
import { ArticleCardSkeletonComponent } from './article-card-skeleton/article-card-skeleton.component';
import { SnippetsModule } from '../../snippets/snippets.module';
import { LoginModule } from '../../login/login.module';

@NgModule({
  declarations: [
    ArticleCardComponent,
    ArticleCardBadgesComponent,
    ArticleReactionsComponent,
    ArticleCardSkeletonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SnippetsModule,
    LoginModule
  ],
  exports: [
    ArticleCardComponent,
    ArticleReactionsComponent,
    ArticleCardBadgesComponent,
    ArticleCardSkeletonComponent
  ],
  providers: [ScrollSpyService]
})

export class ArticleLayoutModule { }
