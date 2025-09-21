import { FaqService } from './faq.service';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment.development';
import { Faq, FaqCreate } from '../models/faq-model';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('FaqService', () => {
  let service: FaqService;
  let httpTestingController: HttpTestingController;

  const API_URL = `${environment.apiUrl}/faqs`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FaqService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(FaqService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all FAQs', () => {
    const mockFaqs: Faq[] = [
      { id: 1, question: 'Q1', answer: 'A1' },
      { id: 2, question: 'Q2', answer: 'A2' },
    ];

    service.getAllFaqs().subscribe((faqs) => {
      expect(faqs).toEqual(mockFaqs);
    });

    const req = httpTestingController.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockFaqs);
  });

  it('should add a new FAQ', () => {
    const faqToAdd: FaqCreate = { question: 'New Q', answer: 'New A' };
    const mockResponse: Faq = { id: 123, ...faqToAdd };

    service.add(faqToAdd).subscribe((faq) => {
      expect(faq).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(API_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(faqToAdd);
    req.flush(mockResponse);
  });

  it('should update a FAQ', () => {
    const faq: Faq = { id: 1, question: 'Updated Q', answer: 'Updated A' };

    service.update(faq.id, faq).subscribe((result) => {
      expect(result).toEqual(faq);
    });

    const req = httpTestingController.expectOne(`${API_URL}/${faq.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(faq);
    req.flush(faq);
  });

  it('should delete a FAQ', () => {
    service.delete(1).subscribe((res) => {
      expect(res).toBeUndefined();
    });

    const req = httpTestingController.expectOne(`${API_URL}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get a FAQ by ID', () => {
    const faq: Faq = { id: 2, question: 'Q2', answer: 'A2' };

    service.getFaqById(faq).subscribe((result) => {
      expect(result).toEqual(faq);
    });

    const req = httpTestingController.expectOne(`${API_URL}/2`);
    expect(req.request.method).toBe('GET');
    req.flush(faq);
  });
});
