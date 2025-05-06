import { Component, OnInit, OnDestroy, inject} from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {AccountService} from '../_services/account.service'
import {NgIf} from '@angular/common'

@Component({
  selector: 'app-nav',
  imports: [FormsModule, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements OnInit, OnDestroy
{
  utcTime: string = '';
  estTime: string = '';
  private intervalId!: any; //! is the Non-Null operator

  ngOnInit(): void {
    // Initial time update
    this.updateClock(); 
    // Update every second
    this.intervalId = setInterval(() => this.updateClock(), 1000); 
  }

  ngOnDestroy(): void {
    // Stop the timer when the component is destroyed
    clearInterval(this.intervalId); 
  }

  private updateClock(): void {
    const utcDate = new Date();
    const estDate = new Date();


    this.utcTime = this.formatUTCTime(utcDate);
    this.estTime = this.formatLocalTime(estDate);
  }

  private formatLocalTime(date: Date): string {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12; 
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  }


  private formatUTCTime(date: Date): string {
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; 
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  }

    private accountService = inject(AccountService);
    loggedIn = false;
    model: any = {};
    login() {
      this.accountService.login(this.model).subscribe({
        next: response => {
          console.log(response);
          this.loggedIn = true;
        },
        error: error => console.log(error)
      })
    }

    logout(){
      this.loggedIn = false;
    }
}


