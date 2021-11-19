import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit, AfterContentInit,  OnChanges, DoCheck, AfterViewInit, AfterContentChecked {

  public newValue = 'Tbilisi'
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
  public bgSunny:string = 'assets/sun.jpg'
  public bgCloudly:string = 'assets/cloud.jpg'
  public bgRain:string = 'assets/rain.jpg'
  public bgUrl: string = '';
  public city: string = 'new york';
  public unit = 'metric'
  public responseStatus:unknown = undefined;
  public error:any;
  public lon:any   ;
  public lat:any   ;


  constructor(
    private apiService: ApiService,
    ) {
  }
  ngAfterViewInit() {

  }

  fetchData() {
    if(this.newValue !== ''){
      this.renderData()
      this.newValue = ''
      this.error = ''
    }else{
      this.error = 'Enter some City name'
    }
  }
  clearFocus(props:any){
    props.value = ''
  }
  ngAfterContentChecked(){
  }
  ngDoCheck() {
    
  }
  ngAfterContentInit(){
    
    
  }
  ngOnChanges() {
    
  }
  ngOnInit(): void {
    this.renderData()
    
    
    
  }
  renderData() {
    this.apiService.getData(this.newValue, this.unit).subscribe((response) => {
      console.log(response);
      
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
      this.responseStatus = this.dataToRender.cod;
      this.lat = this.dataToRender.coord.lat
      this.lon = this.dataToRender.coord.lon
      console.log('assigning', this.lat);
      console.log('assigning', this.lon);
      
  
      
      if (this.clouds == 'Clear') {
        this.bgUrl = this.bgSunny
      } else if (this.clouds == "Clouds") {
        this.bgUrl = this.bgCloudly
      }else{
        this.bgUrl = this.bgRain
      }
    }, (error) => {
      this.error = error;
    })
  }
  
}
