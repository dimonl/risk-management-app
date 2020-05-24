import { Component, OnInit } from '@angular/core';
import {RiskService} from '../../shared/services/risk.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './app-control-panel.component.html',
  styleUrls: ['./app-control-panel.component.scss']
})
export class AppControlPanelComponent implements OnInit {

  constructor(private riskService: RiskService) { }

  ngOnInit(): void {
  }

  sortby(sortType: string) {
    this.riskService.sortBy(sortType);
  }
}
