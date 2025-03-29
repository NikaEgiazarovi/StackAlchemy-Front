import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CreateQuestionPageComponent } from './components/pages/create-question-page/create-question-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuestionPageComponent } from './components/pages/question-page/question-page.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    QuestionsListComponent,
    AuthComponent,
    RegistrationComponent,
    LoginComponent,
    CreateQuestionPageComponent,
    QuestionPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot([]),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],

  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
