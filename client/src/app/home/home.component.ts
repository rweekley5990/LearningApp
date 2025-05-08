import { Component, inject, input, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  registerMode = false;
  users: any;
  http = inject(HttpClient);
  accountService = inject(AccountService);
 loggedInUser = localStorage.getItem('user');
 parsedData = this.loggedInUser ? JSON.parse(this.loggedInUser) : "{userName: Null}";
 username = this.parsedData.userName;


  ngOnInit(): void{
    this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Success')
    })
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

}
