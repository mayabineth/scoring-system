import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './store/post-store.reducer';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AdministrationComponent } from './administration/administration.component';
import { TestsPerformingComponent } from './tests-performing/tests-performing.component';
import { TestsResultsComponent } from './tests-results/tests-results.component';
import { TestDefinitionComponent } from './test-definition/test-definition.component';
import { FilterTestsPipe } from './filter-tests.pipe';
import { ShowTestComponent } from './show-test/show-test.component';
import { TestExecutionComponent } from './test-execution/test-execution.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PageNotFoundComponent,
    AdministrationComponent,
    TestsPerformingComponent,
    TestsResultsComponent,
    TestDefinitionComponent,
    FilterTestsPipe,
    ShowTestComponent,
    TestExecutionComponent,
  ],
  imports: [
    MatTooltipModule,
    FormsModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {
        tests: postReducer,
      },
      {}
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
