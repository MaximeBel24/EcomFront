import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrl: './view-product-detail.component.scss'
})
export class ViewProductDetailComponent {

  productId!: number

  product:any
  FAQS:any[] = []
  reviews:any[] = []

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params["productId"];
    this.getProductDetailsById();
  }

  getProductDetailsById() {
    this.customerService.getProductDetailsById(this.productId).subscribe(res => {
      this.product = res.productDto;
      this.product.processedImg = 'data:image/jpeg;base64,' + this.product.byteImg;

      this.FAQS = res.faqDtoList;
      res.reviewDtoList.array.forEach((element: { processedImg: string; returnedImg: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.reviews.push(element);
      })
    });
  }

  addToWishlist(){
    const wishlistDto = {
      userId: UserStorageService.getUserId(),
      productId: this.productId
    }

    this.customerService.addProductToWishlist(wishlistDto).subscribe(res => {
      if(res.id != null){
        this.snackBar.open('Produit ajouté à la liste de souhaits !', 'Fermer', {
          duration: 5000
        });
      } else {
        this.snackBar.open('Erreur lors de l\'ajout du produit à la liste de souhaits !', 'Fermer', {
          duration: 5000
        });
      }
    });
  }

}
