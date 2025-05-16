export type Race = {
  id: number;
  nom: string;
};

export type RaceCreate = Omit<Race, 'id'>;
