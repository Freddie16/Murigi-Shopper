import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;
  searchQuery: string = '';

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.productService.getProducts().subscribe((products) => {
        const foundProduct = products.find((product) =>
          product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        if (foundProduct) {
          this.router.navigate(['/products', foundProduct.id]);
        } else {
          alert('Product not found');
        }
      });
    }
  }
}