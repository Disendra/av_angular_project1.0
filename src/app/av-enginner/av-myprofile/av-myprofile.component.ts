import { Component, ElementRef, ViewChild } from '@angular/core';
import { Country, State, City } from 'country-state-city';

@Component({
  selector: 'app-av-myprofile',
  templateUrl: './av-myprofile.component.html',
  styleUrls: ['./av-myprofile.component.css']
})
export class AvMyprofileComponent {
  countries = Country.getAllCountries();
  states: any[] = [];
  cities: any[] = [];
  selectedCountry: any;
  selectedState: any;
  selectedCity: any;

  userName : any;
  userEmailId :any;
  countryCode : string = '+91';
  mobileNumber : any;
  dateOfBirth : any;
  gender : any
  jobTitle : any;
  companyName : any;
  location : any;
  adress1 : any;
  address2 : any;
  userCountry : any;
  stateSelected : any;
  citySelected : any;
  zipcode : any;
  
  @ViewChild('country') country!: ElementRef;
  @ViewChild('city') city!: ElementRef;
  @ViewChild('state') state!: ElementRef;

  constructor() {
    console.log(this.countries);
  }







  onGenderChange(selectedGender: string) {
    console.log('Selected Gender:', selectedGender);
  }




  onSubmit() {
    alert(this.countryCode);
  }






























  onCountryChange(event: any) {
    const countryValue = event.target.value;
    if (countryValue) {
        const selectedCountry = JSON.parse(countryValue);
        this.selectedCountry = {
            phonecode: selectedCountry.phonecode,
            name: selectedCountry.name,
            isoCode:selectedCountry.isoCode
         };
        this.states = State.getStatesOfCountry(selectedCountry.isoCode);
        this.selectedState = undefined;
        this.cities = [];
        this.selectedCity = undefined;
    } else {
        this.selectedCountry = undefined;
        this.states = [];
        this.selectedState = undefined;
        this.cities = [];
        this.selectedCity = undefined;
    }
}


  onStateChange(event: any) {
    const stateCode = event.target.value;
    if (stateCode) {
      this.selectedState = JSON.parse(stateCode);
      this.cities = City.getCitiesOfState(this.selectedCountry!.isoCode, this.selectedState!.isoCode);
      this.selectedCity = undefined;
    } else {
      this.selectedState = undefined;
      this.cities = [];
      this.selectedCity = undefined;
    }
  }

  onCityChange(event: any) {
    const cityCode = event.target.value;
    if (cityCode) {
      this.selectedCity = JSON.parse(cityCode);
    } else {
      this.selectedCity = undefined;
    }
  }
}
