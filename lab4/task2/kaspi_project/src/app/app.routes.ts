import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  { path: 'products', component: ProductsComponent, title: 'Products Page' },
  { path: 'details', component: ProductListComponent, title: 'Details Page' },
];
