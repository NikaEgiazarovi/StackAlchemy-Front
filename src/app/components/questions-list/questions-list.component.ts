import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-questions-list',
    templateUrl: './questions-list.component.html',
    styleUrl: './questions-list.component.scss',
    standalone: false
})
export class QuestionsListComponent {
  @Input() Questions: any[] = [];
}
