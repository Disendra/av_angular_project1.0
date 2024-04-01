// app-btu-calculator.component.ts

import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { PopupService } from 'src/app/services/popup.service'
@Component({
  selector: 'app-btu-calculator',
  templateUrl: './btu-calculator.component.html',
  styleUrls: ['./btu-calculator.component.css']
})
export class BtuCalculatorComponent implements OnInit {
  showRemoveIcon: boolean = false
  isBtu: boolean = false
  ispowerCal: boolean = false
  isDialogOpen: boolean = false
  dialogRef: any
  qrdata: any
  total: number = 0
  totalPowerCol: number = 0
  thermalTotal: number = 0
  totalkWh: number = 0
  requiredCooling: any
  @Input() toolType: any

  constructor () {}

  btuRows = [
    { company: '', equipment: '', watt: 0 },
    { company: '', equipment: '', watt: 0 }
  ]

  powerCalRows = [
    { equipment: '', current: 0, voltage: 0, watt: 0 },
    { equipment: '', current: 0, voltage: 0, watt: 0 },
    { equipment: '', current: 0, voltage: 0, watt: 0 }
  ]

  getRowClass (index: number): string {
    return index % 2 === 0 ? 'even-row' : 'odd-row'
  }

  addRow (type: any) {
    if (type === 'isBtu') {
      this.btuRows.push({ company: '', equipment: '', watt: 0 })
      this.calculateTotalWatt()
    } else if (type === 'isPowercal') {
      this.powerCalRows.push({ equipment: '', current: 0, voltage: 0, watt: 0 })
    }
    this.showRemoveIcon = true
  }

  removeRow () {
    if (this.btuRows.length > 1 || this.powerCalRows.length > 1) {
      this.btuRows.pop()
      this.powerCalRows.pop()
      this.calculateTotalWatt()
    } else {
      this.showRemoveIcon = false
    }
  }

  refreshValues () {
    this.btuRows.forEach(row => {
      row.company = ''
      row.equipment = ''
      row.watt = 0
    })
    this.powerCalRows.forEach(row => {
      row.equipment = ''
      row.watt = 0
      row.voltage = 0
      row.current = 0
    })

    this.btuRows = [
      { company: '', equipment: '', watt: 0 },
      { company: '', equipment: '', watt: 0 }
    ]

    this.powerCalRows = [
      { equipment: '', current: 0, voltage: 0, watt: 0 },
      { equipment: '', current: 0, voltage: 0, watt: 0 },
      { equipment: '', current: 0, voltage: 0, watt: 0 }
    ]
    this.thermalTotal = 0
    this.total = 0
    this.requiredCooling = 0
    this.totalkWh = 0
    this.totalPowerCol = 0
  }

  calculateTotalWatt () {
    this.totalPowerCol = this.powerCalRows.reduce((sum, row) => {
      // Calculate the wattage for each row
      row.watt = row.current * row.voltage
      return sum + Number(row.watt)
    }, 0)

    this.total = this.btuRows.reduce((sum, row) => sum + Number(row.watt), 0)
    // this.watts =
    this.totalPowerCol = this.powerCalRows.reduce(
      (sum, row) => sum + Number(row.watt),
      0
    )
    this.totalkWh = this.totalPowerCol / 1000
    this.thermalTotal = this.total * 3.4
    this.requiredCooling = this.thermalTotal / 12000
  }

  ngOnInit (): void {
    this.handleMessageChange()
    this.calculateTotalWatt()
  }

  handleMessageChange () {
    this.isBtu = this.toolType === 'btu'
    this.ispowerCal = this.toolType === 'ispowerCal'
  }

  downloadReport (option: any) {
    var fileName: any
    var header: any
    if (option === 'btu') {
      fileName = 'btu-Calculator.pdf'
      header = 'Thermal Dissipation Details'
    } else if (option === 'powerCal') {
      fileName = 'Power-Calculator.pdf'
      header = ' AV rack UPS power requirement'
    }
    const element = document.getElementById('pdfContent')

    if (element) {
      const options = {
        ignoreElements: (element: { id: string }) => element.id === 'icons'
      }

      html2canvas(element, options).then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF()
        const imgWidth = 200
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const xPosition = (pageWidth - imgWidth) / 2
        let yPosition = 10

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

        yPosition += 15

        const borderOffset = 4

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
