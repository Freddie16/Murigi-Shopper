import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service'; // <-- Add this

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService // <-- Add this
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProductDetails(+productId);
    }
  }

  fetchProductDetails(id: number): void {
    this.productService.getProduct(id).subscribe((data) => {
      this.product = data;
    });
  }

  // Add this method
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert('Product added to cart!');
  }
}