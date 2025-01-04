import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhoneModel } from '../models/phone-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "http://localhost:3000/phones";

  constructor(private http: HttpClient) { }

  getPhones(): Observable<PhoneModel[]> {
    return this.http.get<PhoneModel[]>(this.url);
  }

  addPhone(ph: PhoneModel): Observable<PhoneModel> {
    return this.http.post<PhoneModel>(this.url, ph);
  }

  modifyPhone(ph: PhoneModel): Observable<PhoneModel> {
    return this.http.put<PhoneModel>(`${this.url}/${ph.id}`, ph);
  }

  deletePhone(ph: PhoneModel): Observable<PhoneModel> {
    return this.http.delete<PhoneModel>(`${this.url}/${ph.id}`);
  }
}
