import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Risk} from '../interfaces';

@Component({
  selector: 'app-risk-editor',
  templateUrl: './app-risk-editor.component.html',
  styleUrls: ['./app-risk-editor.component.scss']
})
export class AppRiskEditorComponent implements OnInit {

  unchangedRisk: Risk;

  @Input() currentRisk: Risk;


  constructor() { }

  ngOnInit(): void {
    this.unchangedRisk = this.currentRisk;
    console.log(this.unchangedRisk);
  }



}
