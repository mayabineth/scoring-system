import { Pipe, PipeTransform } from '@angular/core';
import { Test } from './models/Test';

@Pipe({
  name: 'filterTests',
})
export class FilterTestsPipe implements PipeTransform {
  transform(tests: Test[], filterValue: string): Test[] {
    if (filterValue.length == 0) return tests;
    else {
      return tests.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
  }
}
