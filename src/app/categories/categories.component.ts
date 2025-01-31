import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  categoryProducts: { [key: string]: any[] } = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
      this.categories.forEach((category) => {
        this.fetchProductsByCategory(category);
      });
    });
  }

  fetchProductsByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe((data) => {
      this.categoryProducts[category] = data;
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert('Product added to cart!');
  }
}