import { Component } from '@angular/core';
import { GlobalVariablesService } from './services/global-variables.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    public globalVariables: GlobalVariablesService,
    private router: Router
  ) {}
  title = 'StackAlchemyFront';
  auth = this.globalVariables.auth;
  shouldShowFooter(): boolean {
    return !this.router.url.startsWith('/question/');
  }
}
