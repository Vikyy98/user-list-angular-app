import { Component, output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isAddUserClicked = output<boolean>();
  AddUser() {
    this.isAddUserClicked.emit(true);
  }
}
