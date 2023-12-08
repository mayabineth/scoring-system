import { Component } from '@angular/core';
import { Company } from '../models/Company';
import { CompApiService } from '../services/company-api.service';

@Component({
  selector: 'app-tests-results',
  templateUrl: './tests-results.component.html',
  styleUrls: ['./tests-results.component.css'],
})
export class TestsResultsComponent {
  companies: Company[] = [];

  constructor(
    private compApiService: CompApiService,
  ) {}

  ngOnInit(): void {
    this.getCompanies();
  }
  getCompanies() {
    this.compApiService.getCompanies().subscribe((comp) => {
      this.companies = comp.allCompanies;
    });
  }
}
