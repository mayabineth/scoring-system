export interface Test {
  name: string;
  desc: string;
  questions: { question: string; weight: string; answers: Answer[] }[];
  _id?: string;
}
export interface TestCompany {
  name: string;
  desc: string;
  questions: any[];
  _id: string;
  company: string;
  test_id: string;
  tests: any[];
}
export interface Answer {
  answer: string;
  score: number;
}
