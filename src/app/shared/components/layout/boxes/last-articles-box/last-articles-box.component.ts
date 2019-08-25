import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '@app/shared/interfaces/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.config';
import { map } from 'rxjs/operators';
import * as fromArticles from '@core/ngrx/selectors/article.selectors';

@Component({
  selector: 'app-last-articles-box',
  templateUrl: './last-articles-box.component.html',
  styleUrls: ['./last-articles-box.component.scss']
})
export class LastArticlesBoxComponent implements OnInit {

  articles$: Observable<Article[]>;

  constructor(store: Store<AppState>) {
   this.articles$ = store.select(fromArticles.getAllArticles)
      .pipe(map((res: Article[]) => {
        return res.slice(0, 4);
      }));
   }

  ngOnInit() { }

}
