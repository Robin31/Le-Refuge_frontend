export type Faq = {
  id: number;
  question: string;
  answer: string;
};

export type FaqCreate = Omit<Faq, 'id'>;
