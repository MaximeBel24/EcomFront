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
  searchProductForm!: FormGroup;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    });
  }

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
}
