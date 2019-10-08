import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromUsers from '@core/ngrx/selectors/user.selectors';
import { AppState } from '@app/app.config';
import { of, Subject, Observable } from 'rxjs';
import { User, ArticleResponse, Article } from '@app/shared/interfaces/interfaces';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ArticleService, CrafterService } from '@app/core/services/services.index';
import { ConfirmComponent } from '@app/shared/components/layout/dialogs/confirm/confirm.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss']
})

export class AdminContentComponent implements OnInit, OnDestroy {

  published: Article[];
  archived: Article[];
  admin$: Observable<Article[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>,
              private articleService: ArticleService,
              private crafter: CrafterService) { }

  ngOnInit() {
    this.getArticlesByUser();
    this.admin$ = this.getArticlesToAdmin();
  }

  private getArticlesByUser() {
    this.store.select(fromUsers.getUser)
      .pipe(switchMap((res: User) => {
        return res ? this.articleService.getArticlesByUser() :
        of({ok: false});
      }), takeUntil(this.unsubscribe$))
      .subscribe((res: ArticleResponse) => {
        if (res.ok) {
          this.published = res.articles.filter((a: Article) => a.draft === false && a.admin !== true);
          this.archived = res.articles.filter((a: Article) => a.draft === true);
        }
    });
  }

  private getArticlesToAdmin(): Observable<Article[]> {
    return this.articleService.getArticlesToAdmin();
  }

  archive(id: string): void {
    this.crafter.dialog(ConfirmComponent).afterClosed()
      .pipe(switchMap((res: boolean) => {
        return res ? this.articleService.publishArticle(id, true) :
        of({ok: false});
      }), takeUntil(this.unsubscribe$))
      .subscribe((res: ArticleResponse) => {
        if (res.ok) {
          this.crafter.toaster('success', 'article.archived', 'info');
          this.getArticlesByUser();
        }
      }, (err: HttpErrorResponse) => {
        err.status === 0 ?
        this.handleError('server') : this.handleError();
    });
  }

  private handleError(type?: string): void {
    if (type === 'server') {
      this.crafter.toaster('server.error',
                           'server.bad',
                           'error');
    } else {
      this.crafter.toaster('update.error',
                           'server.bad',
                           'error');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}