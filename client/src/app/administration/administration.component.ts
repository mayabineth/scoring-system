import { ElementRef, ViewChild, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Test } from '../models/Test';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
})
export class AdministrationComponent {
  tests: Test[]=[];
  @ViewChild('filterValue') filterValue: ElementRef;

  constructor(
    private store: Store<{ tests: any }>,
  ) {}
  ngOnInit() {
    this.getTests();
  }
  getTests() {
    this.store.select('tests').subscribe((data) => {
      this.tests = data.tests;
    });
  }
  filterTest(event: any) {}
}
