import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtersubchild'
})
export class FiltersubchildPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    
    return items.filter(it => {
      
      return it.SName.toLocaleLowerCase().includes(searchText);
        //it.SName.toLocaleLowerCase().includes(searchText);        
    });

  }
}
