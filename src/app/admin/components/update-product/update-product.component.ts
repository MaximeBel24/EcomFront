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
      category: [null, [Validators.required]],
    })

    this.getProductById();
    this.getAllCategories();
  }

  getProductById(){
    this.adminService.getProductById(this.productId).subscribe(res => {
      this.productForm.patchValue(res);
    })
  }

  getAllCategories(){
    this.adminService.getAllCategories().subscribe(res => {
      this.listOfCategories = res;
    })
  }

  updateProduct(){

  }

}
