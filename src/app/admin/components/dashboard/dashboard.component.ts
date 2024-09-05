import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: any[] = [];
  coupons: any;
  orders: any;
  users: any;
  categories: any;
  

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.getCoupons();
    this.getPlacedOrders();
  }

  // PRODUCTS

  getAllProducts() {
    this.adminService.getAllProducts().subscribe(res => {
      this.products = res;
    });
  } 

  deleteProduct(productId: any) {
    this.adminService.deleteProduct(productId).pipe(
      catchError(error => {
        console.error('Error deleting product:', error);
        this.snackBar.open('Erreur lors de la suppression du produit', 'Fermer', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
        return of(null); // Return null if there's an error
      })
    ).subscribe(res => {
      if (res === null || (res && res.body === null)) {
        this.snackBar.open('Produit supprimé avec succès', 'Fermer', {
          duration: 5000,
        });
        this.getAllProducts();
      } else {
        this.snackBar.open('Erreur lors de la suppression du produit', 'Fermer', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }

  // CATEGORIES

  getAllCategories(): void {
    this.adminService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
  }

  // COUPONS

  getCoupons(){
    this.adminService.getCoupons().subscribe(res =>{
      this.coupons = res;
    })
  }

  deleteCoupon(couponId: any){
    this.adminService.deleteCoupon(couponId).pipe(
      catchError(error => {
        console.error('Error deleting coupon:', error);
        return of(null);
      })
    ).subscribe(res => {
      if (res === null || (res && res.body === null)) {
        this.snackBar.open('Coupon supprimé avec succès', 'Fermer', {
          duration: 5000,
        });
        this.getCoupons();
      } else {
        this.snackBar.open('Erreur lors de la suppression du coupon', 'Fermer', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }

  // ORDERS


  getPlacedOrders(){
    this.adminService.getPlacedOrders().subscribe(res => {
      this.orders = res;
    })
  }

  changeOrderStatus(orderId: number, status: string){
    this.adminService.changeOrderStatus(orderId, status).subscribe(res => {
      if(res.id != null){
        this.snackBar.open('Statut de la commande modifié avec succès', 'Fermer', {
          duration: 5000
        });
        this.getPlacedOrders();
      } else {
        this.snackBar.open('Erreur lors de la modification du statut de la commande', 'Fermer', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    })
  }
}
