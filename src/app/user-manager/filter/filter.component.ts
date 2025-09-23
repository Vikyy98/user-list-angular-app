import { Component, inject, input, output } from '@angular/core';
import { UserStatistics } from '../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  private userService = inject(UserService);

  public get userStats(): UserStatistics {
    return this.userService.userStats();
  }

  onToggleStatus() {
    this.userService.onFilterStatusChange(
      (document.getElementById('status') as HTMLSelectElement).value as
        | 'all'
        | 'active'
        | 'inactive'
    );
  }
}
