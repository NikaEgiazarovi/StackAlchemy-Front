import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CreateQuestionPageComponent } from './components/pages/create-question-page/create-question-page.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'askQuestion',
    component: CreateQuestionPageComponent,
    canActivate: [authGuard],
  },
  { path: 'registration', component: RegistrationComponent },
  {path:'login',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
