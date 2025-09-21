import { Component, Input } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { Caractere, CaractereCreate } from '../../../../models/caractere-model';

@Component({
  selector: 'app-form-caractere',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './form-caractere.component.html',
  styleUrl: './form-caractere.component.scss',
})
export class FormCaractereComponent {
  #caractere?: Caractere | undefined;

  @Input() set caractere(value: Caractere | undefined) {
    this.#caractere = value;

    this.caractereForm.setValue({
      name: this.#caractere?.name ?? '',
    });
  }

  get caractere(): Caractere | undefined {
    return this.#caractere;
  }

  @Output()
  validate: EventEmitter<CaractereCreate | Caractere> = new EventEmitter<CaractereCreate | Caractere>();

  caractereForm: FormGroup = new FormGroup({
    name: new FormControl<string>(this.caractere ? this.caractere.name : '', Validators.required),
  });

  submit(): void {
    const name: string | undefined = this.caractereForm.get('name')?.value;

    if (!name) {
      return;
    }

    this.validate.emit({
      ...(this.caractere ?? {}),
      name,
    });

    this.caractereForm.reset();
  }
}
