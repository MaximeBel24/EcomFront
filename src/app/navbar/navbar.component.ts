import { Component } from '@angular/core';
import { UserStorageService } from '../services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

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
