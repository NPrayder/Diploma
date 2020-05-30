import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { SimpleResponse } from '../../../../shared/models/simple-response-interface';

@Injectable()
export class WizardService {

  constructor(private httpClient: HttpClient) { }

  addWizardToken(token: string): Observable<SimpleResponse> {
    return this.httpClient.post<SimpleResponse>(environment.addMonoTokenUrl, {token});
  }

  // addPrivatToken(token: string): Observable<any> {
  //
  // }
}
