import { Component } from '@angular/core';
import { UserStorageService } from '../services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();
  isCustomerLoggedIn : boolean = UserStorageService.isCustomerLoggedIn();

  constructor(private router : Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(events => {
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
    })
  }

}
