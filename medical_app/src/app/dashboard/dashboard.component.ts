import { Component } from '@angular/core';
import { MedicineService } from '../medicine.service';
import { CartService } from '../cart.service';
import { Router,NavigationExtras } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MedicineDetailsDialogComponent } from '../medicine-details-dialog/medicine-details-dialog.component';
@Component({
  selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent {
  medicines: any[] = [];
  cartItems: any[] = [];
  displayedColumns: string[] = ['medicine_name', 'price', 'content','size','manufacturer_name','gst_percentage','packing_size','actions' ]; // Define columns to display

  constructor(
    private medicineService: MedicineService,
    private cartService: CartService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
  }

  searchMedicines(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.medicineService.searchMedicines(searchTerm).subscribe(
      response => {
        if (response && response.data && response.data.result) {
          this.medicines = response.data.result;
        } else {
          this.medicines = [];
        }
      },
      error => {
        console.error('Error fetching medicines', error);
      }
    );
  }

  viewMedicineDetails(medicineId: string) {
    const body = {
      apikey: 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3',
      medicine_id: medicineId,
      medicine_ids: ["gv0GokYn9w4zFL51eouS2g=="] 
    };

    this.medicineService.getProductDetails(body).subscribe(
      response => {
        if (response.status_code === '1') {
          this.openMedicineDetailsDialog(response.data);
        } else {
          console.error('Medicine details not found');
        }
      },
      error => {
        console.error('Error fetching medicine details', error);
      }
    );
  }

  openMedicineDetailsDialog(medicineData: any): void {
    const dialogRef = this.dialog.open(MedicineDetailsDialogComponent, {
      width: '900px',
      data: medicineData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Medicine detail modal closed');
    });
  }

  addToCart(medicine: any) {
    this.cartService.addToCart(medicine);
  }

  removeFromCart(medicineId: string) {
    this.cartService.removeFromCart(medicineId);
  }

  addToPatient() {
// console.log(this.cartItems,'....................................')
//     const navigationExtras: NavigationExtras = {
//       state:{...this.cartItems}
//     };
    this.router.navigate(['/patientForm'],  { state:{ cartItems:this.cartItems}});
  }
}
