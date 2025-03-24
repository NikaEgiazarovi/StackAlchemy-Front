import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { BackendServiceService } from '../../../services/backend-service.service';
import { error } from 'console';
@Component({
  standalone: false,
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  animations: [
    trigger('DropDownMenuAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate(
          '0.5s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),

      transition(':leave', [
        animate(
          '0.3s ease-in',
          style({ transform: 'translateY(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],

})
export class LandingPageComponent implements OnInit {
  constructor(private backendService: BackendServiceService) {}
  ngOnInit(): void {
    // this.backendService.getAllQuestionsRequest().subscribe(
    //   (data) => {
    //     this.questionsArray = data;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
  swiperBreakpoints = {
    1090: { slidesPerView: 3, spaceBetween: 0 },
  };

  questionsArray: any = [];

  dropDownMenu: boolean = false;
  newestFilter: boolean = false;
  scoresFilter: boolean = false;
  unansweredFilter: boolean = false;
  filterImages = [
    'assets/html.png',
    'assets/css.png',
    'assets/js.png',
    'assets/ts.png',
    'assets/scss.png',
    'assets/c_sharp.png',
  ];
  selectedLanguage: string = '';

  selectLanguage(language: string) {
    this.selectedLanguage = language;
  }

  filterQuestions() {
    this.dropDownMenu = false;
  }

  selectFilter(filter: 'newest' | 'scores' | 'unanswered') {
    switch (filter) {
      case 'newest':
        this.newestFilter = !this.newestFilter;
        this.scoresFilter = false;
        this.unansweredFilter = false;
        break;

      case 'scores':
        this.scoresFilter = !this.scoresFilter;
        this.newestFilter = false;
        this.unansweredFilter = false;
        break;

      case 'unanswered':
        this.unansweredFilter = !this.unansweredFilter;
        this.scoresFilter = false;
        this.newestFilter = false;
        break;
    }
  }
}
