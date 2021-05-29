import { Component, OnInit, Input } from '@angular/core';
import { faCar, faUser, faPaperclip } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() order: any;
  faCar = faCar;
  faUser = faUser;
  faPaperclip = faPaperclip;
  orderId: number = 0;
  make: string = '';
  customerName: string = '';
  invoiceId: string = '';
  createdBy: string = '';
  completionDate: string = '';
  totalAmount: number = 0;
  amountDue: number = 0;
  service: string = '';
  servicedBy: string = '';
  constructor() {}

  ngOnInit(): void {
    this.orderId = this.order['orderId'];
    this.make = this.order['make'];
    this.customerName = this.order['customerName'];
    this.invoiceId = this.order['invoiceId'];
    this.createdBy = this.order['createdBy'];
    this.completionDate = this.order['completionDate'];
    this.totalAmount = this.order['totalAmount'];
    this.amountDue = this.order['amountDue'];
  }
}
