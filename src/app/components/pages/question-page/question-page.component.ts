import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../../../services/backend-service.service';
import { GlobalVariablesService } from '../../../services/global-variables.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-scss';
@Component({
  selector: 'app-question-page',
  standalone: false,
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss',
})
export class QuestionPageComponent implements OnInit {
  constructor(
    private backendService: BackendServiceService,
    public globalVaraiblesService: GlobalVariablesService,
    private route: ActivatedRoute,
    private authService:AuthService
  ) {}
  questionId!: number;
  QuestionEditor: any;
  AnswerEditors: any = [];
  token:string | null = ''
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.questionId = Number(params.get('id'));
      this.fetchQuestion();
    });
    ace.config.set(
      'basePath',
      'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/'
    );
  }

  deleteAnswerFunc(answerId:number)
  {
     this.token = this.authService.getToken()
    let DeleteAnswerObject = {
      token: this.token,
      AnswerId:answerId
    }

    this.backendService.deleteQuestion(DeleteAnswerObject)
  }

  private fetchQuestion(): void {
    this.backendService.getQuestion(this.questionId).subscribe(
      (data) => {
        if (data && data.question) {
          this.globalVaraiblesService.QuestionResponse = data;
          this.initializeEditor();
        }
      },
      (error) => {
        console.error('Error fetching question:', error);
      }
    );
  }

  private initializeEditor(): void {
    setTimeout(() => {
      this.QuestionEditor = ace.edit('QuestionEditor');
      this.QuestionEditor.setTheme('ace/theme/monokai');
      this.QuestionEditor.session.setMode('ace/mode/javascript');
      this.QuestionEditor.setReadOnly(true);

      if (this.globalVaraiblesService.QuestionResponse?.question?.code) {
        this.QuestionEditor.setValue(
          this.globalVaraiblesService.QuestionResponse.question.code
        );
      }

      this.AnswerEditors =
        this.globalVaraiblesService.QuestionResponse?.question?.answers.map(
          (answer: { code: string }, index: number) => {
            const editor = ace.edit(`answerEditor${index}`);
            editor.setTheme('ace/theme/monokai');
            editor.session.setMode('ace/mode/javascript');
            editor.setReadOnly(true);
            editor.setValue(answer.code || '');
            return editor;
          }
        );
    }, 0);
  }
}
