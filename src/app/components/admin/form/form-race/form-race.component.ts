import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { Race, RaceCreate } from '../../../../models/race-model';

@Component({
  selector: 'app-form-race',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './form-race.component.html',
  styleUrl: './form-race.component.scss',
})
export class FormRaceComponent {
  #race?: Race | undefined;

  @Input() set race(value: Race | undefined) {
    this.#race = value;

    this.raceForm.setValue({
      name: this.#race?.name ?? '',
    });
  }

  get race(): Race | undefined {
    return this.#race;
  }

  @Output()
  validate: EventEmitter<RaceCreate | Race> = new EventEmitter<RaceCreate | Race>();

  raceForm: FormGroup = new FormGroup({
    name: new FormControl<string>(this.race ? this.race.name : '', Validators.required),
  });

  submit(): void {
    const name: string | undefined = this.raceForm.get('name')?.value;

    if (!name) {
      return;
    }

    this.validate.emit({
      ...(this.race ?? {}),
      name,
    });

    this.raceForm.reset();
  }
}
