import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { TestApiService } from '../services/test-api.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addTest } from '../store/post-store.actions';

@Component({
  selector: 'app-test-definition',
  templateUrl: './test-definition.component.html',
  styleUrls: ['./test-definition.component.css'],
})
export class TestDefinitionComponent {
  testForm: FormGroup;
  isValidForm: boolean = true;
  errorMsg: string = '';
  constructor(
    private router: Router,
    private testApiService: TestApiService,
    private fb: FormBuilder,
    private store: Store<{ tests: any }>
  ) {}

  ngOnInit() {
    this.testForm = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      questions: this.fb.array([]),
    });
  }
  
  questions(): FormArray {
    return this.testForm.get('questions') as FormArray;
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      weight: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-1]?(.\\d{1,2})?'),
          Validators.max(1),
        ],
      ],
      answers: this.fb.array([]),
    });
  }
  addQuestion() {
    this.questions().push(this.newQuestion());
  }

  removeQuestion(empIndex: number) {
    this.questions().removeAt(empIndex);
  }

  getAnswers(empIndex: number): FormArray {
    return this.questions().at(empIndex).get('answers') as FormArray;
  }
  newAnswer(): FormGroup {
    return this.fb.group({
      answer: ['', [Validators.required]],
      score: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(2),
        ],
      ],
    });
  }

  addAnswer(empIndex: number) {
    this.getAnswers(empIndex).push(this.newAnswer());
  }

  removeAnswer(empIndex: number, skillIndex: number) {
    this.getAnswers(empIndex).removeAt(skillIndex);
  }

  calcWeightsSum() {
    return this.testForm.value.questions.reduce(
      (total: number, question: any) => {
        return total + question.weight;
      },
      0
    );
  }

  checkIfQuestionWithoutAnswers() {
    return this.testForm.value.questions.find(
      (item: any) => item.answers.length == 0
    );
  }
  onSubmit() {
    if (this.checkIfQuestionWithoutAnswers() && this.calcWeightsSum()>1)
      this.errorMsg =
        'There is Question without answers, also Question Weights add up to 1.';
    else if (this.checkIfQuestionWithoutAnswers())
      this.errorMsg = 'There is Question without answers.';
    else if (this.calcWeightsSum()>1)
      this.errorMsg = 'Question Weights add up to 1.';
    else {
      let test = this.testForm.value;

      this.testApiService.addTest(test).subscribe((res: any) => {
        if (res.test._id) {
          this.store.dispatch(
            addTest({
              test: { ...test, _id: res.test._id },
            })
          );
        } else {
          console.log('not defined');
        }
      });
         this.router.navigate(['']);
    }
  }
}
