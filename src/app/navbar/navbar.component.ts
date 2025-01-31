import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service'; // <-- Add this
import { Router } from '@angular/router'; // <-- Add this

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;
  searchQuery: string = ''; // <-- Add this

  constructor(
    private cartService: CartService,
    private productService: ProductService, // <-- Add this
    private router: Router // <-- Add this
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }

  // Add this method
  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.productService.getProducts().subscribe((products) => {
        const foundProduct = products.find((product) =>
          product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        if (foundProduct) {
          this.router.navigate(['/products', foundProduct.id]); // Navigate to the product details page
        } else {
          alert('Product not found'); // Show an alert if the product is not found
        }
      });
    }
  }
}