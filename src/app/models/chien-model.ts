import { Caractere } from "./caractere-model";
import { Race } from "./race-model";
import { Sexe } from "./sexe-model";

export type Chien = {
  id: number;
  name: string;
  age: number;
  description: string;
  image: string;
  race: Race;
  sexe: Sexe;
  caractere: Caractere[];
  castration: boolean;
};

export type ChienCreate = {
  name: string;
  age: number;
  description: string;
  image: string;
  castration: boolean;
  raceId: number;
  sexeId: number;
  caractereIds: number[];
}

export type ChienUpdate = ChienCreate & {
  id: number;
};
