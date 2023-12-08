import { createReducer, on } from '@ngrx/store';
import { addTest, saveTests, fillTest } from './post-store.actions';
import { Test, TestCompany } from '../models/Test';

interface State {
  tests: Test[];
  fillTest: TestCompany;
}
const initialState: State = {
  tests: [],
  fillTest: {
    name: '',
    desc: '',
    questions: [],
    _id: '',
    company: '',
    test_id: '',
    tests: [],
  },
};

export const postReducer = createReducer(
  initialState,

  on(saveTests, (state, action) => {
    return {
      ...state,
      tests: action.tests,
    };
  }),
  on(addTest, (state, action) => {
    return {
      ...state,
      tests: [action.test, ...state.tests],
    };
  }),
  on(fillTest, (state, action) => {
    return {
      ...state,
      fillTest: action.fillTest,
    };
  })
);
