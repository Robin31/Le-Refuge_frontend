import { FaqPageComponent } from './faq-page.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment.development';
import { FaqService } from '../../services/faq.service';
import { MenuComponent } from '../../components/menu/menu.component';
import { FaqCardComponent } from '../../components/faq-card/faq-card.component';
import { ActivatedRoute } from '@angular/router';

describe('FaqPageComponent', () => {
  let component: FaqPageComponent;
  let fixture: ComponentFixture<FaqPageComponent>;
  let httpMock: HttpTestingController;

  const API_URL = `${environment.apiUrl}/faqs`;

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MenuComponent, FaqCardComponent, FaqPageComponent],
      providers: [FaqService,
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            params: {},
            queryParams: {},
            data: {},
            url: [],
          },
        },
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(FaqPageComponent);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
  });

  it('should fetch FAQs on init', () => {
    const mockFaqs = [
      { question: 'What is Angular?', answer: 'A front-end framework.' },
      { question: 'What is TypeScript?', answer: 'A superset of JavaScript.' }
    ];

    fixture.detectChanges();

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockFaqs);

    fixture.detectChanges();
    const faqCards = fixture.nativeElement.querySelectorAll('app-faq-card');
    expect(faqCards.length).toBe(2);
    expect(faqCards[0].textContent).toContain('What is Angular?');
    expect(faqCards[1].textContent).toContain('What is TypeScript?');
  });
});