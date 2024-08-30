import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {

  productId!: number
  productForm!: FormGroup
  listOfCategories: any = [];

  existingImage: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: any

  imgChanged: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
  
    this.productId = this.activatedRoute.snapshot.params["productId"];

    this.productForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    })

    this.getProductById();
    this.getAllCategories();
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();

    this.imgChanged = true;
    this.existingImage = null;
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  getProductById(){
    this.adminService.getProductById(this.productId).subscribe(res => {
      this.productForm.patchValue(res);

      this.existingImage = 'data:image/jpeg;base64,' + res.byteImg;
    })
  }

  getAllCategories(){
    this.adminService.getAllCategories().subscribe(res => {
      this.listOfCategories = res;
    })
  }

  updateProduct(){
    if(this.productForm.valid){
      const formData = new FormData()

      if(this.imgChanged && this.selectedFile){
        formData.append('img', this.selectedFile)
      }

      formData.append('img', this.selectedFile!)
      formData.append('categoryId', this.productForm.get('categoryId')?.value)
      formData.append('name', this.productForm.get('name')?.value)
      formData.append('description', this.productForm.get('description')?.value)
      formData.append('price', this.productForm.get('price')?.value)

      this.adminService.updateProduct(this.productId,formData).subscribe((res) => {
        if(res.id != null){
          this.snackBar.open('Produit modifier avec succès', 'Fermer', {
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open('Erreur lors de la modification du produit...', 'Fermer', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }}
      );
    
    } else {
      for (const key in this.productForm.controls) {
        this.productForm.controls[key].markAsDirty()
        this.productForm.controls[key].updateValueAndValidity()
      }
    }
  }

}
