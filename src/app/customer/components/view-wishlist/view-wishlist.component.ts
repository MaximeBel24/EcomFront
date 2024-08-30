import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrl: './view-wishlist.component.scss'
})
export class ViewWishlistComponent {

  products = [];

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getWishlistByUserId();
  }

  getWishlistByUserId() {
    // this.customerService.getWishlistByUserId().subscribe(res => {
    //   res.forEach((element: { processedImg: string; returnedImg: string; }) => {
    //     element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
    //     this.products.push(element);
    //   });
    // });
  }
}
