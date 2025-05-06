import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Faq, FaqCreate } from '../../../../models/faq-model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-form-faq',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './form-faq.component.html',
  styleUrl: './form-faq.component.scss',
})
export class FormFaqComponent {
  #faq?: Faq | undefined;

  @Input() set faq(value: Faq | undefined) {
    this.#faq = value;

    this.faqForm.setValue({
      question: this.#faq?.question ?? '',
      answer: this.#faq?.answer ?? '',
    });
  }

  get faq(): Faq | undefined {
    return this.#faq;
  }

  @Output()
  validate: EventEmitter<FaqCreate | Faq> = new EventEmitter<FaqCreate | Faq>();

  faqForm: FormGroup = new FormGroup({
    question: new FormControl<string>(this.faq ? this.faq.question : '', Validators.required),
    answer: new FormControl<string>(this.faq ? this.faq.answer : '', Validators.required),
  });

  submit(): void {
    const question: string | undefined = this.faqForm.get('question')?.value;
    const answer: string | undefined = this.faqForm.get('answer')?.value;

    if (!question || !answer) {
      return;
    }

    this.validate.emit({
      ...(this.faq ?? {}),
      question,
      answer,
    });

    this.faqForm.reset();
  }
}
