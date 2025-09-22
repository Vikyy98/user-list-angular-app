import { Component, input, output } from '@angular/core';
import { UserStatistics } from '../user.model';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  selectedStatus = output<string>();
  userStats = input.required<UserStatistics>();

  onToggleStatus() {
    console.log('Status filter clicked');
    console.log((document.getElementById('status') as HTMLSelectElement).value);
    this.selectedStatus.emit(
      (document.getElementById('status') as HTMLSelectElement).value
    );
  }
}
