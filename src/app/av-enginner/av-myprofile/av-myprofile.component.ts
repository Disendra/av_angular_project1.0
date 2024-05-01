import { DatePipe } from '@angular/common'
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Country, State, City } from 'country-state-city'
import { AuthServiceService } from 'src/app/services/auth-service.service'
import { FaServiceService } from 'src/app/services/fa-service.service'
import { PopupService } from 'src/app/services/popup.service'
import { UserServicesService } from 'src/app/services/user-services.service'

@Component({
  selector: 'app-av-myprofile',
  templateUrl: './av-myprofile.component.html',
  styleUrls: ['./av-myprofile.component.css']
})
export class AvMyprofileComponent implements OnInit {
  countries = Country.getAllCountries()
  states: any[] = []
  cities: any[] = []
  selectedCountry: any
  selectedState: any
  selectedCity: any
  buttonType!: string
  insertionType!: string
  emailId: any
  userName: any
  userEmailId: any
  countryCode: string = '+91'
  mobileNumber!: string;
  dateOfBirth: any
  gender: string | null = null;
  jobTitle: any
  companyName: any
  location: any
  address1: any
  address2: any
  userCountry: string | null = null;
  userState: string | null = null;
  userCity: string | null = null;
  zipcode: any
  message: any
  showSpinner: boolean = false
  @ViewChild('country') country!: ElementRef
  @ViewChild('city') city!: ElementRef
  @ViewChild('state') state!: ElementRef
  @ViewChild('myDialog') myDialog!: TemplateRef<any>

  constructor (
    private dialog: MatDialog,
    private authService: AuthServiceService,
    private datePipe: DatePipe,
    private userService: UserServicesService,
    private popup: PopupService,
    private faService: FaServiceService
  ) {
    this.emailId = authService.getLoggedInEmail()
    console.log(this.countries)
  }
  ngOnInit (): void {
    // throw new Error('Method not implemented.');
    this.getProfile()
  }

  getProfile () {
    this.showSpinner = true
    this.userService.getProfile(this.emailId).subscribe((response: any) => {
      this.showSpinner = false
      console.log(response)
      if (response.records.length !== 0) {
        this.buttonType = 'Update'
        this.insertionType = 'updateProfile'
        const record = response.records[0]
        this.userName = record.userName
        this.userEmailId = record.userEmailId
        this.mobileNumber = record.mobileNumber
        this.dateOfBirth = record.dob
        this.dateOfBirth = this.datePipe.transform(
          this.dateOfBirth,
          'yyyy-MM-dd'
        )
        //  this.dateOfBirth = '2024-01-01';
        this.gender = record.gender
        this.jobTitle = record.jobTitle
        this.companyName = record.companyName
        this.location = record.location
        this.address1 = record.address1
        this.address2 = record.address2
        this.userCountry = record.country
        this.userState = record.state
        this.userCity = record.city
        this.zipcode = record.zipcode
        // Initialize selectedCountry, selectedState, and selectedCity
        const countryEvent = { target: { value: this.userCountry } }
        this.onCountryChange(countryEvent)
        const stateEvent = { target: { value: this.userState } }
        this.onStateChange(stateEvent)
        const cityEvent = { target: { value: this.userCity } }
        this.onCityChange(cityEvent)
      } else {
        this.showSpinner = false
        this.buttonType = 'Save'
        this.insertionType = 'saveProfile'
        console.log('No records found')
        this.userCountry = ''
        this.userState = ''
        this.userCity = ''
      }
    })
  }

  onGenderChange (event: any) {
    this.gender = event.target.value
  }

  onSubmit() {
    if (!this.validateUserName()) {
      return;
  }
    if (!this.validateMobileNumber()) {
      return;
  }
    if (this.userEmailId && !this.validateEmail()) {
      return;
    }
    this.showSpinner = true;
    const profileData = new FormData();
    if (this.emailId) profileData.append('emailId', this.emailId);
    if (this.userName) profileData.append('userName', this.userName);
    if (this.userEmailId) profileData.append('userEmailId', this.userEmailId);
    if (this.mobileNumber) profileData.append('mobileNumber', this.mobileNumber);
    if (this.dateOfBirth) profileData.append('dob', this.dateOfBirth);
    if (this.gender) profileData.append('gender', this.gender);
    if (this.jobTitle) profileData.append('jobTitle', this.jobTitle);
    if (this.companyName) profileData.append('companyName', this.companyName);
    if (this.location) profileData.append('location', this.location);
    if (this.address1) profileData.append('address1', this.address1);
    if (this.address2) profileData.append('address2', this.address2);
    if (this.userCountry) profileData.append('country', this.userCountry);
    if (this.userState) profileData.append('state', this.userState);
    if (this.userCity) profileData.append('city', this.userCity);
    if (this.zipcode) profileData.append('zipcode', this.zipcode);
    if (this.countryCode) profileData.append('stdCode', this.countryCode);
    console.log(profileData);
    if (this.insertionType === 'saveProfile') {
        this.userService.uploadProfile(profileData).subscribe(
            (response: any) => {
                this.showSpinner = false;
                this.message = response.message;
                this.onDialogue();
            },
            (error: any) => {
                this.showSpinner = false;
                console.error('Error occurred while saving profile:', error);
                this.message = 'Error occurred while saving profile';
                this.onDialogue();
            }
        );
    } else {
        this.userService.updateProfile(profileData).subscribe(
            (response: any) => {
                this.showSpinner = false;
                this.message = response.message;
                this.onDialogue();
            },
            (error: any) => {
                this.showSpinner = false;
                console.error('Error occurred while updating profile:', error);
                this.message = 'Error occurred while saving profile';
                this.onDialogue();
            }
        );
    }
}

validateUserName() {
  if (!this.userName) {
      return true;
  }
  if (this.userName.length < 3) {
      alert('Please enter a Name with at least 3 characters');
      return false;
  }
  return true;
}

validateMobileNumber() {
  if (!this.mobileNumber) {
      return true;
  }
  const mobileNumberString = this.mobileNumber.toString();
  if (mobileNumberString.length !== 10) {
      alert('Invalid Mobile Number');
      return false;
  }
  if (/(\d)\1{9}/.test(mobileNumberString)) {
    alert('Mobile number should not have 10 repeating digits');
    return false;
  }
  return true;
}

validateEmail() {
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/;
  if (!emailRegex.test(this.userEmailId)) {
      alert('Please enter a valid email address');
      return false;
  }
  return true;
}


  onCountryChange (event: any) {
    const countryName = event.target.value
    if (countryName) {
      const selectedCountry = this.countries.find(
        country => country.name === countryName
      )
      if (selectedCountry) {
        this.userCountry = selectedCountry.name
        this.selectedCountry = {
          phonecode: selectedCountry.phonecode,
          name: selectedCountry.name,
          isoCode: selectedCountry.isoCode
        }
        this.states = State.getStatesOfCountry(selectedCountry.isoCode)
        this.selectedState = undefined
        this.cities = []
        this.selectedCity = undefined
      }
    } else {
      this.selectedCountry = undefined
      this.states = []
      this.selectedState = undefined
      this.cities = []
      this.selectedCity = undefined
    }
  }

  onStateChange (event: any): void {
    const selectedStateName = event.target.value
    console.log(selectedStateName)
    const selectedState = this.states.find(
      state => state.name === selectedStateName
    )
    if (selectedState) {
      console.log(this.selectedCountry.isoCode, selectedState.isoCode)
      this.cities = City.getCitiesOfState(
        this.selectedCountry.isoCode,
        selectedState.isoCode
      )
    } else {
      console.error('Selected state not found!')
    }
    this.selectedCity = null
  }

  onCityChange (event: any) {
    const cityCode = event.target.value
    if (cityCode) {
      this.selectedCity = JSON.parse(cityCode)
      this.userCity = this.selectedCity.name
    } else {
      this.selectedCity = undefined
    }
  }

  onDialogue () {
    this.popup.openDialogWithTemplateRef(this.myDialog)
  }

  refreshPage () {
    if (!this.validateMobileNumber()) {
      return;
  }
    // Only validate email if it's provided
    if (this.userEmailId && !this.validateEmail()) {
      return;
    }
    else {
    window.location.reload()
    }
  }

  onClear () {
    this.userName = ''
    this.userEmailId = ''
    this.countryCode = '+91'
    this.mobileNumber = ''
    this.dateOfBirth = ''
    this.gender = ''
    this.jobTitle = ''
    this.companyName = ''
    this.location = ''
    this.address1 = ''
    this.address2 = ''
    this.userCountry = ''
    this.userState = ''
    this.userCity = ''
    this.zipcode = ''
  }
}
