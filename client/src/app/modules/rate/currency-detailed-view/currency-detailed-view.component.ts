import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-currency-detailed-view',
  templateUrl: './currency-detailed-view.component.html',
  styleUrls: ['./currency-detailed-view.component.scss']
})
export class CurrencyDetailedViewComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
  }

}
