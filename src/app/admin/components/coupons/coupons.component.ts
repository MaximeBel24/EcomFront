import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent {

  coupons: any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(){
    this.getCoupons();
  }

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

}
