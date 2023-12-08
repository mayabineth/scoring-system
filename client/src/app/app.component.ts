import { Component } from '@angular/core';
import { TestApiService } from './services/test-api.service';
import { Store } from '@ngrx/store';
import { saveTests } from './store/post-store.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private testApiService: TestApiService, private store: Store) {}

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    this.testApiService.getTests().subscribe((tests: any) => {
      this.store.dispatch(saveTests({ tests: tests.allTests.reverse() }));
    });
  }
}
