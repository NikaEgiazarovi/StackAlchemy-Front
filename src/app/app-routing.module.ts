import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';

import { CreateQuestionPageComponent } from './components/pages/create-question-page/create-question-page.component';
import { QuestionPageComponent } from './components/pages/question-page/question-page.component';
import { authGuard } from './guards/auth.guard';
import { createQuestionGuard } from './guards/create-question.guard';
import { CreateAnswerComponent } from './components/pages/create-answer/create-answer.component';
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'askQuestion',
    component: CreateQuestionPageComponent,
    canActivate: [createQuestionGuard],
  },

  { path: 'question/:id', component: QuestionPageComponent },
  {
    path: 'createAnswer/:questionId',
    component: CreateAnswerComponent,
    canActivate: [createQuestionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
