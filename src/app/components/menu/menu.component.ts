import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';

type SafeMenuItem = {
  icon: string;
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

  _router = inject(Router);

  ngOnInit(): void {
    this.items = [
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

    this.endItems = [
      {
        icon: 'pi pi-user',
        command: (): void => {
          this._router.navigate(['/moncompte']);
        },
      },
      {
        icon: 'pi pi-globe',
        command: (): void => {
          this._router.navigate(['/localisation']);
        },
      },
      {
        icon: 'pi pi-question',
        command: (): void => {
          this._router.navigate(['/faq']);
        },
      },
    ];
  }
}
