import { Component, TemplateRef, ViewChild } from '@angular/core'
import { PopupService } from '../services/popup.service'
import { FormControl } from '@angular/forms'
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

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
  role : string = 'Av Engineeer';
  expanded: boolean = false;
  showUrlBox: boolean = false;
  showSearch: boolean = false;
  showContactForm : boolean = false;
  showHomepage : boolean = true;
  showMyposts : boolean = false;
  showSpinner : boolean = false;
  @ViewChild('myDialog') myDialog!: TemplateRef<any>

  constructor (private popup: PopupService,private router: Router, private authService : AuthServiceService) {}


   notifications = [
    {
      icon: 'bi-exclamation-circle text-warning',
      title: 'Lorem Ipsum',
      message: 'Quae dolorem earum veritatis oditseno',
      timestamp: '30 min. ago'
    },
    {
      icon: 'bi-x-circle text-danger',
      title: 'Atque rerum nesciunt',
      message: 'Quae dolorem earum veritatis oditseno',
      timestamp: '1 hr. ago'
    },
    {
      icon: 'bi-check-circle text-success',
      title: 'Sit rerum fuga',
      message: 'Quae dolorem earum veritatis oditseno',
      timestamp: '2 hrs. ago'
    },
    {
      icon: 'bi-info-circle text-primary',
      title: 'Dicta reprehenderit',
      message: 'Quae dolorem earum veritatis oditseno',
      timestamp: '4 hrs. ago'
    }
  ];


  messages = [
    {
      sender: 'Maria Hudson',
      imageUrl: 'assets/img/messages-1.jpg',
      message: 'Velit asperiores et ducimus soluta repudiandae labore officia est ut...',
      timestamp: '4 hrs. ago'
    },
    {
      sender: 'Anna Nelson',
      imageUrl: 'assets/img/messages-2.jpg',
      message: 'Velit asperiores et ducimus soluta repudiandae labore officia est ut...',
      timestamp: '6 hrs. ago'
    },
    {
      sender: 'David Muldon',
      imageUrl: 'assets/img/messages-3.jpg',
      message: 'Velit asperiores et ducimus soluta repudiandae labore officia est ut...',
      timestamp: '8 hrs. ago'
    }
  ];



  questions = [
    {
      slNo: 1,
      profile: { username: 'Disendra', image: 'assets/img/disendra-Img.png' },
      postedDate: '28/03/2024',
      question: 'How to create linkedin login in angular 9?',
      answers: 'Angular is an open-source, JavaScript framework written in TypeScript. Google maintains it, and its primary purpose is to develop single-page applications. As a framework, Angular has clear advantages while also providing a standard structure for developers to work with.',
      voteCount: { up: 34, down: 45, views:10, comments: 20 }
    },
    {
      slNo: 2,
      profile: { username: 'Harish', image: 'assets/img/disendra-Img.png' },
      postedDate: '28/03/2024',
      question: 'why am I getting an undefined error?',
      answers: 'Angular is an open-source, JavaScript framework written in TypeScript. Google maintains it, and its primary purpose is to develop single-page applications. As a framework, Angular has clear advantages while also providing a standard structure for developers to work with.',
      voteCount: { up: 34, down: 20, views:10, comments: 30 }
    },
    {
      slNo: 3,
      profile: { username: 'Harish', image: 'assets/img/disendra-Img.png' },
      postedDate: '28/03/2024',
      question: 'why am I getting an undefined error?',
      answers: 'Angular is an open-source, JavaScript framework written in TypeScript. Google maintains it, and its primary purpose is to develop single-page applications. As a framework, Angular has clear advantages while also providing a standard structure for developers to work with.',
      voteCount: { up: 34, down: 20, views:10, comments: 40 }
    }
  ]




  additionalAnswers = [
    {
      slNo: 2,
      profile: { username: 'Harish', image: 'assets/img/disendra-Img.png' },
      postedDate: '28/03/2024',
      answers: 'Angular is an open-source, JavaScript framework written in TypeScript. Google maintains it, and its primary purpose is to develop single-page applications. As a framework, Angular has clear advantages while also providing a standard structure for developers to work with.',
      // voteCount: { up: 34, down: 20, views:10, comments: 30 }
    },
    {
      slNo: 3,
      profile: { username: 'Harish', image: 'assets/img/disendra-Img.png' },
      postedDate: '28/03/2024',
      answers: 'Angular is an open-source, JavaScript framework written in TypeScript. Google maintains it, and its primary purpose is to develop single-page applications. As a framework, Angular has clear advantages while also providing a standard structure for developers to work with.',
      // voteCount: { up: 34, down: 20, views:10, comments: 40 }
    }
  ]


  ngOnInit (): void {
    this.loadQuestions()
  }
  
  additionalAnswersVisible : boolean = false;
  showAdditionalAnswers(question:any)  {
    this.additionalAnswersVisible = !this.additionalAnswersVisible;
  }



  onSelect(option: any): void {
    if (option === 'contact') {
      this.showContactForm = true;
      this.showHomepage = false;
      this.showMyposts = false;
    } else if (option === 'myPosts') {
      this.showMyposts = false;
      this.showContactForm = false;
      this.showHomepage = false;
  
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
        this.showMyposts = true;
      }, 2000);
    }
   
    
    else {
      this.logOut()
    }
  }






 

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  loadQuestions (): void {
    this.questions = this.questions
  }

  get filteredEmails(): any[] {
    if (!this.searchQuetion || this.searchQuetion.trim() === '') {
      return this.questions; // Return all questions directly
    }  
    return this.questions.filter(question =>
      question.question.toLowerCase().includes(this.searchQuetion.toLowerCase())
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

  logOut () {
    this.authService.clearLoggedInEmail()
    this.router.navigate(['/home-page']).then(() => {
      window.location.reload()
    })
  }

}
