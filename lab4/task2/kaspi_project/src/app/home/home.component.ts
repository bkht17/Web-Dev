import { Component, inject } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { Product } from '../interface/products.interface';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-home',
  imports: [ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: Product[] = [];

  productService: ProductsService = inject(ProductsService);

  constructor() {
    this.products = this.productService.getAllProducts();
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
