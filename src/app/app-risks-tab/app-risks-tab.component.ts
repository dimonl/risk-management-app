import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Risk} from '../interfaces';

@Component({
  selector: 'app-risks-tab',
  templateUrl: './app-risks-tab.component.html',
  styleUrls: ['./app-risks-tab.component.scss']
})
export class AppRisksTabComponent implements OnInit {

  selectedRisk: Risk;
  @Input() userRisks: Risk[];
  @Output() messageEvent = new EventEmitter<Risk>();

  constructor() {
  }

  ngOnInit(): void {
    this.userRisks = [
      {
        id: '1',
        userID: '1',
        nameRisk: 'first risk',
        description: 'its a holiday',
        impactTime: 12,
        probability: 0.5,
      },
      {
        id: '2',
        userID: '1',
        nameRisk: 'sec risk',
        description: 'its a holiday',
        impactTime: 11,
        probability: 0.7,
      },
      ];
  }


  onSelect(risk: Risk) {
    this.selectedRisk = risk;
    this.messageEvent.emit(this.selectedRisk);
  }
}
