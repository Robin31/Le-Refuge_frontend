export type Chien = {
  id: number;
  nom: string;
  age: number;
  description: string;
  image: string;
  raceId: number;
  sexeId: number;
  caractereId: number;
  castration: boolean;
};

export type ChienCreate = Omit<Chien, 'id'>;
