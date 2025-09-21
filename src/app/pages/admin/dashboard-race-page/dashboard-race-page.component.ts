import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { DashboardMenuComponent } from 'src/app/components/admin/dashboard-menu/dashboard-menu.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { ToastService } from 'src/app/services/toast.service';
import { Race, RaceCreate } from 'src/app/models/race-model';
import { RaceService } from 'src/app/services/race.service';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { FormRaceComponent } from '../../../components/admin/form/form-race/form-race.component';
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
  selector: 'app-dashboard-race-page',
  standalone: true,
  imports: [
    MenuComponent,
    DashboardMenuComponent,
    FormRaceComponent,
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
  templateUrl: './dashboard-race-page.component.html',
  styleUrl: './dashboard-race-page.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class DashboardRacePageComponent {
  #raceService = inject(RaceService);
  #toastService = inject(ToastService);
  #confirmationService = inject(ConfirmationService);

  races$: Observable<Race[]> = this.#raceService.getAllRaces();
  races: WritableSignal<Race[]> = signal([]);

  searchTerm = signal('');
  raceForm: Race | undefined;
  formVisible = false;

  openForm(race?: Race): void {
    this.raceForm = race;
    this.formVisible = true;
  }

  addOrUpdateRace(raceForm: Race | RaceCreate): void {
    if ('id' in raceForm) {
      this._apiUpdate(raceForm);
      this.formVisible = false;
    } else {
      this._apiCreate(raceForm);
      this.formVisible = false;
    }
  }

  delete(race: Race): void {
    this.#confirmationService.confirm({
      message: 'Es tu sûr de vouloir supprimer cette race ?',
      header: 'Confirmation',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this._apiDelete(race);
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

  private _apiCreate(race: RaceCreate): void {
    this.#raceService
      .add(race)
      .pipe(
        tap(() => {
          this.#toastService.success('Bien joué !', 'Nouvelle race ajoutée');
        }),
        switchMap(() => this.#raceService.getAllRaces()),
        tap(races => {
          this.races$ = of(races);
        }),
        catchError(() => {
          this.#toastService.error('Problème detecté !', 'Une erreur est survenue');
          return of(void NONE_SELECTED);
        })
      )
      .subscribe(() => {
        this.races$ = this.#raceService.getAllRaces();
      });
  }

  private _apiUpdate(race: Race): void {
    this.#raceService
      .update(race.id, race)
      .pipe(
        switchMap(() => this.#raceService.getAllRaces()),
        tap(races => {
          this.races$ = of(races);
          this.#toastService.success('Bien joué !', 'Vos modifications ont été enregistrées');
        }),
        catchError(() => {
          this.#toastService.error('Problème detecté !', 'Une erreur est survenue');
          return of(void NONE_SELECTED);
        })
      )
      .subscribe();
  }

  private _apiDelete(race: Race): void {
    if (!race.id) {
      return;
    }
    this.#raceService
      .delete(race.id!)
      .pipe(
        tap(() => {
          this.#toastService.success('Succès', 'La question a bien été supprimé.');
        }),
        switchMap(() => this.#raceService.getAllRaces()),
        catchError(() => {
          this.#toastService.error('Failed to delete race', 'Error');
          return of(null);
        })
      )
      .subscribe(() => {
        this.races$ = this.#raceService.getAllRaces();
      });
  }
}
