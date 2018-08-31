import { StaffService } from './../../../services/staff.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';

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

  saleTotal = 0;
  stockTotal = 0;
  orderTotal = 0;

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
    ).subscribe(resp => {
      this.saleTotal = resp[0][0]['total'];
      this.stockTotal = resp[1][0]['total'];
      this.orderTotal = resp[2][0]['total'];

      this.staffTotal = resp[3].length;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
