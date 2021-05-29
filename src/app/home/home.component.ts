import { Component, OnInit } from '@angular/core';
import {
  faSort,
  faFilter,
  faAngleDown,
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
export class HomeComponent implements OnInit {
  orders: OrderList[] = [];
  totalDue: number = 0;
  currency: string = 'AED';
  faSort = faSort;
  faFilter = faFilter;
  faAngleDown = faAngleDown;
  search = new FormControl('');

  constructor() {
    this.orders = [
      {
        status: 'Open',
        target: 'List1',
        data: [
          {
            orderId: 837,
            make: 'Auris 345 Auris 345Auris 345',
            customerName: 'Ahmed',
            invoiceId: 'KLK-234234-IN',
            createdBy: 'Vidyut',
            completionDate: '28 FEB 2021 02:10PM',
            totalAmount: 799,
            amountDue: 299,
            service: 'washing',
            servicedBy: 'Rashid',
          },
          {
            orderId: 838,
            make: 'Audi A6',
            customerName: 'Danish',
            invoiceId: 'KRM-987348-IN',
            createdBy: 'Advait',
            completionDate: '12 JAN 2021 05:00PM',
            totalAmount: 999,
            amountDue: 499,
            service: 'washing',
            servicedBy: 'Rashid',
          },
        ],
      },
      {
        status: 'WIP',
        target: 'List2',
        data: [
          {
            orderId: 836,
            make: 'Ferrari Testarossa',
            customerName: 'Danish',
            invoiceId: 'KRM-857567-IN',
            createdBy: 'Kale',
            completionDate: '01 JAN 2021 10:00AM',
            totalAmount: 699,
            amountDue: 149,
            service: 'detailing',
            servicedBy: 'Anvar',
          },
        ],
      },
      {
        status: 'Ready',
        target: 'List3',
        data: [
          {
            orderId: 835,
            make: 'Ferrari Testarossa',
            customerName: 'Danish',
            invoiceId: 'KRM-857567-IN',
            createdBy: 'Kale',
            completionDate: '01 JAN 2021 10:00AM',
            totalAmount: 699,
            amountDue: 149,
            service: 'detailing',
            servicedBy: 'Anvar',
          },
        ],
      },
      {
        status: 'Payment Due',
        target: '',
        data: [
          {
            orderId: 834,
            make: 'Ferrari Testarossa',
            customerName: 'Danish',
            invoiceId: 'KRM-857567-IN',
            createdBy: 'Kale',
            completionDate: '01 JAN 2021 10:00AM',
            totalAmount: 699,
            amountDue: 149,
            service: 'detailing',
            servicedBy: 'Anvar',
          },
        ],
      },
    ];
  }

  ngOnInit(): void {
    //Fetch total Due amount
    this.orders.map((res: any, index) => {
      if (Array.isArray(res.data)) {
        res.data.map((data: any) => {
          return (this.totalDue += data.amountDue);
        });
      }
    });
  }
  searchOrders(event: any) {
    let searchString = event.target.value;
    /*let updatedorders = this.orders.filter((order) =>
      {
        if(Array.isArray(order.data)){
          order.data.filter((data) => data.make.toLowerCase().includes(searchString))
        }
      }
    );
    console.log(this.orders);*/
  }

  updateOrderStatus(event: CdkDragDrop<OrderData[]>) {
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
      console.log(this.orders);
    }
  }
}
