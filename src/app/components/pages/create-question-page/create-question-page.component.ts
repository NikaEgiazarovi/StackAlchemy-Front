import { Component } from '@angular/core';

@Component({
  selector: 'app-create-question-page',
  templateUrl: './create-question-page.component.html',
  styleUrl: './create-question-page.component.scss',

})
export class CreateQuestionPageComponent {
title: any;
description: any;
code: any;
slides: any;

filterImages = [
  'assets/html.png',
  'assets/css.png',
  'assets/js.png',
  'assets/ts.png',
  'assets/angular.png',
  'assets/scss.png',
  'assets/c_sharp.png',
];


}
