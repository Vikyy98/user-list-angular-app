import { Component, input, output, signal } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  userList = input<User[]>([]);
  isShowUserDetail = output<number>();
  showUserDetail(userId: number) {
    this.isShowUserDetail.emit(userId);
    console.log(userId);
  }
}
