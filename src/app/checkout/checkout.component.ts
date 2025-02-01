import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CartService } from '../services/cart.service';

declare var paypal: any; // Declare paypal

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
    cartItems: any[] = [];
    totalPrice: number = 0;
    @ViewChild('paypalButtonContainer', { static: false }) paypalButtonContainer!: ElementRef;

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
        this.cartItems = this.cartService.getCartItems();
        this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
    }

    ngAfterViewInit(): void {
        this.checkAndRenderPayPalButton(); // Call the check function
    }

    checkAndRenderPayPalButton(): void {
        if (typeof paypal !== 'undefined') { // Check if paypal is defined
            this.renderPayPalButton();
        } else {
            console.log('PayPal SDK not loaded yet, retrying...');
            setTimeout(() => this.checkAndRenderPayPalButton(), 500); // Check again after 500ms
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
                                    currency_code: 'USD'
                                }
                            }
                        ]
                    });
                },
                onApprove: (data: any, actions: any) => {
                    return actions.order.capture().then((details: any) => {
                        alert('Transaction completed by ' + details.payer.name.given_name);
                        this.cartService.clearCart();
                        this.cartItems = [];
                    });
                },
                onError: (err: any) => {
                    console.error('PayPal Error:', err);
                    alert('An error occurred during payment. Please try again.');
                }
            })
            .render(this.paypalButtonContainer.nativeElement) // Use the ViewChild reference
            .then(() => {
                console.log('PayPal button rendered successfully');
            })
            .catch((err: any) => {
                console.error('Failed to render PayPal button:', err);
            });
    }

    getTotalPrice(): number {
        return this.totalPrice;
    }
}