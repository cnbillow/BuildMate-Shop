import { SummarySaleService } from './../../../services/summary-sale.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  constructor(private saleSummaryService: SummarySaleService) { }

  ngOnInit() {
    this.saleSummaryService.getGivingSummaryCurrentMonth().subscribe(sales => {
      console.log(sales)
    });
  }

}
