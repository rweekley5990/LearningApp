import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  private router = inject(Router);
   private toastr = inject(ToastrService);

  register(){
    this.accountService.register(this.model).subscribe({
      next: response =>{
        console.log(response)
        this.cancel();
      },
      
      error: error => this.toastr.error(error.error) // Show error message if login fails
    });
    
    this.model.username = "";
    this.model.password = "";
    this.router.navigateByUrl('/');
    window.location.reload();
   
  }

  cancel(){
    this.cancelRegister.emit(false) //value to emit is false
    this.model.username = "";
    this.model.password = "";
  }
}
