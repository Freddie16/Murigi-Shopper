import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(product: any): void {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(product: any): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== product.id);
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }
}