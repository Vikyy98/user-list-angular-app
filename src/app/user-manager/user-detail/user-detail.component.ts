import { Component, effect, input, output, signal } from '@angular/core';
import { User } from '../user.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent {
  selectedUser = input.required<User>();
  updatedUser = output<User>();
  deleteUserID = output<number>();

  id: number = 0;
  name: string = '';
  email: string = '';
  role: string = '';

  constructor() {
    effect(() => {
      if (this.selectedUser()) {
        this.id = this.selectedUser().id;
        this.name = this.selectedUser().name;
        this.email = this.selectedUser().email;
        this.role = this.selectedUser().role;
      }
    });
  }

  deleteUser() {
    this.deleteUserID.emit(this.id);
  }

  onSubmit(Form: NgForm) {
    if (Form.invalid) {
      Form.control.markAllAsTouched();
      return;
    }

    this.updatedUser.emit({
      id: this.selectedUser()?.id as number,
      name: this.name as string,
      email: this.email as string,
      role: this.role as string,
      status: this.selectedUser()?.status as string,
    });
  }
}
