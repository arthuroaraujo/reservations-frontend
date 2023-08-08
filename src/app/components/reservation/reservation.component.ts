import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { ReservationService } from 'src/app/service/reservation.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  list: Reservation[] = [];
  filterType: 'all' | 'confirmed' | 'pending' | 'cancelled' = 'all';
  searchId: number | null = null;
  editingId: number | null = null;
  selectedReservation: Reservation | null = null;
  newReservation: Reservation = {
    id: 0,
    nomeHospede: '',
    dataInicio: new Date(),
    dataFim: new Date(),
    quantidadePessoas: 1,
    status: 'CONFIRMADA'
  };

  constructor(private service: ReservationService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.list = resposta;
    });
  }

  findAllConfirmed(): void {
    this.service.findAllConfirmed().subscribe((resposta) => {
      this.list = resposta;
    });
  }

  findAllPending(): void {
    this.service.findAllPending().subscribe((resposta) => {
      this.list = resposta;
    });
  }

  findAllCancelled(): void {
    this.service.findAllCancelled().subscribe((resposta) => {
      this.list = resposta;
    });
  }

  findById(): void {
    if (this.searchId !== null) {
      this.service.findById(this.searchId).subscribe((resposta) => {
        this.list = resposta ? [resposta] : [];
      });
    }
  }

  create(reservation: Reservation): void {
    this.service.create(reservation).subscribe((resposta) => {
      this.list.push(resposta);
      this.selectedReservation = null;
      this.resetForm();
    });
  }

  edit(id: number): void {
    this.editingId = id;
    const reservationToEdit = this.list.find(item => item.id === id);
    if (reservationToEdit) {
      this.newReservation = { ...reservationToEdit };
    }
  }
  
  cancel(id: number): void {
    this.service.delete(id).subscribe(() => {
      const index = this.list.findIndex(item => item.id === id);
      if (index !== -1) {
        this.list[index].status = 'CANCELADA';
      }
    });
  }

  onFilterChange(filterType: 'all' | 'confirmed' | 'pending' | 'cancelled'): void {
    this.filterType = filterType;

    switch (filterType) {
      case 'all':
        this.findAll();
        break;
      case 'confirmed':
        this.findAllConfirmed();
        break;
      case 'pending':
        this.findAllPending();
        break;
      case 'cancelled':
        this.findAllCancelled();
        break;
    }
  }

  createOrUpdate(): void {
    if (this.editingId) {
      this.edit(this.editingId);
    } else {
      this.newReservation.status = 'CONFIRMADA';
      this.create(this.newReservation);
    }
    this.editingId = null;
  }
  
  
  resetSearch(): void {
    this.searchId = null;
    this.findAll();
  }

  cancelEdit(): void {
    this.editingId = null;
    this.resetForm();
  }

  resetForm(): void {
    this.newReservation = {
      id: 0,
      nomeHospede: '',
      dataInicio: new Date(),
      dataFim: new Date(),
      quantidadePessoas: 1,
      status: 'CONFIRMADA'
    };
    this.selectedReservation = null;
  }
}
