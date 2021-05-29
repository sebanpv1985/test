import { Component, OnInit } from '@angular/core';
import {
  faSort,
  faFilter,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../environments/environment';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  openItems: any;
  wipItems: any;
  readyItems: any;
  dueItems: any;
  orders = {
    Open: [
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
    WIP: [],
    Ready: [],
    'Payment Due': [],
  };
  totalDue: number = 0;
  currency: string = 'AED';
  faSort = faSort;
  faFilter = faFilter;
  faAngleDown = faAngleDown;
  drop(
    event: CdkDragDrop<
      {
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
      }[]
    >
  ) {
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
  constructor() {}

  ngOnInit(): void {
    this.openItems = this.orders['Open'];
    this.wipItems = this.orders['WIP'];
    this.readyItems = this.orders['Ready'];
    this.dueItems = this.orders['Payment Due'];
    let openDue = this.openItems
      .map((amount: any) => {
        return amount['amountDue'];
      })
      .reduce((item1: any, item2: any) => item1 + item2, 0);
    let wipDue = this.wipItems
      .map((amount: any) => {
        return amount['amountDue'];
      })
      .reduce((item1: any, item2: any) => item1 + item2, 0);
    let readyDue = this.readyItems
      .map((amount: any) => {
        return amount['amountDue'];
      })
      .reduce((item1: any, item2: any) => item1 + item2, 0);
    let paymentDue = this.dueItems
      .map((amount: any) => {
        return amount['amountDue'];
      })
      .reduce((item1: any, item2: any) => item1 + item2, 0);
    this.totalDue = openDue + wipDue + readyDue + paymentDue;
    console.log(this.totalDue);
  }
}
