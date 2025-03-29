import { Component, OnInit } from '@angular/core';
import * as ace from 'ace-builds';
import { BackendServiceService } from '../../../services/backend-service.service';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-scss';
@Component({
  standalone: false,
  selector: 'app-create-question-page',
  templateUrl: './create-question-page.component.html',
  styleUrl: './create-question-page.component.scss',
})
export class CreateQuestionPageComponent implements OnInit {
  constructor(private backendService: BackendServiceService) {}
  editor: any;
  currentLanguage: string = '';
  code: string = '';
  title: any;
  description: any;
  slides: any;

  createQuestionFun(title: string, code: string, description: string) {
    let QuestionDetails = {
      title: title,
      code: code,
      description: description,
    };

    this.backendService.createQuestion(QuestionDetails);
  }
  selectLanguage(selectedLanguage: string) {
    switch (selectedLanguage) {
      case 'assets/html.png':
        this.currentLanguage = selectedLanguage;
        this.editor.setValue('');
        this.language = 'html';
        console.log('html mode');
        break;

      case 'assets/css.png':
        this.currentLanguage = selectedLanguage;
        this.editor.setValue('');
        this.language = 'css';
        console.log('css mode');
        break;

      case 'assets/js.png':
        this.currentLanguage = selectedLanguage;
        this.editor.setValue('');
        this.language = 'javascript';
        console.log('javascript mode');
        break;

      case 'assets/ts.png':
        this.currentLanguage = selectedLanguage;
        this.editor.setValue('');
        this.language = 'typescript';
        console.log('typescript mode');
        break;

      case 'assets/c_sharp.png':
        this.currentLanguage = selectedLanguage;
        this.editor.setValue('');
        this.language = 'csharp';
        console.log('csharp mode');
        break;

      case 'assets/scss.png':
        this.currentLanguage = selectedLanguage;
        this.editor.setValue('');
        console.log('scss mode');
        break;

      default:
        break;
    }
  }
  language: string = 'javascript';
  ngOnInit() {
    ace.config.set('basePath', '/assets/ace/');
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/monokai');
    this.editor.session.setMode(`ace/mode/${this.language}`);
    this.editor.on('change', () => {
      this.code = this.editor.getValue();
    });
  }

  filterImages = [
    'assets/html.png',
    'assets/css.png',
    'assets/js.png',
    'assets/ts.png',
    'assets/scss.png',
    'assets/c_sharp.png',
  ];
}
