import { Component, inject } from '@angular/core';
import { ProductList } from '../interface/product-list.interface';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  productList: ProductList[] = [];
  housingService: ProductListService = inject(ProductListService);

  constructor() {
    this.productList = this.housingService.getAllCategories();
  }
}
