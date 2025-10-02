/**
 * Archivo: returns.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar devoluciones (ReturnsI) con datos simulados en memoria.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ReturnsI } from '../models/returns';

@Injectable({
  providedIn: 'root'
})
export class ReturnsService {
  private returnsService = new BehaviorSubject<ReturnsI[]>([
    {
      return_id: 1,
      contract_id: 1,
      date: new Date('2025-02-20'),
      item_condition: 'Buen estado',
      notes: 'Entregado con accesorios completos'
    }
  ]);

  returns$ = this.returnsService.asObservable();

  getReturns() {
    return this.returnsService.value;
  }

  addReturn(returnObj: ReturnsI) {
    const returns = this.returnsService.value;
    returnObj.return_id = returns.length
      ? Math.max(...returns.map(r => r.return_id ?? 0)) + 1
      : 1;
    this.returnsService.next([...returns, returnObj]);
  }
  updateReturn(returnObj: ReturnsI) {
    const returns = this.returnsService.value.map(r =>
      r.return_id === returnObj.return_id ? returnObj : r
    );
    this.returnsService.next(returns);
  }
}
