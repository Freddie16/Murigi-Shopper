import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

declare var paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
    this.loadPayPalScript();
  }

  loadPayPalScript(): void {
    if (!window.paypal) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=AaBmfVFId5noEBHTUjBvlUiLG1cY3JmUVidpled2DFPAGO0d_fnfbMQ1TIjcoAEnupqi_9yV3pmyrrje`;
      script.onload = () => this.renderPayPalButton();
      document.body.appendChild(script);
    } else {
      this.renderPayPalButton();
    }
  }

  renderPayPalButton(): void {
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.totalPrice.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert('Transaction completed by ' + details.payer.name.given_name);
            this.cartService.clearCart();
          });
        },
      })
      .render('#paypal-button-container');
  }
}