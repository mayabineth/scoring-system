import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Answer, TestCompany } from '../models/Test';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../models/Company';
import { CompApiService } from '../services/company-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-execution',
  templateUrl: './test-execution.component.html',
  styleUrls: ['./test-execution.component.css'],
})
export class TestExecutionComponent {
  testForm: FormGroup;
  test: TestCompany;
  totalTestScore: number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private compApiService: CompApiService,
    private store: Store<{ tests: any }>
  ) {}

  ngOnInit(): void {
    this.store.select('tests').subscribe((data) => {
      this.test = data.fillTest;
    });
    this.createForm();
  }

  createForm() {
    const formGroup: any = {};
    this.test.questions?.forEach((question) => {
      formGroup[question.question] = ['', Validators.required];
    });
    this.testForm = this.fb.group(formGroup);
  }
  calculateTestScore() {
    this.totalTestScore = this.test.questions?.reduce((total, question) => {
      const selectedOption = this.testForm.value[question.question];
      const selectedScore =
        question.answers.find((option: any) => option.answer === selectedOption)
          ?.score || 0;
      return Math.round((total + selectedScore * question.weight) * 10) / 10;
    }, 0);
  }

  onSubmit() {
    const answers: Answer[] = [];
    this.test.questions?.forEach((question: any) => {
      const selectedOption = this.testForm.value[question.question];
      const selectedScore =
        question.answers.find((option: any) => option.answer === selectedOption)
          ?.score || 0;
      const answer: Answer = {
        answer: selectedOption,
        score: selectedScore,
      };
      answers.push(answer);
    });
    this.calculateTestScore();

    if (this.test._id === undefined) {
      // company does not exist in DB
      let compAdd: Company = {
        name: this.test.company,
        tests: [{ test_id: this.test.test_id,test_name: this.test.name,  score: this.totalTestScore }],
      };

      this.compApiService.addCompany(compAdd).subscribe((res: any) => {});
    } else {
      // company exist in DB
      let compEdit: Company = {
        name: this.test.company,
        _id: this.test._id,
        tests: [
          ...this.test.tests,
          { test_id: this.test.test_id, test_name: this.test.name,score: this.totalTestScore },
        ],
      };

      this.compApiService.editCompany(compEdit).subscribe((res: any) => {});
    }
    setTimeout(() => {
      this.router.navigate(['/test-performing']);
    }, 1000);
  }
}
