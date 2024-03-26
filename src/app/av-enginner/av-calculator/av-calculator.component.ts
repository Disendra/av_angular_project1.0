import { Component } from '@angular/core'

@Component({
  selector: 'app-av-calculator',
  templateUrl: './av-calculator.component.html',
  styleUrls: ['./av-calculator.component.css']
})
export class AvCalculatorComponent {
  isSimulator: boolean = false;
  isBtu: boolean = false;
  isBtuCalculator: boolean = false;
  isBussinessCard: boolean = false;
  isReports  : boolean = false;
  ispowerCal : boolean = false;
  isSpl : boolean = false;
  isMacFinder : boolean = false
  cards: boolean = true;
  toolType: string = '';

  constructor () {
  }

  onClick (type: any) {
    this.toolType = type;
    this.isSimulator = this.toolType === 'quatation'
    this.isBtuCalculator = this.toolType === 'btu'
    this.isBussinessCard = this.toolType === 'isCard'
    this.cards = this.toolType === 'cards';
    this.isReports = this.toolType === 'reports';
    this.ispowerCal = this.toolType === 'ispowerCal';
    this.isSpl = this.toolType === 'isSpl';
    this.isMacFinder = this.toolType === 'macFinder';
  }
}
