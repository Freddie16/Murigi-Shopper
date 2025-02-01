import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

declare var paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems(); // Refresh the cart items
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  proceedToCheckout(): void {
    console.log('Proceed to checkout clicked');
    this.router.navigate(['/checkout']).then((success) => {
      if (!success) {
        console.error('Navigation to checkout failed');
      }
    });
  }
  
}