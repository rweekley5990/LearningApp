import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements OnInit, OnDestroy
{
  utcTime: string = '';
  estTime: string = '';
  private intervalId!: any;

  ngOnInit(): void {
    this.updateClock(); // Initial time update
    this.intervalId = setInterval(() => this.updateClock(), 1000); // Update every second
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Stop the timer when the component is destroyed
  }

  private updateClock(): void {
    const utcDate = new Date();
    const estDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));

    this.utcTime = utcDate.toUTCString();  // Ensures correct UTC display
   

    this.utcTime = this.formatUTCTime(utcDate);
    this.estTime = this.formatLocalTime(estDate);
  }

  private formatLocalTime(date: Date): string {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  }


  private formatUTCTime(date: Date): string {
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  }

}


