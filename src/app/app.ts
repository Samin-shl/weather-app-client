import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class App implements OnInit {
  //readonly API_URL = 'https://backend-weather-app-ftg0fdgxhvffa3a3.canadacentral-01.azurewebsites.net/WeatherForecast';
  //readonly API_URL = 'https://localhost:7242/WeatherForecast';
  readonly API_URL = 'https://backend-prod-weather-app-a7g7h6aqaghzaefw.southeastasia-01.azurewebsites.net/WeatherForecast';
  public data: any[] = [];
  
  newForecast = {
    date: new Date().toISOString().split('T')[0],
    temperatureC: 0,
    summary: '' 
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.http.get<any[]>(this.API_URL).subscribe((res: any)=>{
      this.data = res
      this.cdr.detectChanges();
    })
  }

  create() {
    this.http.post(this.API_URL, this.newForecast).subscribe(() => {
      this.refresh(); 
      this.newForecast.summary = ''; 
    });
  }
}