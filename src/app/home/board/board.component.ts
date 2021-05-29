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
  dueIndicator: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.dueIndicator = this.order.amountDue === 0 || this.order.amountDue === null ? false : true;
  }
}
