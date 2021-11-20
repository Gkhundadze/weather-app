import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService   {
  public baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  public daily = 'https://pro.openweathermap.org/data/2.5/forecast/climate?q=tbilisi&appid=6833225cbb133d1530f0575b63838fcf'
  public apiKey = '&appid=199bb0bc7d6bd7b088d548a4f1ad0bbe';
  public units = '&units='
  constructor(private http:HttpClient) {
  }
  getData(city : string, unit : string ) : Observable<any> {
    // console.log(this.baseURL+city+this.apiKey+this.units+unit);
    return this.http.get<any>(this.baseURL+city+this.apiKey+this.units+unit).pipe(catchError(this.handleError))
  }
  handleError(error:any){
    return throwError(error.error.message)
  }
  
}
