import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {

  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  addCategory(): void {
    if (this.categoryForm.valid) {
      this.adminService.addCategory(this.categoryForm.value).subscribe({
        next: (res) => {
          if (res && res.id != null) {
            this.snackBar.open('Catégorie ajoutée avec succès', 'Fermer', {
              duration: 5000
            });
            this.router.navigateByUrl('/admin/dashboard');
          } else {
            this.showError();
          }
        },
        error: () => {
          this.showError();
        }
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  private showError(): void {
    this.snackBar.open('Erreur lors de l\'ajout de la catégorie...', 'Fermer', {
      duration: 5000,
      panelClass: 'error-snackbar'
    });
  }
}
