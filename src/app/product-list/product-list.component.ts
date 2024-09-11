import { Component } from '@angular/core';
import { PublicService } from '../services/public/public.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  categories : any;
  products: any;

  constructor(
    private publicService: PublicService
  ) {}

  getProductByCategory(categoryId: number) {
    this.publicService.getProductsByCategoryId(categoryId).subscribe(res => {
      this.products = res;
    });
  }

}
