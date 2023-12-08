export interface Company {
  name: string;
  tests?:  { test_id: string;test_name: string; score: any }[];
  _id?: string;
}
