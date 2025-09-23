import { Component, inject, output } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private userService = inject(UserService);
  AddUser() {
    this.userService.onClickToggleUserForm(true);
  }
}
