import { StaffService } from './../../../services/staff.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest, Observable } from 'rxjs';

import { SummarySale } from '../../../models/summary-sales.model';
import { SummaryNewStockService } from './../../../services/summary-new-stock.service';
import { SummarySaleService } from './../../../services/summary-sale.service';
import { SummaryStaffOrdersService } from '../../../services/summary-staff-orders.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit, OnDestroy {

  saleTotal: SummarySale = {};
  stockTotal: SummarySale = {};
  orderTotal: SummarySale = {};

  staffTotal = 0;

  subscription: Subscription;
  ordersTotalSubscription: Subscription;

  constructor(private saleSummaryService: SummarySaleService,
              private stockSummary: SummaryNewStockService,
              private staffService: StaffService,
              private ordersSummary: SummaryStaffOrdersService) { }

  ngOnInit() {
    this.subscription = combineLatest(
      this.saleSummaryService.getSaleSummaryCurrentMonth(),
      this.stockSummary.getStockSummaryCurrentMonth(),
      this.ordersSummary.getOrderSummaryCurrentMonth(),
      this.staffService.getStaffs()
    ).subscribe(([sale, stock, order, staff]) => {
      this.saleTotal = sale;
      this.stockTotal = stock;
      this.orderTotal = order;

      this.staffTotal = staff.length;
    }, error =>  {
      console.log(error);
    });


    // this.subscription =  this.stockSummary.getStockSummaryCurrentMonth().subscribe(resp => console.log(resp));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
