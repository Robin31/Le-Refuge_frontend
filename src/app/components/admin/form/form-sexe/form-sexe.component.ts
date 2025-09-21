import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Sexe, SexeCreate } from '../../../../models/sexe-model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-form-sexe',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './form-sexe.component.html',
  styleUrl: './form-sexe.component.scss',
})
export class FormSexeComponent {
  #sexe?: Sexe | undefined;

  @Input() set sexe(value: Sexe | undefined) {
    this.#sexe = value;

    this.sexeForm.setValue({
      name: this.#sexe?.name ?? '',
    });
  }

  get sexe(): Sexe | undefined {
    return this.#sexe;
  }

  @Output()
  validate: EventEmitter<SexeCreate | Sexe> = new EventEmitter<SexeCreate | Sexe>();

  sexeForm: FormGroup = new FormGroup({
    name: new FormControl<string>(this.sexe ? this.sexe.name : '', Validators.required),
  });

  submit(): void {
    const name: string | undefined = this.sexeForm.get('name')?.value;

    if (!name) {
      return;
    }

    this.validate.emit({
      ...(this.sexe ?? {}),
      name,
    });

    this.sexeForm.reset();
  }
}
