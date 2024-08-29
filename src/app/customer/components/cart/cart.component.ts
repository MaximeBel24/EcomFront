import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'console';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartItems: any[] = [];
  order: any;

  couponForm!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit():void {
    this.couponForm = this.fb.group({
      code: [null, [Validators.required]]
    })
    this.getCart();
  }

  applyCoupon(){
    this.customerService.applyCoupon(this.couponForm.value.code).subscribe(res => {
      this.snackbar.open("Bon de réduction appliqué avec succès", "Fermer", {
        duration: 5000
      });
      this.getCart();
    },error => {
      this.snackbar.open("Code de réduction invalide", "Fermer", {
        duration: 5000
      });
    })
  } 

  getCart(){
    this.cartItems = [];
    this.customerService.getCartByUserId().subscribe(res => {
      this.order = res;
      res.cartItems.forEach((element: { processedImg: string; returnedImg: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cartItems.push(element);
      });
    })
  }

  increaseQuantity(productId: any){
    this.customerService.increaseProductQuantity(productId).subscribe(res => {
      this.snackbar.open("Quantité augmentée avec succès", "Fermer", {duration: 5000});
      this.getCart();
    })
  }

  decreaseQuantity(productId: any){
    this.customerService.decreaseProductQuantity(productId).subscribe(res => {
      this.snackbar.open("Quantité diminuée avec succès", "Fermer", {duration: 5000});
      this.getCart();
    })
  }
}
