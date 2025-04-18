import { Component, inject, OnInit } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RouterLink } from '@angular/router';

const MIN_PASSWORD_LENGTH = 6;

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule, InputTextModule, ButtonModule, FloatLabelModule, RouterLink],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent implements OnInit {
  loginForm!: FormGroup;
  _formBuilder = inject(FormBuilder);
  minLength = MIN_PASSWORD_LENGTH;
  submitted = false;

  passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  };

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(this.minLength)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(this.minLength)]],
      },
      { validators: this.passwordValidator }
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
