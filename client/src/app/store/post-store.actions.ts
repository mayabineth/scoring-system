import { createAction, props } from '@ngrx/store';
import { Test, TestCompany } from '../models/Test';

export const saveTests = createAction(
  '[Tests] Save Tests',
  props<{ tests: Test[] }>()
);
export const addTest = createAction('[Test] Add Test', props<{ test: Test }>());
export const fillTest = createAction('[Company] Fill Test', props<{ fillTest: TestCompany }>());
