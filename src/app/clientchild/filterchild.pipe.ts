import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterchild'
})
export class FilterchildPipe implements PipeTransform {

  transform(items: any[], searchText: string, fieldName: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    
    return items.filter(item => {
      if (item && item[fieldName]) {
        return item[fieldName].toLowerCase().includes(searchText);
      }
      return false;
    });

   /* return items.filter(it => {
      
      return it.MName.toLocaleLowerCase().includes(searchText);
        //it.SName.toLocaleLowerCase().includes(searchText);        
    });*/
  }

  
}
