import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { LayoutModule } from '@app/shared/components/layout/layout.module';

import { ArticlesHomeComponent } from './components/articles-home/articles-home.component';
import { CategoryHomeComponent } from './components/category-home/category-home.component';

import {
  HeaderHomeModule,
  BestHomeModule,
  TestimonialHomeModule,
  ContactHomeModule
} from './home.index';

@NgModule({
  declarations: [
    HomeComponent,
    ArticlesHomeComponent,
    CategoryHomeComponent
  ],
  imports: [
    LayoutModule,
    HomeRoutingModule,
    HeaderHomeModule,
    BestHomeModule,
    TestimonialHomeModule,
    ContactHomeModule
  ]
})

export class HomeModule { }
