import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { CreateQuestionPageComponent } from './components/pages/create-question-page/create-question-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'askQuestion',
    component: CreateQuestionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
