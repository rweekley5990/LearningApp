import { Component, OnInit, OnDestroy, inject, output} from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {AccountService} from '../_services/account.service'
import {NgIf} from '@angular/common'
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements OnInit, OnDestroy
{
  utcTime: string = '';
  estTime: string = '';
  private intervalId!: any; //! is the Non-Null operator
  private router = inject(Router);

  private toastr = inject(ToastrService);

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

    accountService = inject(AccountService);
    model: any = {};
    login() {
      this.accountService.login(this.model).subscribe({
        next: _ => { //don't need the response, so I changed it to _ it could also just be ()
         void this.router.navigateByUrl('/members'); // Redirect to members page on successful login, can set to void as you don't need the promise
          
        },
        error: error => this.toastr.error(error.error) // Show error message if login fails
      })

      this.model.username = "";
      this.model.password = "";
    }

    logout(){
      this.accountService.logout();
      this.model.username = "";
      this.model.password = "";
      this.router.navigateByUrl('/');
      window.location.reload();
    }
}


