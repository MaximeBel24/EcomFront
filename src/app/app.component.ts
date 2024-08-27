import { Component } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerceFront';

  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();
  isCustomerLoggedIn : boolean = UserStorageService.isCustomerLoggedIn();

  constructor(private router : Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(events => {
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
    })
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigate(['/login']);
  }
}
