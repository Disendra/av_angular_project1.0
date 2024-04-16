import { Component, TemplateRef, ViewChild } from '@angular/core'
import { PopupService } from '../services/popup.service'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css']
})
export class CommunityPageComponent {
  expandedQuestion: any
  searchQuetion: any;
  userQuestion : any;
  questionURl : any;
  userName : string = 'Disendra';
  expanded: boolean = false;
  showUrlBox: boolean = false
  @ViewChild('myDialog') myDialog!: TemplateRef<any>

  constructor (private popup: PopupService) {}

  questions = [
    {
      slNo: 1,
      profile: { username: 'Disendra', image: 'assets/img/disendra-Img.png' },
      postedDate: '28/03/2024',
      question: 'How to create linkedin login in angular 9?',
      answers: ['Answer 1', 'Answer 2'],
      voteCount: { up: 34, down: 45 }
    },
    {
      slNo: 2,
      profile: { username: 'Harish', image: 'assets/img/disendra-Img.png' },
      postedDate: '28/03/2024',
      question: 'why am I getting an undefined error?',
      answers: ['Answer 1', 'Answer 2'],
      voteCount: { up: 34, down: 20 }
    },
    {
      slNo: 3,
      profile: { username: 'Harish', image: 'assets/img/disendra-Img.png' },
      postedDate: '28/03/2024',
      question: 'why am I getting an undefined error?',
      answers: ['Answer 1', 'Answer 2'],
      voteCount: { up: 34, down: 20 }
    }
  ]

  ngOnInit (): void {
    this.loadQuestions()
  }

  loadQuestions (): void {
    this.questions = this.questions
  }

  get filteredEmails(): any[] {
    if (!this.searchQuetion || this.searchQuetion.trim() === '') {
      return [];
    }  
    return this.questions.filter(questions =>
      questions.question.toLowerCase().includes(this.searchQuetion.toLowerCase())
    );
  }
  

  expandQuestion (slNo: number): void {
    this.expandedQuestion = this.expandedQuestion === slNo ? null : slNo
  }

  isExpanded (slNo: number): boolean {
    return this.expandedQuestion === slNo
  }

  urlExpand () {
    this.showUrlBox = !this.showUrlBox
  }

  postQuetion () {
    this.popup.openDialogWithTemplateRef(this.myDialog)
  }

  closePopup () {
    this.popup.closeDialog()
    this.showUrlBox = false;
  }
}
