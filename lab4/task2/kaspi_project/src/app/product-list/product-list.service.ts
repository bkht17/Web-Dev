import { Injectable } from '@angular/core';
import { ProductList } from '../interface/product-list.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  protected productList: ProductList[] = [
    { id: 1, name: 'phone' },
    {
      id: 2,
      name: 'laptop',
    },
    {
      id: 3,
      name: 'tv',
    },
    {
      id: 4,
      name: 'headphones',
    },
  ];

  getAllCategories(): ProductList[] {
    return this.productList;
  }

  getCategoriesById(id: Number): ProductList | undefined {
    return this.productList.find((category) => category.id === id);
  }

  constructor() {}
}
