import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  // url = 'https://av-nodejs.onrender.com'

  url = 'http://localhost:3000'

  constructor (private http: HttpClient) {}

  getCartData () {
    return this.http.get(`${this.url}/getCartData`)
  }

  getUploadData(emailId: string) {
    return this.http.get<any>(`${this.url}/getUploadData/${emailId}`)
  }

  insertCart (data: FormData) {
    return this.http.post(`${this.url}/insertCart`, data)
  }

  updateCartData(data: FormData) {
    return this.http.post(`${this.url}/updateCart`, data)
  }

  deleteCartData(data : any) {
    return this.http.post(`${this.url}/deleteCartRecords`, data)
  }

  insertFeedback (feedbackData: any) {
    return this.http.post(`${this.url}/insertFeedBack`, feedbackData)
  }

  getFeedBackData () {
    return this.http.get(`${this.url}/getFeedBackData`)
  }
}
