import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService   {
  public baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';

  public apiKey = '&appid=199bb0bc7d6bd7b088d548a4f1ad0bbe';
  public units = '&units='
  constructor(private http:HttpClient) {
  }
  getData(city : string, unit : string ) : Observable<any> {
    // console.log('init');
    return this.http.get(this.baseURL+city+this.apiKey+this.units+unit)
    return this.http.get('${city}&appid=&units=metric')
    
  }

  
}
