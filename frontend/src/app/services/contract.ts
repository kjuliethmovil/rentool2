/**
 * Archivo: contract.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar contratos (ContractI) con datos simulados en memoria.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ContractI } from '../models/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contractsService = new BehaviorSubject<ContractI[]>([
    {
      contract_id: 1,
      client_id: 1,
      start_date: new Date('2025-01-01'),
      end_date: new Date('2025-01-07'),
      total_amount: 700.0,
      status: 'ACTIVE'
    }
  ]);

  contracts$ = this.contractsService.asObservable();

  getContracts() {
    return this.contractsService.value;
  }

  addContract(contract: ContractI) {
    const contracts = this.contractsService.value;
    contract.contract_id = contracts.length
      ? Math.max(...contracts.map(c => c.contract_id ?? 0)) + 1
      : 1;
    this.contractsService.next([...contracts, contract]);
  }
  updateContract(updatedContract: ContractI) {
    const contracts = this.contractsService.value.map(contract =>
      contract.contract_id === updatedContract.contract_id ? updatedContract : contract
    );
    this.contractsService.next(contracts);
  }
}
