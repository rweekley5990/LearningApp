import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: any = {};
  usersFromHome = input.required<any>();
  cancelRegister = output<boolean>();

  private accountService = inject(AccountService)

  register(){
    this.accountService.register(this.model).subscribe({
      next: response =>{
        console.log(response)
        this.cancel();
      },

      error: error => console.log(error)
    });
    
    this.model.username = "";
    this.model.password = "";
   
  }

  cancel(){
    this.cancelRegister.emit(false) //value to emit is false
    this.model.username = "";
    this.model.password = "";
  }
}
