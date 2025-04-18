import { Component, inject } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

const MIN_PASSWORD_LENGTH = 6;
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  _formBuilder = inject(FormBuilder);
  minLength = MIN_PASSWORD_LENGTH;

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minLength)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      // Here you can add your login logic, like calling an API
    } else {
      console.log('Form is invalid');
    }
  }
}
