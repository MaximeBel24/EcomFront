import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orders: any;

  constructor(
    private adminService : AdminService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.getPlacedOrders();
  }

  getPlacedOrders(){
    this.adminService.getPlacedOrders().subscribe(res => {
      this.orders = res;
    })
  }

  changeOrderStatus(orderId: number, status: string){
    this.adminService.changeOrderStatus(orderId, status).subscribe(res => {
      if(res.id != null){
        this.snackBar.open('Statut de la commande modifié avec succès', 'Fermer', {
          duration: 5000
        });
        this.getPlacedOrders();
      } else {
        this.snackBar.open('Erreur lors de la modification du statut de la commande', 'Fermer', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    })
  }

}
