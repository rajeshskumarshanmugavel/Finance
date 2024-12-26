import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Marker {
  position: { lat: number; lng: number };
  mediaType: string;
  sector: string;
}

interface ApiResponse {
  ID: number;
  screenlocation: string;
  ADDRESS: string;
  COUNTRY: string;
  latitude: string;
  longitude: string;
  postCode: string;
  mediaType: string;
  sector: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private apiUrl = '/api/screen'; 

  constructor(private http: HttpClient) {}

  getMarkers(): Observable<Marker[]> {
    return this.http.get<ApiResponse[]>(this.apiUrl).pipe(
      map(results => results.map(result => ({
        position: {
          lat: parseFloat(result.latitude), 
          lng: parseFloat(result.longitude)  
        },
        screenId: result.screenlocation,
        mediaType: result.mediaType,
        sector: result.sector
      })))
    );
  }

  /*
  getMarkersByPostcode(postcode: string): Observable<Marker | null> {
    return this.http.get<ApiResponse[]>(`${this.apiUrl}?postcode=${postcode}`).pipe(
      map(results => {
        const matchedMarker = results.find(result => result.postCode === postcode);
        
        if (!matchedMarker) {
          return null; 
        } else {
          return {
            position: {
              lat: parseFloat(matchedMarker.latidude),  
              lng: parseFloat(matchedMarker.longitude)
            },
            screenId: matchedMarker.screenlocation,
            networkOwner: matchedMarker.storename
          };
        }
      })
    );
  }
  */
}  
