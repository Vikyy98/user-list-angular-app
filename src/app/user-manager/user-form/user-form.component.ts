import { Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  private userService = inject(UserService);
  name: string = '';
  email: string = '';
  role: string = '';
  status: string = '';

  onSubmit(Form: NgForm) {
    if (Form.invalid) {
      Form.control.markAllAsTouched();
      return;
    }

    this.userService.AddUserToList({
      id: Date.now(),
      name: this.name,
      email: this.email,
      role: this.role,
      status: this.status,
    });
  }
}
