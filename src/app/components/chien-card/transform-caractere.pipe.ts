import { Pipe, PipeTransform } from '@angular/core';
import { Caractere } from '../../models/caractere-model';

const NO_SIZE = 0;
@Pipe({
  name: 'transformCaractere',
  standalone: true,
})
export class TransformCaracterePipe implements PipeTransform {
  transform(caracteres: Caractere[]): string {
    if (!caracteres || caracteres.length === NO_SIZE) {
      return 'Aucun caractère';
    }
    return caracteres.map(c => c.name).join(', ');
  }
}
