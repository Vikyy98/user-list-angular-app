import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { User } from '../user.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent {
  private userService = inject(UserService);

  id: number = 0;
  name: string = '';
  email: string = '';
  role: string = '';

  constructor() {
    effect(() => {
      console.log(this.userService.selectedUser());
      const user = this.userService.selectedUser();
      if (user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
      }
    });
  }

  deleteUser() {
    const selectedUserId = this.userService.selectedUser()?.id;
    if (selectedUserId) {
      this.userService.deleteUserFromList(selectedUserId);
    }
  }

  onSubmit(Form: NgForm) {
    if (Form.invalid) {
      Form.control.markAllAsTouched();
      return;
    }

    const selectedUser = this.userService.selectedUser();
    if (!selectedUser) {
      return;
    }

    this.userService.updateUserInList({
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      status: selectedUser.status,
    });
  }
}
