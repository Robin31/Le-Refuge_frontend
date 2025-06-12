import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { DashboardMenuComponent } from 'src/app/components/admin/dashboard-menu/dashboard-menu.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { ToastService } from 'src/app/services/toast.service';
import { Chien, ChienCreate } from 'src/app/models/chien-model';
import { ChienService } from 'src/app/services/chien.service';
import { FormChienComponent } from '../../../components/admin/form/form-chien/form-chien.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { AsyncPipe } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { FilterArrayPipe } from 'src/app/shared/filter-array.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';


const NONE_SELECTED = 0;
@Component({
  selector: 'app-dashboard-chien-page',
  standalone: true,
  imports: [MenuComponent,
      DashboardMenuComponent,
      FormChienComponent,
      ToastModule,
      TableModule,
      AsyncPipe,
      ButtonModule,
      ConfirmDialogModule,
      MessageModule,
      DialogModule,
      FormsModule,
      FilterArrayPipe,
      InputTextModule,
      InputGroupModule,
      InputGroupAddonModule,],
  templateUrl: './dashboard-chien-page.component.html',
  styleUrl: './dashboard-chien-page.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class DashboardChienPageComponent {

  #chienService = inject(ChienService);
  #toastService = inject(ToastService);
  #confirmationService = inject(ConfirmationService);

  chiens$: Observable<Chien[]> = this.#chienService.getAllChiens();
  chiens: WritableSignal<Chien[]> = signal([]);

  searchTerm = signal('');
  chienForm: Chien | undefined;
  formVisible: boolean = false;
  
  getCaractereList(chien: Chien): string{
    return chien.caractere.map(c => c.name).join(', ');
  }

  openUpdateForm(chien: Chien): void {
    this.chienForm = chien;
    this.formVisible = true;
  }

  openForm(chien?: Chien): void {
    this.chienForm = chien;
    this.formVisible = true;
  }

  closeForm(): void {
    this.formVisible = false;
  }

  addOrUpdateChien(chienForm: Chien | ChienCreate): void {
    if ('id' in chienForm) {
      this._apiUpdate(chienForm);
      this.formVisible = false;
    } else {
      this._apiCreate(chienForm);
      this.formVisible = false;
    }
  }

  delete(chien: Chien): void {
    this.#confirmationService.confirm({
      message: 'Es tu sûr de vouloir supprimer cette chien ?',
      header: 'Confirmation',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this._apiDelete(chien);
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      },
    });
  }

  private _apiCreate(chien: ChienCreate): void {
    this.#chienService
      .add(chien)
      .pipe(
        tap(() => {
          this.#toastService.success('Bien joué !', 'Nouveau chien ajoutée');
        }),
        switchMap(() => this.#chienService.getAllChiens()),
        tap(chiens => {
          this.chiens$ = of(chiens);
        }),
        catchError(() => {
          this.#toastService.error('Problème detecté !', 'Une erreur est survenue');
          return of(void NONE_SELECTED);
        })
      )
      .subscribe(() => {
        this.chiens$ = this.#chienService.getAllChiens();
      });
  }

  private _apiUpdate(chien: Chien): void {
    this.#chienService
      .update(chien.id, chien)
      .pipe(
        switchMap(() => this.#chienService.getAllChiens()),
        tap(chiens => {
          this.chiens$ = of(chiens);
          this.#toastService.success('Bien joué !', 'Vos modifications ont été enregistrées');
        }),
        catchError(() => {
          this.#toastService.error('Problème detecté !', 'Une erreur est survenue');
          return of(void NONE_SELECTED);
        })
      )
      .subscribe();
  }

  private _apiDelete(chien: Chien): void {
    if (!chien.id) {
      return;
    }
    this.#chienService
      .delete(chien.id!)
      .pipe(
        tap(() => {
          this.#toastService.success('Succès', 'La question a bien été supprimé.');
        }),
        switchMap(() => this.#chienService.getAllChiens()),
        catchError(() => {
          this.#toastService.error('Failed to delete chien', 'Error');
          return of(null);
        })
      )
      .subscribe(() => {
        this.chiens$ = this.#chienService.getAllChiens();
      });
  }
}
