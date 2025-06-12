export type Race = {
  id: number;
  name: string;
};

export type RaceCreate = Omit<Race, 'id'>;
