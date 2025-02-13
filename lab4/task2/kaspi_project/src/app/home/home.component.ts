import { Component, inject } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { Product } from '../interface/products.interface';
import { ProductsService } from '../products/products.service';
import { ProductList } from '../interface/product-list.interface';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductListService } from '../product-list/product-list.service';

@Component({
  selector: 'app-home',
  imports: [ProductsComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  productList: ProductList[] = [];
  products: Product[] = [];

  productListService: ProductListService = inject(ProductListService);
  productService: ProductsService = inject(ProductsService);

  constructor() {
    this.products = this.productService.getAllProducts();
    this.productList = this.productListService.getAllCategories();
  }

  loadProducts() {
    this.products = this.productService.getAllProducts().map((product) => ({
      ...product,
      likes:
        Number(localStorage.getItem(`likes_${product.id}`)) || product.likes,
    }));
  }

  removeProduct(productId: number) {
    this.products = this.products.filter((product) => product.id !== productId);
    localStorage.removeItem(`liked_${productId}`);
    localStorage.removeItem(`likes_${productId}`);
  }

  updateLikes({
    id,
    likes,
    isLiked,
  }: {
    id: number;
    likes: number;
    isLiked: boolean;
  }) {
    const product = this.products.find((p) => p.id === id);
    if (!product) return;

    product.likes = likes;
    localStorage.setItem(`likes_${id}`, likes.toString());
    localStorage.setItem(`liked_${id}`, isLiked.toString());
  }
}
