import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../service/api.service';
import {
  faSort,
  faFilter,
  faAngleDown,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';

export interface OrderList {
  status: string;
  target: string;
  data: OrderData[];
}
export interface OrderData {
  orderId: number;
  make: string;
  customerName: string;
  invoiceId: string;
  createdBy: string;
  completionDate: string;
  totalAmount: number;
  amountDue: number;
  service: string;
  servicedBy: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  orders: OrderList[] = [];

  totalDue: number = 0;
  currency: string = 'AED';

  faSort = faSort;
  faFilter = faFilter;
  faAngleDown = faAngleDown;
  faSearch = faSearch;

  search = new FormControl('');

  apiSubscription: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.apiCall();

    //Fetch total Due amount after the completion of API subscription
    setTimeout(() => {
      this.orders.map((res: any) => {
        if (Array.isArray(res.data)) {
          res.data.map((data: any) => {
            return (this.totalDue += data.amountDue);
          });
        }
      });
    }, 500);
  }

  ngOnDestroy() {
    this.apiSubscription.unsubscribe();
  }

  apiCall() {
    //Subscribe to orders api
    this.apiSubscription = this.api.getOrders().subscribe((data: any[]) => {
      this.orders = data;
    });
  }

  searchOrders(event: any) {
    //function to search orders based on customer name
    let searchString = event.target.value;
    let backupList = this.orders;
    if (searchString === '') {
      this.apiCall();
    } else {
      this.orders.map((items) => {
        items.data.filter((order, index) => {
          if (order.customerName.toLowerCase().includes(searchString)) {
            items.data.length = 0;
            items.data = [...items.data, order];
          } else {
            items.data.length = 0;
          }
        });
      });
    }
  }

  updateOrderStatus(event: CdkDragDrop<OrderData[]>) {
    //Drag and drop cards sdk utility
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
