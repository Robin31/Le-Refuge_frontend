import { AsyncPipe } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { FormCaractereComponent } from '../../../components/admin/form/form-caractere/form-caractere.component';
import { DashboardMenuComponent } from 'src/app/components/admin/dashboard-menu/dashboard-menu.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { ToastService } from 'src/app/services/toast.service';
import { FilterArrayPipe } from 'src/app/shared/filter-array.pipe';
import { Caractere, CaractereCreate } from 'src/app/models/caractere-model';
import { CaractereService } from 'src/app/services/caractere.service';

const NONE_SELECTED = 0;
@Component({
  selector: 'app-dashboard-caractere-page',
  standalone: true,
  imports: [
    MenuComponent,
    DashboardMenuComponent,
    FormCaractereComponent,
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
    InputGroupAddonModule,
  ],
  templateUrl: './dashboard-caractere-page.component.html',
  styleUrl: './dashboard-caractere-page.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class DashboardCaracterePageComponent {
  #caractereService = inject(CaractereService);
  #toastService = inject(ToastService);
  #confirmationService = inject(ConfirmationService);

  caracteres$: Observable<Caractere[]> = this.#caractereService.getAllCaracteres();
  caracteres: WritableSignal<Caractere[]> = signal([]);

  searchTermSignal = signal('');
  formVisible = false;
  caractereForm: Caractere | undefined;

  get searchTerm(): string {
    return this.searchTermSignal();
  }

  openForm(caractere?: Caractere): void {
    this.caractereForm = caractere;
    this.formVisible = true;
  }

  addOrUpdatecaractere(caractereForm: Caractere | CaractereCreate): void {
    if ('id' in caractereForm) {
      this._apiUpdate(caractereForm);
      this.formVisible = false;
    } else {
      this._apiCreate(caractereForm);
      this.formVisible = false;
    }
  }

  delete(caractere: Caractere): void {
    this.#confirmationService.confirm({
      message: 'Es tu sûr de vouloir supprimer ce caractere ?',
      header: 'Confirmation',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this._apiDelete(caractere);
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

  private _apiCreate(caractere: CaractereCreate): void {
    this.#caractereService
      .add(caractere)
      .pipe(
        tap(() => {
          this.#toastService.success('Bien joué !', 'Nouvelle Question ajoutée');
        }),
        switchMap(() => this.#caractereService.getAllCaracteres()),
        tap(caracteres => {
          this.caracteres$ = of(caracteres);
        }),
        catchError(() => {
          this.#toastService.error('Problème detecté !', 'Une erreur est survenue');
          return of(void NONE_SELECTED);
        })
      )
      .subscribe(() => {
        this.caracteres$ = this.#caractereService.getAllCaracteres();
      });
  }

  private _apiUpdate(caractere: Caractere): void {
    this.#caractereService
      .update(caractere.id, caractere)
      .pipe(
        switchMap(() => this.#caractereService.getAllCaracteres()),
        tap(caracteres => {
          this.caracteres$ = of(caracteres);
          this.#toastService.success('Bien joué !', 'Vos modifications ont été enregistrées');
        }),
        catchError(() => {
          this.#toastService.error('Problème detecté !', 'Une erreur est survenue');
          return of(void NONE_SELECTED);
        })
      )
      .subscribe();
  }

  private _apiDelete(caractere: Caractere): void {
    if (!caractere.id) {
      return;
    }
    this.#caractereService
      .delete(caractere.id!)
      .pipe(
        tap(() => {
          this.#toastService.success('Succès', 'Le caractère a bien été supprimé.');
        }),
        switchMap(() => this.#caractereService.getAllCaracteres()),
        catchError(() => {
          this.#toastService.error('Failed to delete caractere', 'Error');
          return of(null);
        })
      )
      .subscribe(() => {
        this.caracteres$ = this.#caractereService.getAllCaracteres();
      });
  }
}
