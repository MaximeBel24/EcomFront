import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']  // Correction : "styleUrl" -> "styleUrls"
})
export class DashboardComponent implements OnInit {

  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(
    private customerService: CustomerService,
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
    this.products = [];
    this.customerService.getAllProducts().pipe(
      catchError(error => {
        console.error('Error fetching products:', error);
        return of([]); // Return an empty array if there's an error
      })
    ).subscribe(res => {
      res.forEach((element: { processedImg: string; byteImg: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products);
    });
  }    

  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.customerService.getAllProductsByName(title).pipe(
      catchError(error => {
        console.error('Error fetching products by name:', error);
        return of([]); // Return an empty array if there's an error
      })
    ).subscribe(res => {
      res.forEach((element: { processedImg: string; byteImg: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products);
    });
  }

  addToCart(id: any) {
    this.customerService.addToCart(id).pipe(
      catchError(error => {
        console.error('Error adding product to cart:', error);
        let errorMessage = 'Erreur lors de l\'ajout au panier';
        if (error.status === 409) {
          errorMessage = 'Ce produit est déjà dans votre panier.';
        }
        this.snackBar.open(errorMessage, 'Fermer', {
          duration: 5000,
          panelClass: 'error-snackbar'  // You can define a custom style for error messages
        });
        return of(null); // Return a null observable to complete the stream
      })
    ).subscribe(res => {
      if (res) {
        this.snackBar.open('Produit ajouté au panier', 'Fermer', {
          duration: 5000,
        });
      }
    });
  }
}
