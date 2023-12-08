import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestDefinitionComponent } from './test-definition/test-definition.component';
import { AdministrationComponent } from './administration/administration.component';
import { TestsPerformingComponent } from './tests-performing/tests-performing.component';
import { TestsResultsComponent } from './tests-results/tests-results.component';
import { ShowTestComponent } from './show-test/show-test.component';
import { TestExecutionComponent } from './test-execution/test-execution.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
  },
  {
    path: 'show-test/:id',
    component: ShowTestComponent,
  },
  {
    path: 'test-definition',
    component: TestDefinitionComponent,
  },
  {
    path: 'test-performing',
    component: TestsPerformingComponent,
  },
  {
    path: 'tests-results',
    component: TestsResultsComponent,
  },
  {
    path: 'test-execution',
    component: TestExecutionComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
