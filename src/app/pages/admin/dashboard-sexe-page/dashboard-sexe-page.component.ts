import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DashboardMenuComponent } from 'src/app/components/admin/dashboard-menu/dashboard-menu.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { ToastService } from 'src/app/services/toast.service';
import { SexeService } from 'src/app/services/sexe.service';
import { Sexe, SexeCreate } from 'src/app/models/sexe-model';
import { catchError, of, switchMap, tap } from 'rxjs';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { AsyncPipe } from '@angular/common';
import { FilterArrayPipe } from 'src/app/shared/filter-array.pipe';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FormSexeComponent } from '../../../components/admin/form/form-sexe/form-sexe.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

const NONE_SELECTED = 0;

@Component({
  selector: 'app-dashboard-sexe-page',
  standalone: true,
  imports: [
    MenuComponent,
    DashboardMenuComponent,
    FormsModule,
    InputTextModule,
    FormSexeComponent,
    InputGroupAddonModule,
    InputGroupModule,
    ButtonModule,
    ConfirmDialogModule,
    TableModule,
    AsyncPipe,
    FilterArrayPipe,
    ToastModule,
    DialogModule,
  ],
  templateUrl: './dashboard-sexe-page.component.html',
  styleUrl: './dashboard-sexe-page.component.scss',
  providers: [ConfirmationService],
})
export class DashboardSexePageComponent {
  #sexeService = inject(SexeService);
  #toastService = inject(ToastService);
  #confirmationService = inject(ConfirmationService);

  sexes$ = this.#sexeService.getAllSexes();
  sexes: WritableSignal<Sexe[]> = signal([]);

  formVisible = false;
  sexeForm: Sexe | undefined;
  sexe = signal<Sexe | null>(null);
  searchTerm = signal('');
  id!: number;

  openForm(sexe?: Sexe): void {
    this.formVisible = true;
    this.sexeForm = sexe;
  }

  addOrUpdateSexe(sexeForm: Sexe | SexeCreate): void {
    if ('id' in sexeForm) {
      this._apiUpdate(sexeForm);
      this.formVisible = false;
    } else {
      this._apiCreate(sexeForm);
      this.formVisible = false;
    }
  }

  delete(sexe: Sexe): void {
    this.#confirmationService.confirm({
      message: 'Es tu sûr de vouloir supprimer ce sexe ?',
      header: 'Confirmation',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this._apiDelete(sexe);
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

  private _apiCreate(sexe: SexeCreate): void {
    this.#sexeService
      .add(sexe)
      .pipe(
        tap(() => {
          this.#toastService.success('Bien joué !', 'Nouveau sexe ajoutée');
        }),
        switchMap(() => this.#sexeService.getAllSexes()),
        tap(sexes => {
          this.sexes$ = of(sexes);
        }),
        catchError(() => {
          this.#toastService.error('Problème detecté !', 'Une erreur est survenue');
          return of(void NONE_SELECTED);
        })
      )
      .subscribe();
  }

  private _apiUpdate(sexe: Sexe): void {
    this.#sexeService
      .update(sexe.id, sexe)
      .pipe(
        switchMap(() => this.#sexeService.getAllSexes()),
        tap(sexes => {
          this.sexes$ = of(sexes);
          this.#toastService.success('Succès', 'Le sexe a bien été mis à jour.');
        }),
        catchError(() => {
          this.#toastService.error('Erreur', 'Une erreur est survenue lors de la récupération des');
          return of(void NONE_SELECTED);
        })
      )
      .subscribe();
  }

  private _apiDelete(sexe: Sexe): void {
    if (!sexe.id) {
      return;
    }
    this.#sexeService
      .delete(sexe.id)
      .pipe(
        tap(() => {
          this.#toastService.success('Succès', 'Le sexe a bien été supprimé.');
        }),
        switchMap(() => this.#sexeService.getAllSexes()),
        catchError(() => {
          this.#toastService.error('Erreur', 'Une erreur est survenue lors de la récupération des');
          return of(null);
        })
      )
      .subscribe(() => {
        this.sexes$ = this.#sexeService.getAllSexes();
      });
  }
}
