import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type Toast = {
  closeIcon?: string;
  severity?: string;
  detail?: string;
  summary?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  text?: string;
  icon?: string;
  key?: string;
  id?: string;
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _messageService: MessageService) {}

  success(summary: string, detail: string, params: Toast = {}): void {
    this._messageService.add({
      severity: 'success',
      summary,
      detail,
      ...params,
    });
  }

  error(summary: string, detail: string, params: Toast = {}): void {
    this._messageService.add({
      severity: 'error',
      summary,
      detail,
      ...params,
    });
  }
}
