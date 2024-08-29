import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-product-faq',
  templateUrl: './post-product-faq.component.html',
  styleUrl: './post-product-faq.component.scss'
})
export class PostProductFaqComponent {

  productId!: number 
  FAQForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService : AdminService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(){
    this.productId = this.activatedRoute.snapshot.params["productId"];

    this.FAQForm = this.fb.group({
      question: [null, Validators.required],
      answer: [null, Validators.required]
    });
  }

  postFAQ(){
      this.adminService.postFAQ(this.productId, this.FAQForm.value).subscribe(res => {
        if(res.id != null){
          this.snackBar.open('FAQ ajoutée avec succès', 'Fermer', {
            duration: 5000,
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open('Erreur lors de l\'ajout de la FAQ', 'Fermer', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      })
    }
}
