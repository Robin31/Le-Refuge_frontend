import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Chien, ChienCreate } from '../../../../models/chien-model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RaceService } from 'src/app/services/race.service';
import { SexeService } from 'src/app/services/sexe.service';
import { CaractereService } from 'src/app/services/caractere.service';
import { Race } from 'src/app/models/race-model';
import { Caractere } from 'src/app/models/caractere-model';
import { Sexe } from 'src/app/models/sexe-model';
import { toSignal } from '@angular/core/rxjs-interop';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-form-chien',
  standalone: true,
  imports: [ReactiveFormsModule, MultiSelectModule, FloatLabelModule, SelectModule, ButtonModule, InputTextModule],
  templateUrl: './form-chien.component.html',
  styleUrl: './form-chien.component.scss',
})
export class FormChienComponent {
  #chien?: Chien | undefined;
  #raceService = inject(RaceService);
  #sexeService = inject(SexeService);
  #caractereService = inject(CaractereService);

  formVisible = false;

  @Input() set chien(value: Chien | undefined) {
    this.#chien = value;

    this.chienForm.patchValue({
      name: this.chien?.name ?? '',
      age: this.chien?.age ?? null,
      description: this.chien?.description ?? '',
      image: this.chien?.image ?? '',
      races: this.getRaceById(this.chien?.race.id),
      sexes: this.getSexeById(this.chien?.sexe.id),
      caracteres: this.getCaracteresByIds(this.chien?.caractere?.map(c => c.id) ?? []),
      castration: this.chien?.castration ?? null,
    });
  }

  get chien(): Chien | undefined {
    return this.#chien;
  }

  @Output()
  closeForm = new EventEmitter<void>();

  @Output()
  validate: EventEmitter<ChienCreate | Chien> = new EventEmitter<ChienCreate | Chien>();

  chienForm: FormGroup = new FormGroup({
    name: new FormControl<string>(this.chien ? this.chien.name : '', Validators.required),
    age: new FormControl<number | null>(this.chien ? this.chien.age : null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    description: new FormControl<string>(this.chien ? this.chien.description : '', Validators.required),
    image: new FormControl<string>(this.chien ? this.chien.image : '', Validators.required),
    races: new FormControl<Race | null>(this.chien ? this.getRaceById(this.chien?.race.id) : null, Validators.required),
    sexes: new FormControl<Sexe | null>(this.chien ? this.getSexeById(this.chien?.sexe.id) : null, Validators.required),
    caracteres: new FormControl<Caractere[]>(this.chien ? this.getCaracteresByIds(this.chien?.caractere.map(c => c.id)) : [], Validators.required),
    castration: new FormControl<boolean | null>(this.chien?.castration ?? null, Validators.required),
  });

  raceListSignal = toSignal(this.#raceService.getAllRaces());
  get raceList(): Race[] {
    return this.raceListSignal() ?? [];
  }

  sexeListSignal = toSignal(this.#sexeService.getAllSexes());
  get sexeList(): Sexe[] {
    return this.sexeListSignal() ?? [];
  }

  caractereListSignal = toSignal(this.#caractereService.getAllCaracteres());
  get caractereList(): Caractere[] {
    return this.caractereListSignal() ?? [];
  }

  castrationOptions = [
    { label: 'Oui', value: true },
    { label: 'Non', value: false },
  ];

  getRaceById(id: number | undefined): Race | null {
    return this.raceListSignal()?.find(r => r.id === id) ?? null;
  }

  getSexeById(id: number | undefined): Sexe | null {
    return this.sexeListSignal()?.find(s => s.id === id) ?? null;
  }

  getCaracteresByIds(ids: number[] = []): Caractere[] {
    const list = this.caractereListSignal() ?? [];
    return list?.filter(c => ids.includes(c.id));
  }

  cancelForm(): void {
    this.closeForm.emit();
  }

  submit(): void {
    const name: string | undefined = this.chienForm.get('name')?.value;
    const age: number = this.chienForm.get('age')?.value;
    const description: string | undefined = this.chienForm.get('description')?.value;
    const image: string | undefined = this.chienForm.get('image')?.value;
    const race: Race = this.chienForm.get('races')?.value;
    const sexe: Sexe = this.chienForm.get('sexes')?.value;
    const caractere: Caractere[] = this.chienForm.get('caracteres')?.value;
    const castration: boolean = this.chienForm.get('castration')?.value;

    if (!name || age === null || !description || !image || !race || !sexe || !caractere) {
      return;
    }

    const caractereIds = caractere.map(c => c.id);

    const isUpdate = !!this.#chien;

    const payload = {
      name,
      age,
      description,
      image,
      castration,
      raceId: race.id,
      sexeId: sexe.id,
      caractereIds,
      ...(isUpdate ?  { id: this.#chien!.id } : {}),
    };

    this.validate.emit(payload);
    this.chienForm.reset();
  }
}
