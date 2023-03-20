import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { throwError, Observable } from 'rxjs';
import {GlobalConstants} from '../global-constants';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }
  base_url: string = GlobalConstants.backend_url;
  getImgNames(ind: any): Observable<any> {
    let url = this.base_url +'getnames/';
    const headers = { 'Content-Type': 'text/plain' };
    return this.http.post<any[]>(url, ind , {headers}).pipe(
      tap(data => {
        console.log(data.length);
      }));
  }
  getUserPatterns(): Observable<any> {
    console.log("in ")
    let url = this.base_url +'getuserrelease1/';
    return this.http.get<string>(url).pipe(
      tap(response => {}));
  }
  getImg(img_name: string): Promise<Blob> {
    let url = this.base_url +"getimage/"+img_name+'/';
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  postResults(data: any): Observable<any> {
    console.log('count 1 in postresults')
    let url = this.base_url +'postresults/';
    const headers = { 'Content-Type': 'text/plain' };
    return this.http.post<any[]>(url, data ,{ headers }).pipe(
      tap(response => {
        console.log(response);
      }));
  }
  getImagesCount(): Observable<any> {
    let url = this.base_url +'getimagepairscount/';
    return this.http.get<any[]>(url).pipe(
      tap(response => {
        console.log('Count received');
      }));
  }
  private handleError(err: HttpErrorResponse){
    console.log(err);
    return throwError('Error');
  }
}
