import { Component, TemplateRef, ViewChild } from '@angular/core'
import { PopupService } from '../services/popup.service'
import { FormControl } from '@angular/forms'
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { UserServicesService } from '../services/user-services.service';
import { CommunityService } from '../services/community.service';

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
  emailId : any;
  userName : any;
  currentPage = 1;
  pageSize = 1;
  role : string = 'Av Engineeer';
  profileImg : any[] = [];
  mainQuestions : any[] = [];
  additionalAnswers : any[] = [];
  expanded: boolean = false;
  showUrlBox: boolean = false;
  showSearch: boolean = false;
  showContactForm : boolean = false;
  additionalAnswersVisible : boolean = false;
  showHomepage : boolean = true;
  showMyposts : boolean = false;
  showSpinner : boolean = false;
  @ViewChild('myDialog') myDialog!: TemplateRef<any>

  constructor (private popup: PopupService,private router: Router, private authService : AuthServiceService,private commintyService: CommunityService, private userService: UserServicesService) {}

  
  ngOnInit (): void {
    this.emailId = this.authService.getLoggedInEmail()
    this.userName = this.authService.getLoginuserName()
    this.getProfileImage();
    this.loadQuestions()
    this.getQuestions();
  }


  getProfileImage () {
    this.showSpinner = true
    this.userService
      .getProfileImage(this.emailId)
      .subscribe((response: any) => {
        console.log(response)
        this.showSpinner = false
        this.profileImg = response.records
      })
  }

  getImageSource (): string {
    if (this.profileImg && this.profileImg.length > 0) {
      return this.profileImg[0].imagePath
    } else {
      return '../assets/img/blank-user-directory.png'
    }
  }
  
  getQuestions() {
    this.showSpinner = true;
    this.commintyService.getCommunityQuestions(this.pageSize, (this.currentPage - 1) * this.pageSize, this.searchQuetion).subscribe((response: any) => {
      this.mainQuestions = [...this.mainQuestions, ...response.records];
      console.log(response);
      this.showSpinner = false;
    });
  }
  
  loadMore() {
    this.currentPage++;
    this.getQuestions();
  }
  


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


  additionalAnswersVisibility: { [key: string]: boolean } = {};
  additionalAnswersData: { [key: string]: any[] } = {};
  
  showAdditionalAnswers(question: any) {
    this.additionalAnswersVisibility[question.qId] = !this.additionalAnswersVisibility[question.qId];
    console.log(question);
    let qId = question.qId;
    this.commintyService.getMoreCommunityAnswers(qId).subscribe(
      (response: any) => {
        console.log(response);
        this.additionalAnswersData[question.qId] = response.records;
      }
    );
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

  get filteredquestions(): any[] {
    if (!this.searchQuetion || this.searchQuetion.trim() === '') {
      return this.mainQuestions; // Return all questions directly
    }  
    return this.mainQuestions.filter(question =>
      question.question.toLowerCase().includes(this.searchQuetion.toLowerCase()) ||
      (question.answer && question.answer.toLowerCase().includes(this.searchQuetion.toLowerCase()))
    );
  }
  
  

  expandQuestion (slNo: number): void {
    this.expandedQuestion = this.expandedQuestion === slNo ? null : slNo
  }

  isExpanded (slNo: number) {
    // return this.expandedQuestion === slNo
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
