export type Caractere = {
  id: number;
  nom: string;
};

export type CaractereCreate = Omit<Caractere, 'id'>;
