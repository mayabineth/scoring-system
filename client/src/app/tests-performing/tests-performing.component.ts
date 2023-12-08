import { Component } from '@angular/core';
import { CompApiService } from '../services/company-api.service';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../models/Company';
import { fillTest } from '../store/post-store.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tests-performing',
  templateUrl: './tests-performing.component.html',
  styleUrls: ['./tests-performing.component.css'],
})
export class TestsPerformingComponent {
  companies: Company[] = [];
  company_msg: string = '';
  selectCompanyForm: FormGroup;
  company_tests: any[];
  specific_company_data: Company | undefined;
  tests: any[];
  comp_testId_score_map: Map<string, string>;
  constructor(
    private store: Store<{ tests: any }>,
    private fb: FormBuilder,
    private compApiService: CompApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getTests();
    this.getCompanies();
    this.selectCompanyForm = this.fb.group({
      company: ['', Validators.required],
    });
  }
  getCompanies() {
    this.compApiService.getCompanies().subscribe((comp) => {
      this.companies = comp.allCompanies;
    });
  }
  getTests() {
    this.store.select('tests').subscribe((data) => {
      this.tests = [...data.tests].map(({ _id: test_id, ...rest }) => ({
        test_id,
        ...rest,
      }));
    });
  }
  submit() {
    let company = this.selectCompanyForm.value.company;
    this.specific_company_data = this.companies.find(
      (item: Company) => item.name == company
    );
    this.comp_testId_score_map = new Map(
      this.specific_company_data?.tests?.map((obj) => {
        return [obj.test_id, obj.score];
      })
    );
    if (!this.specific_company_data) {
      this.company_msg = 'Welcome New Member!';
      this.company_tests = this.tests.map((test) => ({
        ...test,
        company: company,
      }));
    } else {
      this.company_msg = 'Welcome Back, Dear Member!';
      this.company_tests = this.tests.map((test) => ({
        ...test,
        comapny: this.specific_company_data?.name,
        tests: this.specific_company_data?.tests,
        _id: this.specific_company_data?._id,
      }));
    }
  }
  checkIfTestDone(test_id: any) {
    return this.comp_testId_score_map.get(test_id);
  }
  onShowTest(test: any) {
    if (this.checkIfTestDone(test.test_id)) this.router.navigate(['/show-test', test.test_id]);
    else {
      this.store.dispatch(fillTest({ fillTest: test }));
      this.router.navigate(['/test-execution']);
    }
  }
}
