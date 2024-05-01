import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  //  url = 'http://localhost:3000'
  // url = 'http:10.0.0.68:3000';
  // url = 'http://10.0.0.68:3000'
  url = 'https://av-nodejs.onrender.com'

  constructor (private http: HttpClient) {}

  private refreshData$ = new Subject<void>();

  getCommunityQuestions(limit: number, offset: number, searchQuery: string) {
    let queryParams = `limit=${limit}&offset=${offset}`;
    if (searchQuery) {
      queryParams += `&searchQuery=${searchQuery}`;
    }
    return this.http.get<any>(`${this.url}/getCommunityQuestions?${queryParams}`);
  }
   
  getMoreCommunityAnswers(qId: any) {
    return this.http.get<any>(`${this.url}/getMoreCommunityAnswers/${qId}`);
  }
  

}
