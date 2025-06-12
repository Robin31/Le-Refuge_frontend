export type Sexe = {
  id: number;
  name: string;
};

export type SexeCreate = Omit<Sexe, 'id'>;
