import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit, OnChanges, DoCheck {

  public dataToRender: any = [];
  public country: string = '';
  public cityName: string = '';
  public temp: string = '';
  public feelsLike = null;
  public humidity = null;
  public pressure = null;
  public clouds = null;
  public cloudsDescription: String = '';
  public windSpeed = null;
  public visibility: number = 0;
  public showSun = false;
  public showCloud = false;
  public bgUrl: string = '';
  public city: string = 'new york';
  public unit = 'metric'
  public responseStatus:unknown = undefined;
  constructor(private apiService: ApiService) {

  }


  clickme(inputRef:any) {
    if(inputRef.value !== ''){
      this.city = inputRef.value;
      this.renderData()
      inputRef.value = '';
    }else{
      alert('Enter some City name')
    }

  }
  ngDoCheck() {

  }
  ngOnChanges() {

  }

  ngOnInit(): void {
    this.renderData()
  }

  renderData() {
    this.apiService.getData(this.city, this.unit).subscribe((response) => {
      this.dataToRender = response;
      this.temp = this.dataToRender.main.temp;
      this.feelsLike = this.dataToRender.main.feels_like;
      this.country = this.dataToRender.sys.country;
      this.cityName = this.dataToRender.name;
      this.humidity = this.dataToRender.main.humidity;
      this.pressure = this.dataToRender.main.pressure;
      this.clouds = this.dataToRender.weather[0].main;
      this.cloudsDescription = this.dataToRender.weather[0].description;
      this.windSpeed = this.dataToRender.wind.speed;
      this.visibility = this.dataToRender.visibility / 1000;
      this.responseStatus = this.dataToRender.cod
      // console.log(this.dataToRender,this.responseStatus);

      if (this.clouds == 'Clear') {
        this.showSun = true;
        this.bgUrl = 'https://thumbs.dreamstime.com/b/sun-sunset-mountain-clear-day-mounting-171703509.jpg'
      } else if (this.clouds == "Clouds") {
        this.showSun = false;
        this.bgUrl = 'https://i.ytimg.com/vi/KI15t6nfDiY/maxresdefault.jpg'
      }
    })
  }
}
