import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterArray',
  standalone: true,
})
export class FilterArrayPipe implements PipeTransform {
  transform<T>(items: T[] | null, searchText: string, objectKey: keyof T | null = null): T[] {
    if (!items || !searchText) {
      return items || [];
    }

    if (objectKey) {
      return items.filter(item => {
        const value = item[objectKey];
        return typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase());
      });
    }

    return items.filter(item => {
      return typeof item === 'string' && item.toLowerCase().includes(searchText.toLowerCase());
    });
  }
}
