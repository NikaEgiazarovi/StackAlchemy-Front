import { Component, Input } from '@angular/core';

@Component({

  standalone: false,
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.scss',

})
export class QuestionsListComponent {
  @Input() Questions: any[] = [];
}
