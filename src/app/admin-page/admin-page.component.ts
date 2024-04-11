import { Component, TemplateRef, ViewChild } from '@angular/core'
import { FaServiceService } from '../services/fa-service.service'
import Chart from 'chart.js/auto'
import { UserServicesService } from '../services/user-services.service'
import { PopupService } from '../services/popup.service'

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  sender: any
  title: any
  description: any
  link: any
  chart: any
  totalCount: any
  startDate!: Date
  dltFeedDate!: any
  selectedRating: any = 'All'
  endDate!: Date
  showSpinner: boolean = false
  userData: any[] = []
  totalRoles: any[] = []
  ratings: any[] = []
  @ViewChild('myDialog') myDialog!: TemplateRef<any>
  @ViewChild('feedBack') feedBack!: TemplateRef<any>
  selectedOptions: any

  constructor (
    private faService: FaServiceService,
    private userService: UserServicesService,
    private popup: PopupService
  ) {}

  data = [{ labels: 'red' }]
  counts: any
  labels: any

  socialMediaCounts = [
    { icon: 'assets/img/social-media/linkedIn.png', name: '10K Connections' },
    { icon: 'assets/img/social-media/twitter.png', name: '10K Followers' },
    { icon: 'assets/img/social-media/instagram.png', name: '10K Likes' },
    { icon: 'assets/img/social-media/youtube.png', name: '10K Subscribers' }
  ]

  options: string[] = ['All', '1', '2', '3', '4', '5']

  // this.popup.openDialogWithTemplateRef(this.myDialog);

  ngOnInit (): void {
    //   this.faService.getRoles().subscribe((response: any) => {
    //     console.log('Response from server:', response)
    //     this.labels = response.records.map((record: { role: any; }) => record.role);
    //     this.counts = response.records.map((record: { role_count: any; }) => record.role_count);
    //     this.createChart();
    //   });

    //  this.userService.getFeedBackData().subscribe((response:any) => {
    //   console.log('Response from server:', response)
    //   this.labels = response.records.map((record: { rating: any; }) => record.rating);
    //   this.counts = response.records.map((record: { count: any; }) => record.count);
    //   this.createRatingChart();
    //  })
    this.showSpinner = true
    this.faService.getRoles().subscribe((response: any) => {
      this.showSpinner = false
      console.log(response)
      this.totalRoles = response.records
      this.totalCount = this.totalRoles.reduce(
        (total, role) => total + role.role_count,
        0
      )
    })

    this.userService.getFeedBackData().subscribe((response: any) => {
      this.showSpinner = false
      console.log(response)
      this.ratings = response.records
      // this.totalCount = this.totalRoles.reduce((total, role) => total + role.role_count, 0);
    })
  }

  calculateProgress (role_count: number): number {
    return (role_count / this.totalCount) * 100
  }

  toTitleCase (str: string): string {
    const titleCaseMap: { [key: string]: string } = {
      AvEngineer: 'AV Engineer',
      systemIntegrator: `SI'S`,
      oem: 'OEM'
    }

    if (titleCaseMap.hasOwnProperty(str)) {
      return titleCaseMap[str]
    }
    return str.replace(/\b\w/g, char => char.toUpperCase())
  }

  downloadData (option: any) {
    var tableName = ''
    if (option === 'userData') {
      if (this.selectedOptions === 'roles') {
        tableName = 'login_Data'
      } else {
        tableName = 'login_Logs'
      }
    } else if (option === 'feedBack') {
      tableName = 'feedback'
    }

    this.faService.downloadFeedback(
      tableName,
      this.startDate,
      this.endDate,
      this.selectedRating
    )
    this.selectedRating = 'All'
  }

  openDialogue (option: any) {
    this.selectedOptions = option
    if (option === 'roles' || option === 'loginInfo') {
      this.popup.openDialogWithTemplateRef(this.myDialog)
    } else {
      this.popup.openDialogWithTemplateRef(this.feedBack)
    }
  }

  //   createChart(): void {
  //     const myChart = new Chart("myChart", {
  //         type: 'pie',
  //         data: {
  //             labels: this.labels,
  //             datasets: [{
  //                 label: 'Counts',
  //                 data: this.counts,
  //                 backgroundColor: [
  //                     'red',
  //                     'pink',
  //                     'green',
  //                     'yellow',
  //                     'orange',
  //                     'blue'
  //                 ],
  //                 hoverOffset: 3
  //             }]
  //         },
  //         options: {
  //             aspectRatio: 2,
  //             plugins: {
  //                 tooltip: {
  //                     callbacks: {
  //                         label: function(context) {
  //                             var label = context.label || '';
  //                             var value = context.parsed || 0;
  //                             var total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
  //                             var percentage = parseFloat((value / total * 100).toFixed(2));
  //                             return `${label}: ${value} (${percentage}%)`;
  //                         }
  //                     }
  //                 }
  //             }
  //         }
  //     });
  // }

  // createRatingChart(): void {
  //   let labelsWithStars = this.labels.map((label: string) => label + ' Stars');
  //   const myChart = new Chart("myRatingChart", {
  //       type: 'pie',
  //       data: {
  //           labels: labelsWithStars,
  //           datasets: [{
  //               label: 'Counts',
  //               data: this.counts,
  //               backgroundColor: [
  //                   'black',
  //                   'blue',
  //                   'Red',
  //                   'lightgrey',
  //                   'green'
  //               ],
  //               hoverOffset: 3
  //           }]
  //       },
  //       options: {
  //           aspectRatio: 2,
  //           plugins: {
  //               tooltip: {
  //                   callbacks: {
  //                       label: function(context) {
  //                           var label = context.label || '';
  //                           var value = context.parsed || 0;
  //                           var total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
  //                           var percentage = parseFloat((value / total * 100).toFixed(2));
  //                           return `${label}: ${value} (${percentage}%)`;
  //                       }
  //                   }
  //               }
  //           }
  //       }
  //   });
  // }

  onSubmit () {
    this.showSpinner = true
    const feedData = {
      sender: this.sender,
      title: this.title,
      dltFeedDate: this.dltFeedDate,
      description: this.description,
      link: this.link
    }

    if (
      this.sender &&
      this.title &&
      this.description &&
      this.link &&
      this.dltFeedDate
    ) {
      this.faService.insertFeedData(feedData).subscribe((response: any) => {
        console.log('Form submitted:', response)
        if (response.status) {
          alert(response.message)
          this.showSpinner = false
          this.onClear()
        } else {
          alert(response.message)
          this.showSpinner = false
        }
      })
    } else {
      alert('All Fields are Mandatory')
      this.showSpinner = false
    }
  }

  onClear () {
    this.sender = ''
    this.title = ''
    this.description = ''
    this.link = ''
  }
}
