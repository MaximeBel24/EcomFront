import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-view-ordered-products',
  templateUrl: './view-ordered-products.component.html',
  styleUrl: './view-ordered-products.component.scss'
})
export class ViewOrderedProductsComponent {

  orderId: any 
  orderedProductsDetailsList: any[] = [];
  totalAmount:any

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params["orderId"];
    this.getOrderedProductsDetailsByOrderId();
  }

  getOrderedProductsDetailsByOrderId() {
    this.customerService.getOrderedProducts(this.orderId).subscribe(res => {
      res.productDtoList.forEach((element: { processedImg: string; byteImg: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.orderedProductsDetailsList.push(element);
      });
      this.totalAmount = res.orderAmount;
    });
  }

}
