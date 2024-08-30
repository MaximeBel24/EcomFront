import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent {

  productForm!: FormGroup;
  listOfCategories: any = [];
  selectedFile!: File | null;
  imagePreview!: string | ArrayBuffer | null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile!);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });

    this.getAllCategories();
  }

  getAllCategories(): void {
    this.adminService.getAllCategories().subscribe(res => {
      this.listOfCategories = res;
    });
  }

  addProduct(): void {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('img', this.selectedFile!);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);

      this.adminService.addProduct(formData).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Produit ajouté avec succès', 'Fermer', {
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open('Erreur lors de l\'ajout du produit...', 'Fermer', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      });
    } else {
      for (const key in this.productForm.controls) {
        this.productForm.controls[key].markAsTouched();
        this.productForm.controls[key].updateValueAndValidity();
      }
      if (!this.selectedFile) {
        this.snackBar.open('Veuillez choisir une image pour le produit.', 'Fermer', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    }
  }
}
