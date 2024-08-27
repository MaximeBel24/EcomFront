import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  hidePassword = true;

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private snackBar : MatSnackBar,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  // fix : 1h 14min

  onSubmit(): void {
    const username = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(username, password).subscribe(
      (res) =>{
        this.snackBar.open('Connexion réussie', 'OK', {
          duration: 5000
        });
        this.router.navigate(['/']);
      },
      (error) => {
        this.snackBar.open('Nom d\'utilisateur ou mot de passe invalide', 'ERREUR', {
          duration: 5000
        });
      }
    );
  } 
}
