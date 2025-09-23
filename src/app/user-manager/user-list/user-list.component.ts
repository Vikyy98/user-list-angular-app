import { Component, inject, input, output, signal } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  public userService = inject(UserService);

  showUserDetail(userId: number) {
    this.userService.onSelectUser(userId);
  }
}
