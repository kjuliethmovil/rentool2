/**
 * Archivo: contract-detail.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar los detalles de contratos (ContractDetailI) con datos simulados en memoria.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ContractDetailI } from '../models/contract-detail';


@Injectable({
  providedIn: 'root'
})
export class ContractDetailService {
  private contractDetailsService = new BehaviorSubject<ContractDetailI[]>([
    {
      contract_detail_id: 1,
      contract_id: 1,
      equipment_id: 1,
      quantity: 2,
      daily_rate: 50.0,
      days: 5,
      subtotal: 500.0
    }
  ]);

  contractDetails$ = this.contractDetailsService.asObservable();

  getContractDetails() {
    return this.contractDetailsService.value;
  }

  addContractDetail(detail: ContractDetailI) {
    const details = this.contractDetailsService.value;
    detail.contract_detail_id = details.length
      ? Math.max(...details.map(d => d.contract_detail_id ?? 0)) + 1
      : 1;
    this.contractDetailsService.next([...details, detail]);
  }
  updateContractDetail(updatedDetail: ContractDetailI) {
    const details = this.contractDetailsService.value.map(detail =>
      detail.contract_detail_id === updatedDetail.contract_detail_id ? updatedDetail : detail
    );
    this.contractDetailsService.next(details);
  }
}
