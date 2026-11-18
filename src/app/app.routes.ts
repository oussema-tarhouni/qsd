import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ArticleComponent } from './article/article.component';
import { CATEGORIES } from './categories';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'article/:id', component: ArticleComponent },
  ...CATEGORIES.map(c => ({ path: c.slug, component: CategoryComponent, data: { slug: c.slug } })),
  { path: '**', component: CategoryComponent, data: { slug: '' } }
];
