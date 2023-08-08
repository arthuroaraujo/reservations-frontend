import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.baseUrl);
  }

  findById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/${id}`);
  }

  create(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}`, reservation);
  }

  update(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/${id}`, reservation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/cancelar`);
  }

  findAllConfirmed(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/confirmadas`);
  }

  findAllPending(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/pendentes`);
  }

  findAllCancelled(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/canceladas`);
  }
}
