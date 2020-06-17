import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rate } from '../models/rate.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private httpClient: HttpClient) {
  }

  getRate(): Observable<Rate[]> {
    return this.httpClient
      .get<Rate[]>(environment.rate);
  }

  getRateByCurrency(currency: string): Observable<Rate[]> {
    return this.httpClient
      .get<Rate[]>(`${environment.rate}/${currency}`);
  }
}
