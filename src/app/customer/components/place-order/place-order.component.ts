import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent {

  orderForm!: FormGroup

  constructor(
    private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void{
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null],
    })
  }

  placeOrder(){
    this.customerService.placeOrder(this.orderForm.value).subscribe(res => {
      if(res.id != null){
        this.snackbar.open('Commande passée avec succès', 'Fermer', {
          duration: 5000,
        });
        this.router.navigateByUrl('/customer/my-orders');
        this.closeForm();
      } else {
        this.snackbar.open('Erreur lors de la commande', 'Fermer', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    })
  }

  closeForm(){
    this.dialog.closeAll();
  }

}
