import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core'
import { PopupService } from '../services/popup.service'
import { FormControl } from '@angular/forms'
import { AuthServiceService } from '../services/auth-service.service'
import { Router } from '@angular/router'
import { UserServicesService } from '../services/user-services.service'
import { CommunityService } from '../services/community.service'
import { AuthGuardService } from '../services/auth-guard.service'

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css']
})
export class CommunityPageComponent {
  expandedQuestion: any
  searchQuetion: any
  userQuestion: any
  replyAnswer: any
  emailId: any;
  feedbackInfo : any;
  userName: any
  currentPage = 1
  pageSize = 5
  selectedFile: any
  selectedFileName: any
  questionURl: any
  role: string = 'Av Engineeer'
  profileImg: any[] = []
  mainQuestions: any[] = []
  additionalAnswers: any[] = []
  expanded: boolean = false
  showUrlBox: boolean = false
  showSearch: boolean = false
  showContactForm: boolean = false
  additionalAnswersVisible: boolean = false;
  showHomepage: boolean = true
  showMyposts: boolean = false
  updateQid: any
  buttonType: string = 'Save'
  showSpinner: boolean = false
  @ViewChild('myDialog') myDialog!: TemplateRef<any>
  @ViewChild('fileInput') fileInput!: ElementRef
  additionalAnswersVisibility: { [key: string]: boolean } = {}
  additionalAnswersData: { [key: string]: any[] } = {}
  showFullContent : { [key: string]: boolean } = {}

  constructor (
    private popup: PopupService,
    private router: Router,
    private authService: AuthServiceService,
    private commintyService: CommunityService,
    private userService: UserServicesService,
    private authGuard : AuthGuardService
  ) {}

  ngOnInit (): void {
    this.emailId = this.authService.getLoggedInEmail()
    this.userName = this.authService.getLoginuserName()
    this.getProfileImage()
    this.onSelect('homePage')
  }

  onSelect (option: any): void {
    this.currentPage = 1
    this.pageSize = 5
    if (option === 'homePage') {
      this.showHomepage = true
      this.getQuestions()
    } else if (option === 'contact') {
      this.showContactForm = true
    } else if (option === 'myPosts') {
      this.mainQuestions = []
      this.getUploadedQuestions()
      this.showMyposts = true
    } else {
      this.logOut()
    }
  }

  //Image
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

  //Questions
  getQuestions () {
    this.showSpinner = true
    this.commintyService
      .getCommunityQuestions(
        this.pageSize,
        (this.currentPage - 1) * this.pageSize,
        this.searchQuetion
      )
      .subscribe((response: any) => {
        this.mainQuestions = [...this.mainQuestions, ...response.records]
        console.log(response)
        this.showSpinner = false
      })
  }

  loadMore () {
    if (this.showHomepage) {
      this.currentPage++
      this.getQuestions()
    } else {
      this.currentPage++
      this.getUploadedQuestions()
    }
  }

  //uplaod Questions

  getUploadedQuestions () {
    this.showSpinner = true
    this.commintyService
      .getUploadedCommunityQuestions(
        this.emailId,
        this.pageSize,
        (this.currentPage - 1) * this.pageSize,
        this.searchQuetion
      )
      .subscribe((response: any) => {
        console.log(response)
        this.mainQuestions = [...this.mainQuestions, ...response.records]
        this.showSpinner = false
      })
  }

  //Update Question

  updateCommunity () {
    this.showSpinner = true
    const formData = new FormData()
    formData.append('emailId', this.emailId)
    formData.append('question', this.userQuestion)
    formData.append('image', this.selectedFile)
    formData.append('urlLink', this.questionURl)
    formData.append('qId', this.updateQid)

    this.commintyService
      .updateCommunity(formData)
      .subscribe((response: any) => {
        console.log('Response from server:', response)
        if (response && response.status) {
          this.userService.refreshData()
          this.showSpinner = false
          alert(response.message)
          // window.location.reload()
        } else {
          alert('An error occurred. Please try again later.')
        }
      })
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
  ]

  selectPhoto () {
    this.fileInput.nativeElement.click()
  }

  onFileSelected (event: any) {
    const file = event.target.files[0]
    console.log('Selected file:', file)
    this.selectedFile = file
  }

  // Upload
  onUpload () {
    if (this.buttonType === 'Save') {
      this.showSpinner = true
      const formData = new FormData()
      formData.append('emailId', this.emailId)
      formData.append('question', this.userQuestion)
      formData.append('image', this.selectedFile)
      formData.append('userName', this.userName)
      if (this.questionURl) {
        formData.append('urlLink', this.questionURl)
      }
      this.commintyService
        .insertCommunity(formData)
        .subscribe((response: any) => {
          console.log('Response from server:', response)
          this.showSpinner = false
          if (response && response.status) {
            alert(response.message)
            window.location.reload()
          } else {
            alert('An error occurred. Please try again later.')
          }
        })
    } else {
      this.updateCommunity()
    }
  }

  uploadAnswer () {
    this.showSpinner = true
    const formData = new FormData()
    formData.append('emailId', this.emailId)
    formData.append('answer', this.replyAnswer)
    formData.append('userName', this.userName)
    formData.append('qId', this.expandedQuestion)
    this.commintyService
      .insertCommunityAnswer(formData)
      .subscribe((response: any) => {
        console.log('Response from server:', response)
        this.showSpinner = false
        if (response && response.status) {
          alert(response.message)
          window.location.reload()
        } else {
          alert('An error occurred. Please try again later.')
        }
      })
  }

  //ViewMore
  showAdditionalAnswers (question: any) {
    this.showSpinner = true
    this.additionalAnswersVisibility[question.qId] =
      !this.additionalAnswersVisibility[question.qId]
    console.log(question)
    let qId = question.qId
    this.commintyService
      .getMoreCommunityAnswers(qId)
      .subscribe((response: any) => {
        console.log(response)
        this.additionalAnswersData[question.qId] = response.records
        this.showSpinner = false
      })
  }



  showContent(question: any) {
    if (!this.showFullContent[question.qId]) {
      this.commintyService.getFeedback(question.qId).subscribe((response: any) => {
        console.log(response);
        this.feedbackInfo = response.records;
        this.showFullContent[question.qId] = !this.showFullContent[question.qId];
        this.showSpinner = false;
        this.performActions(question.qId, 'view');
      });
    } else {
      this.showFullContent[question.qId] = !this.showFullContent[question.qId];
    }
  }
  

  toggleSearch () {
    this.showSearch = !this.showSearch
  }

  //Expand
  expandQuestion (qId: number): void {
    this.expandedQuestion = this.expandedQuestion === qId ? null : qId
  }

  isExpanded (qId: number): boolean {
    return this.expandedQuestion === qId && this.expandedQuestion !== null
  }

  urlExpand () {
    this.showUrlBox = !this.showUrlBox
  }

  postQuetion () {
    this.popup.openDialogWithTemplateRef(this.myDialog)
  }

  //edit

  editQuestion (question: any) {
    this.buttonType = 'update'
    console.log('question', question)
    this.userQuestion = question.question
    this.questionURl = question.urlLink
    this.updateQid = question.qId
    this.popup.openDialogWithTemplateRef(this.myDialog)
  }

  //delete
  deleteQuestion (question: any) {
    console.log(question)
    this.showSpinner = true
    const questionData = {
      emailId: question.question_owner_email,
      qId: question.qId
    }
    const confirmation = confirm('Are you sure you want to delete the Product?')
    if (!confirmation) {
      return
    }
    this.commintyService
      .deleteCommunity(questionData)
      .subscribe((response: any) => {
        console.log('Response from server:', response)
        this.showSpinner = false
        if (response && response.status) {
          alert(response.message);
          this.onSelect('myPosts');
        } else {
          alert('An error occurred. Please try again later.')
        }
      })
  }


//Like and Dislikes operations

performActions(questionId: number, type: string) {
  this.showSpinner = true;
  const data = {
    "qId": questionId,
    "emailId": this.emailId,
    "action": type // Adding action type ('like' or 'dislike')
  };

  let serviceCall;
  serviceCall = this.commintyService.postFeedback(data);

  serviceCall.subscribe(
    (response:any) => {
      console.log('Response from server:', response);
      this.showSpinner = false;
    },
    (error:any) => {
      this.handleError(error);
    }
  );
}


private handleError(error: any) {
  console.error('Error:', error);
  this.showSpinner = false;
}


  closePopup () {
    this.popup.closeDialog()
    this.showUrlBox = false
  }

  get filteredquestions (): any[] {
    if (!this.searchQuetion || this.searchQuetion.trim() === '') {
      return this.mainQuestions // Return all questions directly
    }
    return this.mainQuestions.filter(
      question =>
        question.question
          .toLowerCase()
          .includes(this.searchQuetion.toLowerCase()) ||
        (question.answer &&
          question.answer
            .toLowerCase()
            .includes(this.searchQuetion.toLowerCase()))
    )
  }

  onBack () {
    this.onSelect('homePage')
    window.scrollTo(0, 0)
  }

  logOut () {
    this.authGuard.logout();
}
}