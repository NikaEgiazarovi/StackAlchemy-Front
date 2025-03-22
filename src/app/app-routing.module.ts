import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { CreateQuestionPageComponent } from './components/pages/create-question-page/create-question-page.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'askQuestion',
    component: CreateQuestionPageComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
