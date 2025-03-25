import { Component } from '@angular/core';
import { GlobalVariablesService } from './services/global-variables.service';
@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {
  constructor(public globalVariables:GlobalVariablesService){}
  title = 'StackAlchemyFront';
  auth = this.globalVariables.auth
  

}
