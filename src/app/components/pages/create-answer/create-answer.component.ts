import { Component, OnInit } from '@angular/core';
import * as ace from 'ace-builds';
import { BackendServiceService } from '../../../services/backend-service.service';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-scss';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-answer',
  standalone: false,
  templateUrl: './create-answer.component.html',
  styleUrl: './create-answer.component.scss',
})
export class CreateAnswerComponent implements OnInit {
  constructor(
    private backendService: BackendServiceService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.questionId = +params['questionId'];
      console.log(this.questionId);
      console.log('this doesnt works');
      if (this.questionId === 0) {
        // Handle error or set a default action, e.g. redirect to a valid question page
        console.error('Invalid Question ID');
      }
    });
  }

  ngAfterViewInit() {
    ace.config.set(
      'basePath',
      'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/'
    );

    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/monokai');
    this.editor.session.setMode(`ace/mode/${this.language}`);
    this.editor.on('change', () => {
      this.code = this.editor.getValue();
    });
  }

  questionId: number = 0;
  editor: any;
  currentLanguage: string = '';
  code: string = '';
  title: any;
  description: any;
  slides: any;

  createAnswerFun(
    questionId: number,
    title: string,
    code: string,
    description: string
  ) {
    let AnswerDetails = {
      QuestionId: questionId,
      title: title,
      code: code,
      description: description,
    };

    this.backendService.createAnswer(AnswerDetails);
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

  filterImages = [
    'assets/html.png',
    'assets/css.png',
    'assets/js.png',
    'assets/ts.png',
    'assets/scss.png',
    'assets/c_sharp.png',
  ];
}
