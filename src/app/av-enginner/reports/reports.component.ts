import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { FaServiceService } from 'src/app/services/fa-service.service'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  isSpl: boolean = false
  showSPL: boolean = false
  isMacFinder: boolean = false
  showSpinner: boolean = false
  startingSPL: any
  distanceInFeet: any
  calculatedSPL: any
  sysAddress: any
  sumOfSpl: any
  getVendorData: any[] = []
  SplMeters: number[] = []
  @Input() toolType: any

  meters: number[] = []
  spl: number[] = Array(12).fill(0)
  feet: number[] = []

  constructor (private faService: FaServiceService) {
    this.generateValues()
  }

  generateValues (): void {
    for (let i = 1; i <= 2048; i *= 2) {
      this.meters.push(i)
    }

    for (let i = 3.3; i <= 6759; i *= 2) {
      this.feet.push(i)
    }
  }

  totalSPL () {
    let count = 0
    for (let i = this.startingSPL; i >= 0 && count < 12; i -= 6) {
      this.spl[count] = i
      count++
    }

    this.showSPL = true
    this.calculateSPL()
    this.sumOfSpl = Math.floor(
      20 * Math.log(this.distanceInFeet / this.calculatedSPL)
    )
    // this.sumOfSpl = Math.log(3.3/this.distanceInFeet)*20+this.calculatedSPL;
  }

  calculateSPL (): void {
    const closestSPL = this.findClosestSPL(this.startingSPL)
    const index = this.spl.indexOf(closestSPL)

    if (index !== -1 && index < this.meters.length) {
      this.calculatedSPL = this.meters[index]
    } else {
      console.error('SPL value not found or index out of bounds')
    }
  }

  findClosestSPL (targetSPL: number): number {
    let closestSPL = this.spl[0]

    for (const spl of this.spl) {
      if (Math.abs(spl - targetSPL) < Math.abs(closestSPL - targetSPL)) {
        closestSPL = spl
      }
    }

    return closestSPL
  }

  ngOnInit (): void {
    // throw new Error('Method not implemented.');
    this.handleMessageChange()
  }

  getRowClass (index: number): string {
    return index % 2 === 0 ? 'even-row' : 'odd-row'
  }

  getVendor (sysAddress: any) {
    this.showSpinner = true
    this.faService.getMacData(sysAddress).subscribe((response: any) => {
      this.showSpinner = false
      console.log(response)
      this.getVendorData = response
      console.log(this.getVendorData)
    })
  }

  handleMessageChange () {
    this.isSpl = this.toolType === 'isSpl'
    this.isMacFinder = this.toolType === 'macFinder'
    // this.isCard = this.toolType === 'isCard'
    // this.ispowerCal = this.toolType === 'ispowerCal'
  }

  downloadReport (option: any) {
    var fileName: any
    var header: any
    if (option === 'btu') {
      fileName = 'btu-Calculator.pdf'
      header = 'Btu-Calculator'
    } else if (option === 'powerCal') {
      fileName = 'Power-Calculator.pdf'
      header = 'Power-Calculator'
    }
    const element = document.getElementById('pdfContent')

    if (element) {
      const options = {
        ignoreElements: (element: { id: string }) => element.id === 'icons'
      }

      html2canvas(element, options).then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF()
        const imgWidth = 150
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const xPosition = (pageWidth - imgWidth) / 2
        let yPosition = 18

        const headerText = header
        const fontSize = 15
        const fontWeight = 'normal'
        const headerTextWidth =
          (pdf.getStringUnitWidth(headerText) * fontSize) /
          pdf.internal.scaleFactor
        const headerXPosition = (pageWidth - headerTextWidth) / 2
        const headerYPosition = yPosition + 2

        pdf.setFont('helvetica', fontWeight)
        pdf.text(headerText, headerXPosition, headerYPosition)
        pdf.setTextColor(0)
        pdf.setFont('helvetica', 'normal')

        yPosition += 20

        const borderOffset = 10

        pdf.setDrawColor(0, 0, 0)
        pdf.setLineWidth(0.5)
        pdf.rect(
          borderOffset,
          borderOffset,
          pageWidth - 2 * borderOffset,
          pageHeight - 2 * borderOffset,
          'S'
        )

        pdf.addImage(imgData, 'PNG', xPosition, yPosition, imgWidth, imgHeight)
        pdf.save(fileName)
      })
    } else {
      console.error("Element with id 'pdfContent' not found.")
    }
  }
}
