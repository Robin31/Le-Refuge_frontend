import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { AuthService } from 'src/app/services/auth.service';

type SafeMenuItem = {
  label: string | null;
  icon: string | null;
  command: () => void;
};

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [Menubar, CommonModule, ImageModule, RouterModule, ButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  endItems: SafeMenuItem[] | undefined;

  _authService = inject(AuthService);
  _router = inject(Router);

  userRole: string | null = null;

  ngOnInit(): void {
    this._authService.loggedIn$.subscribe(() => {
      this.startItemsUpdate();
    });
    this.startItemsUpdate();
    this.endItemsUpdate();
  }

  startItemsUpdate(): void {
    this.userRole = this._authService.getUserRole();
    this.items = [
      ...(this.userRole === 'ROLE_ADMIN'
        ? [
            {
              label: 'Dashboard',
              command: (): void => {
                this._router.navigate(['/admin/dashboard']);
              },
            },
          ]
        : []),
      {
        label: 'Nos chiens',
        command: (): void => {
          this._router.navigate(['/chiens']);
        },
      },
      {
        label: 'Nos bénévoles',
        command: (): void => {
          this._router.navigate(['/bénévoles']);
        },
      },
    ];
  }

  endItemsUpdate(): void {
    const isLoggedIn = this._authService.isLoggedIn();

    this.endItems = [
      ...(!isLoggedIn
        ? [
            {
              label: 'Créer un compte',
              icon: null,
              command: (): void => {
                this._router.navigate(['/signup']);
              },
            },
          ]
        : []),
      {
        label: isLoggedIn ? 'Déconnexion' : 'Connexion',
        icon: null,
        command: (): void => {
          if (isLoggedIn) {
            this._authService.clearToken();
            this._router.navigate(['/']);
            this.endItemsUpdate();
          } else {
            this._router.navigate(['/login']);
          }
        },
      },
      ...(isLoggedIn
        ? [
            {
              label: null,
              icon: 'pi pi-user',
              command: (): void => {
                this._router.navigate(['/moncompte']);
              },
            },
          ]
        : []),
      {
        label: null,
        icon: 'pi pi-globe',
        command: (): void => {
          this._router.navigate(['/localisation']);
        },
      },
      {
        label: null,
        icon: 'pi pi-question',
        command: (): void => {
          this._router.navigate(['/faq']);
        },
      },
    ];
  }

  get isAuthenticated(): boolean {
    return this._authService.isLoggedIn();
  }

  logout(): void {
    this._authService.clearToken();
    this._router.navigate(['/']);
  }
}
