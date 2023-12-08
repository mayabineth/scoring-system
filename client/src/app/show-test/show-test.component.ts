import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TestApiService } from '../services/test-api.service';
import { Test } from '../models/Test';

@Component({
  selector: 'app-show-test',
  templateUrl: './show-test.component.html',
  styleUrls: ['./show-test.component.css'],
})
export class ShowTestComponent {
  id: number;
  test: Test;
  constructor(
    private route: ActivatedRoute,
    private testApiService: TestApiService,
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.testApiService.getTest(this.id).subscribe((test: any) => {
      this.test = test.test;
    });
  }
}
