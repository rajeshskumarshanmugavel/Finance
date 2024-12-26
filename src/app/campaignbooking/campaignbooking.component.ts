import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MarkerService, Marker } from '../shared/services/marker.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaignbooking',
  templateUrl: './campaignbooking.component.html',
  styleUrls: ['./campaignbooking.component.scss']
})
export class CampaignbookingComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) map: GoogleMap | undefined;
  
  page: number = 1;
  center: google.maps.LatLngLiteral = { lat: 55.3781, lng: -3.4360 };  // Default map center
  zoom = 5;
  displayedMarkers: Marker[] = [];
  circle: google.maps.Circle | undefined;
  tooltipVisible = false;
  tooltipPosition = { x: 0, y: 0 };
  tooltipData: Marker = { position: { lat: 0, lng: 0 }, mediaType: '', sector: '' };
  rangeInMiles: number = 0;
  campaignName: string = "";
  postcode: string = "";
  postcodeError: boolean = false;
  range: FormGroup;

  stripe: Stripe | null = null;
  cardElement: any;
  cardError: string | undefined;
  orders: any[] = [];  // Property to store orders

  constructor(private http: HttpClient, private markerService: MarkerService, 
              private fb: FormBuilder, private cd: ChangeDetectorRef, private router: Router) {
    this.range = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }

  async loadPaymentPage() {
    console.log("loadPaymentPage");
      this.stripe = await loadStripe('pk_test_JKgDXcqz6u8iSrTfF7WNSJzI');
   // Replace with your Stripe publishable key
const elements = this.stripe?.elements();
      this.cardElement = elements?.create('card');
      this.cardElement?.mount('#card-element');
      console.log("Card Element Mounted");
  }


  async ngOnInit() {

    
    
    this.displayedMarkers = [];
    this.rangeInMiles = 100;
    this.postcode = "EC1A";
  }

  async ngAfterViewInit() {
      if (this.map) { console.log('Google Map instance:', this.map); // Additional map setup or marker addition can go here 
        } 
        else { console.error('Google Map instance not found'); }

      this.updateRange();
    }

  updateRange() {
    if(this.map !== undefined) {
      this.onRangeChange(this.map);
    }
  }

  onPostcodeSubmit() {
  }

  /*
  onPostcodeSubmit(): void {
    this.postcodeError = false;  
    this.displayedMarkers = [];  
  
    this.markerService.getMarkers().subscribe(
      (marker) => {
        if (marker) {
          this.displayedMarkers = [{ ...marker }];
          this.center = marker.position;
          this.zoom = 12;  
        } else {
          this.postcodeError = true;
        }
      },
      (error) => {
        this.postcodeError = true;  
        console.error("Error fetching marker data:", error);
      }
    );
  }
  */
  
  onRangeChange(map: GoogleMap): void {
    if (this.circle) {
      this.circle.setMap(null);
    }

    this.circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map.googleMap,
      center: this.center,
      radius: this.rangeInMiles * 1609.34  
    });

    this.displayedMarkers = [];

    this.markerService.getMarkers().subscribe(
      markers => {
        markers.forEach(marker => {
          const distance = this.calculateDistance(this.center.lat, this.center.lng, marker.position.lat, marker.position.lng);
          if (distance <= this.rangeInMiles) {
            this.displayedMarkers.push(marker);  
          }
        });
      }
    );
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3958.8;  
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  getMarkerTitle(marker: Marker): string {
    return `Latitude: ${marker.position.lat}\nLongitude: ${marker.position.lng}\nMedia Type: ${marker.mediaType}\nSector: ${marker.sector}`;
  }

  showTooltip(marker: Marker, event: MouseEvent) {
    this.tooltipData = marker;
    this.tooltipVisible = true;

    const tooltipX = event.clientX + 20;
    const tooltipY = event.clientY + 20;

    this.tooltipPosition = {
      x: Math.min(tooltipX, window.innerWidth - 200),
      y: Math.min(tooltipY, window.innerHeight - 100)
    };
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }

  onNext() {
    this.page = 2;
  }

  onNext2() {
    this.page = 3;
  }
  private stripeInitialized = false;
  onNext4() {
    this.page = 4;

    if (!this.stripeInitialized) {
      setTimeout(() => {
        this.loadPaymentPage();
        this.stripeInitialized = true;
      }, 100);
    }
    
  }

 
  async handlePayment(event: Event) {
    event.preventDefault();

    if (!this.stripe || !this.cardElement) {
      this.cardError = 'Stripe is not properly initialized.';
      return;
    }
       const { paymentMethod, error } = await this.stripe?.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    }) || {};
    //console.log(error);
    if (error) {
      this.cardError = error.message;
      console.log(error);
    } else {
      var formData = new FormData();
      console .log(paymentMethod?.id)
      formData.append("paymentMethodId", paymentMethod?.id || '');
      // Send the paymentMethod.id to the backend for processing
      console .log(paymentMethod?.id)
      this.http.post('/api/payments', { paymentMethodId: paymentMethod?.id })
        .subscribe(response => {
          console.log('Payment response:', response);
          alert('Payment successful!');
          this.router.navigate(['/main/invoice']); 
        }, error => {
          this.cardError = 'Payment failed. Please try again.';
        });
    }
  }
}
