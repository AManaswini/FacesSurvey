import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { throwError, Observable } from 'rxjs';
import {GlobalConstants} from '../global-constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  base_url: string = GlobalConstants.backend_url;
  getSurveyCount(): Observable<any> {
    let url = this.base_url +'getsurveycount/';
    return this.http.get<any[]>(url).pipe(
      tap(data => {
        console.log('Survey Data Received');
      }));
  }
  getSurveyJson(): Observable<any> {
    let url = this.base_url +'getsurveyjson/';
    return this.http.get<any[]>(url).pipe(
      tap(data => {
        console.log('Survey Data Received');
      }));
  }
  getSurveyHits(): Observable<any> {
    let url = this.base_url +'getsurveyhits/';
    return this.http.get<any[]>(url).pipe(
      tap(data => {
        console.log('Survey Hits Received');
      }));
  }
  updateImages(): Observable<any> {
    let url = this.base_url +'updateimg/';
    return this.http.get<any[]>(url).pipe(
      tap(data => {
        console.log('Img updates Received');
      }));
  }
  updateCSV(): Observable<any> {
    let url = this.base_url +'updatecsv/';
    return this.http.get<any[]>(url).pipe(
      tap(data => {
        console.log('Img CSV Received');
      }));
  }
  downloadSurveys(): Observable<any> {
    let url = this.base_url +'getsurveyresults/';
    return this.http.get<Blob>(url, {observe: 'response', responseType: 'blob' as 'json'})
  }
  downloadSurveysRelease1(): Observable<any> {
    let url = this.base_url +'getresultsrelease1/';
    return this.http.get<Blob>(url, {observe: 'response', responseType: 'blob' as 'json'})
  }
  downloadSurveysRelease(id: string): Observable<any> {
    let url = this.base_url +'getresultsallrelease/'+id+'/';
    return this.http.get<Blob>(url, {observe: 'response', responseType: 'blob' as 'json'})
  }
  
}
