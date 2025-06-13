import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { Chien } from '../../models/chien-model';
import { ChienService } from '../../services/chien.service';
import { ChienCardComponent } from '../../components/chien-card/chien-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chien-page',
  standalone: true,
  imports: [MenuComponent, ChienCardComponent, CommonModule],
  templateUrl: './chien-page.component.html',
  styleUrl: './chien-page.component.scss'
})
export class ChienPageComponent implements OnInit {

  _chienService = inject(ChienService);

  chiens =  signal<Chien[]>([]);
  chien = signal<Chien | null>(null);

  ngOnInit(): void {
    this._chienService.getAllChiens().subscribe((chiens: Chien[]) => {
      this.chiens.set(chiens);
    })
  }
}
