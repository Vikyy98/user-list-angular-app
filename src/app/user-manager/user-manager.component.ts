import { Component, computed, signal } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { HeaderComponent } from '../header/header.component';
import { User, UserStatistics } from './user.model';

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
  isShowUserForm = signal(false);
  isToShowUserDetail = signal(false);
  users = signal<User[]>([]);
  filteredStatus = signal<'all' | 'active' | 'inactive'>('all');
  userStats = signal<UserStatistics>({ total: 0, active: 0, inactive: 0 });

  selectedUser = signal<User>({
    id: 0,
    name: '',
    email: '',
    role: '',
    status: '',
  });

  filteredUsers = computed(() => {
    if (this.filteredStatus() === 'all') {
      return this.users();
    } else {
      return this.users().filter(
        (user) => user.status === this.filteredStatus()
      );
    }
  });

  onClickUser($event: number) {
    if ($event === 0) {
      this.isToShowUserDetail.set(false);
      this.isShowUserForm.set(true);
      return;
    } else {
      this.isToShowUserDetail.set(true);
      this.isShowUserForm.set(false);
      this.selectedUser.set(
        this.users().find((user) => user.id === $event) as User
      );
    }
  }

  isToAddUser($event: boolean) {
    this.isShowUserForm.set($event);
    this.isToShowUserDetail.set(false);
  }
  addUserToList($event: User) {
    this.users.update((prev) => [...(prev || []), $event]);
    this.isShowUserForm.set(false);

    const totalUsers = this.users().length;
    const activeUsers = this.users().filter(
      (user) => user.status === 'active'
    ).length;
    const inactiveUsers = totalUsers - activeUsers;
    this.userStats.set({
      total: totalUsers,
      active: activeUsers,
      inactive: inactiveUsers,
    });
  }

  updateUserInList($event: User) {
    this.users.update((prev) =>
      (prev || []).map((user) => (user.id === $event.id ? $event : user))
    );
    this.isToShowUserDetail.set(false);
  }

  deleteUserFromList($event: number) {
    this.users.update((prev) =>
      (prev || []).filter((user) => user.id !== $event)
    );
    this.isToShowUserDetail.set(false);

    const totalUsers = this.users().length;
    const activeUsers = this.users().filter(
      (user) => user.status === 'active'
    ).length;
    const inactiveUsers = totalUsers - activeUsers;
    this.userStats.set({
      total: totalUsers,
      active: activeUsers,
      inactive: inactiveUsers,
    });
  }

  filterUsersByStatus($event: string) {
    this.filteredStatus.set($event as 'all' | 'active' | 'inactive');
    console.log(this.filteredStatus);
  }
}
