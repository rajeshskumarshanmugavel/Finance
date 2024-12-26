import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InvoiceComponent } from '../components/pages/invoice/invoice.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  stripe: Stripe | null = null;
  cardElement: any;
  cardError: string | undefined;
  orders: any[] = [];  // Property to store orders
  
  constructor(private http: HttpClient, private router: Router) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_JKgDXcqz6u8iSrTfF7WNSJzI'); // Replace with your Stripe publishable key
    const elements = this.stripe?.elements();
    this.cardElement = elements?.create('card');
    this.cardElement?.mount('#card-element');
  }

  async handlePayment() {

    var formData = new FormData();
        
    formData.append("paymentid", "12345");


    const { paymentMethod, error } = await this.stripe?.createPaymentMethod({
      type: 'card',
           card: this.cardElement,
    }) || {};

    if (error) {
      this.cardError = error.message;
    } else {
      // Send the paymentMethod.id to the backend for processing
      console .log(paymentMethod?.id)
      this.http.post('/api/payments', { paymentMethodId: paymentMethod?.id })
        .subscribe(response => {
          alert('Payment successful!');
          this.router.navigate(['/admin/invoice']); 
        }, error => {
          this.cardError = 'Payment failed. Please try again.';
        });
    }
  }

}
