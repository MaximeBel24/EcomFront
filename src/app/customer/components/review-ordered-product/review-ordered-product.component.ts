import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-review-ordered-product',
  templateUrl: './review-ordered-product.component.html',
  styleUrl: './review-ordered-product.component.scss'
})
export class ReviewOrderedProductComponent {

  productId!: number
  reviewForm!: FormGroup

  selectedFile: File | null = null
  imagePreview: string | ArrayBuffer | null = null

  constructor(
    private fb : FormBuilder,
    private router : Router,
    private snackBar : MatSnackBar,
    private customerService : CustomerService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params["productId"];
    this.reviewForm = this.fb.group({
      rating: [null, Validators.required],
      description: [null, Validators.required],
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile!);
  }

  submitForm(){
    const formData: FormData = new FormData();

    formData.append('img', this.selectedFile!);
    formData.append('productId', this.productId.toString());
    formData.append('userId', UserStorageService.getUserId());
    formData.append('rating', this.reviewForm.get('rating')?.value);
    formData.append('description', this.reviewForm.get('description')?.value);

    this.customerService.giveReview(formData).subscribe(res => {
      this.snackBar.open('Avis poster avec succès !', 'Fermer', {
        duration: 5000,
      });
      this.router.navigateByUrl('/customer/my_orders');
    }, err => {
      this.snackBar.open(err.error.message, 'Erreur', {
        duration: 5000,
      });
    })
  }

}
