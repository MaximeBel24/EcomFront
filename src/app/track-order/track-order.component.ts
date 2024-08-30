import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.scss'
})
export class TrackOrderComponent {

  searchOrderForm!: FormGroup;
  order:any

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.searchOrderForm = this.fb.group({
      trackingId : [null, Validators.required]
    });
  }

  submitForm(){
    this.authService.getOrderByTrackingId(this.searchOrderForm.get('trackingId')?.value).subscribe(res => {
      this.order = res;
    })
  }

}
