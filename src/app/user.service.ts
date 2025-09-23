import { computed, Injectable, signal } from '@angular/core';
import { User, UserStatistics } from './user-manager/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users = signal<User[]>([]);
  isShowUserForm = signal(false);
  isToShowUserDetail = signal(false);
  userStats = signal<UserStatistics>({ total: 0, active: 0, inactive: 0 });
  selectedUserId = signal<number>(0);
  filterStatus = signal<'all' | 'active' | 'inactive'>('all');

  selectedUser = computed(() => {
    return this.users().find((user) => user.id === this.selectedUserId());
  });

  filteredUsers = computed(() => {
    if (this.filterStatus() === 'all') {
      return this.users();
    } else {
      return this.users().filter((user) => user.status === this.filterStatus());
    }
  });

  AddUserToList(userDetail: User) {
    this.users.update((users) => [...users, userDetail]);
    this.updateUserStats();
    this.isShowUserForm.set(false);
  }

  onClickToggleUserForm(showForm: boolean) {
    this.isShowUserForm.set(showForm);
    this.isToShowUserDetail.set(false);
  }

  onClickUserDetail(showDetail: boolean) {
    this.isToShowUserDetail.set(showDetail);
    this.isShowUserForm.set(false);
  }

  updateUserInList(updatedUser: User) {
    this.users.update((prev) =>
      (prev || []).map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );

    this.isToShowUserDetail.set(false);
  }

  deleteUserFromList(userId: number) {
    this.users.update((prev) =>
      (prev || []).filter((user) => user.id !== userId)
    );
    this.isToShowUserDetail.set(false);
    this.updateUserStats();
  }

  updateUserStats() {
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

  onSelectUser(userId: number) {
    this.isToShowUserDetail.set(true);
    this.isShowUserForm.set(false);
    this.selectedUserId.set(userId);
  }

  onFilterStatusChange(status: 'all' | 'active' | 'inactive') {
    this.filterStatus.set(status);
  }
}
