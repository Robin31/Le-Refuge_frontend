import { Component, inject } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';

const ONE_RESPONSE = 1;
const MIN_PASSWORD_LENGTH = 6;
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule, InputTextModule, ButtonModule, FloatLabelModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  loginForm!: FormGroup;
  _formBuilder = inject(FormBuilder);
  minLength = MIN_PASSWORD_LENGTH;
  submitted = false;

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minLength)]],
    });
  }

  onSubmit(): void {
    this._authService
      .login$(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(take(ONE_RESPONSE))
      .subscribe(() => this._router.navigate(['/']));
    this.submitted = true;
  }
}
