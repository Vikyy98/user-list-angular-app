import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../user.model';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  name: string = '';
  email: string = '';
  role: string = '';
  status: string = '';
  newUser = output<User>();
  onSubmit(Form: NgForm) {
    if (Form.invalid) {
      Form.control.markAllAsTouched();
      return;
    }
    this.newUser.emit({
      id: Date.now(),
      name: this.name,
      email: this.email,
      role: this.role,
      status: this.status,
    });
  }
}
