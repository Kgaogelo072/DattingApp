import { Component, EventEmitter, inject, input, output,  signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // corrected key
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  cancelRegister = output<boolean>();
  showPassword = false;
  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => this.toastr.error(error.error)
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  cancel() {
    this.cancelRegister.emit(false)
  }
}
