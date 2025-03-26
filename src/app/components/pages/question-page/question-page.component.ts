import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../../../services/backend-service.service';
import { GlobalVariablesService } from '../../../services/global-variables.service';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) {}
  questionId!: number;
  editor: any;
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
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/monokai');
    this.editor.session.setMode('ace/mode/javascript');

    if (this.globalVaraiblesService.QuestionResponse?.question?.code) {
      this.editor.setValue(
        this.globalVaraiblesService.QuestionResponse.question.code
      );
    }
  }
}
