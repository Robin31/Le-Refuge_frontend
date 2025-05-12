import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DashboardMenuComponent } from 'src/app/components/admin/dashboard-menu/dashboard-menu.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { TableModule } from 'primeng/table';
import { FaqService } from 'src/app/services/faq.service';
import { Faq, FaqCreate } from 'src/app/models/faq-model';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { FormFaqComponent } from '../../../components/admin/form/form-faq/form-faq.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { FilterArrayPipe } from 'src/app/shared/filter-array.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

const NONE_SELECTED = 0;
@Component({
  selector: 'app-dashboard-faq-page',
  standalone: true,
  imports: [
    MenuComponent,
    DashboardMenuComponent,
    FormFaqComponent,
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
  templateUrl: './dashboard-faq-page.component.html',
  styleUrl: './dashboard-faq-page.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class DashboardFaqPageComponent {
  #faqService = inject(FaqService);
  #toastService = inject(ToastService);
  #confirmationService = inject(ConfirmationService);

  faqs$: Observable<Faq[]> = this.#faqService.getAllFaqs();
  faqs: WritableSignal<Faq[]> = signal([]);
  searchFaqs = toSignal(this.faqs$, { initialValue: [] });

  searchTerm = signal('');
  filteredFaqs: WritableSignal<Faq[]> = signal(this.faqs());
  formVisible = false;
  faqForm: Faq | undefined;
  faq = signal<Faq | null>(null);
  id!: number;

  openForm(faq?: Faq): void {
    this.faqForm = faq;
    this.formVisible = true;
  }

  addOrUpdateFaq(faqForm: Faq | FaqCreate): void {
    if ('id' in faqForm) {
      this._apiUpdate(faqForm);
      this.formVisible = false;
    } else {
      this._apiCreate(faqForm);
      this.formVisible = false;
    }
  }

  delete(faq: Faq): void {
    this.#confirmationService.confirm({
      message: 'Es tu sûr de vouloir supprimer cette question ?',
      header: 'Confirmation',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this._apiDelete(faq);
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

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  private _apiCreate(faq: FaqCreate): void {
    this.#faqService
      .add(faq)
      .pipe(
        tap(() => {
          this.#toastService.success('Bien joué !', 'Nouvelle Question ajoutée');
        }),
        switchMap(() => this.#faqService.getAllFaqs()),
        tap(faqs => {
          this.faqs.set(faqs);
        }),
        catchError(() => {
          this.#toastService.error('Problème detecté !', 'Une erreur est survenue');
          return of(void NONE_SELECTED);
        })
      )
      .subscribe(() => {
        this.faqs$ = this.#faqService.getAllFaqs();
      });
  }

  private _apiUpdate(faq: Faq): void {
    this.#faqService
      .update(faq.id, faq)
      .pipe(
        switchMap(() => this.#faqService.getAllFaqs()),
        tap(faqs => {
          this.faqs.set(faqs);
          this.#toastService.success('Bien joué !', 'Vos modifications ont été enregistrées');
        }),
        catchError(() => {
          this.#toastService.error('Problème detecté !', 'Une erreur est survenue');
          return of(void NONE_SELECTED);
        })
      )
      .subscribe();
  }

  private _apiDelete(faq: Faq): void {
    if (!faq.id) {
      return;
    }
    this.#faqService
      .delete(faq.id!)
      .pipe(
        tap(() => {
          this.#toastService.success('FAQ deleted successfully', 'Success');
        }),
        switchMap(() => this.#faqService.getAllFaqs()),
        catchError(() => {
          this.#toastService.error('Failed to delete FAQ', 'Error');
          return of(null);
        })
      )
      .subscribe(() => {
        this.faqs$ = this.#faqService.getAllFaqs();
      });
  }
}
