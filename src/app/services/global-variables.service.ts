import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  constructor() { }
  auth:boolean = false;
  signIn:boolean = false;
  signUp:boolean = false;
}
