import { Component, computed, inject, signal } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { HeaderComponent } from '../header/header.component';
import { User, UserStatistics } from './user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [
    FilterComponent,
    UserDetailComponent,
    UserListComponent,
    UserFormComponent,
    HeaderComponent,
  ],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css',
})
export class UserManagerComponent {
  public userService = inject(UserService);
}
