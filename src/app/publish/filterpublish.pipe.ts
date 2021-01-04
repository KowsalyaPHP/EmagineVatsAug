import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpublish'
})
export class FilterpublishPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
  
    return items.filter(it => {
      return it.VendorName.toLocaleLowerCase().includes(searchText);
    });
  }
}
