export type Caractere = {
  id: number;
  name: string;
};

export type CaractereCreate = Omit<Caractere, 'id'>;
