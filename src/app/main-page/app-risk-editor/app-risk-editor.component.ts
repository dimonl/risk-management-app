import {Component, OnInit} from '@angular/core';
import {Risk} from '../../shared/interfaces';
import {RiskService} from '../../shared/services/risk.service';
import {CALC_FIELDS, emptyRisk, newRisk, STORAGE_SAVED_TYPES} from '../../shared/const';


@Component({
  selector: 'app-risk-editor',
  templateUrl: './app-risk-editor.component.html',
  styleUrls: ['./app-risk-editor.component.scss']
})
export class AppRiskEditorComponent implements OnInit {

  public currentRisk: Risk;
  public changedRisk: Risk = null;

  public manageRisk = false;
  public minProbability: number;
  public minImpactTime: number;
  public maxProbability: number;
  public maxImpactTime: number;
  public errorProbability: string;
  public errorImpactTime: string;

  constructor(private riskService: RiskService) {
  }

  ngOnInit(): void {

    this.riskService.getSelectedRisk().subscribe((el: Risk) => {
      this.changedRisk = JSON.parse(JSON.stringify(el));
      this.currentRisk = el;
    });
    this.riskService.manageRisks.subscribe(el => this.manageRisk = el);
  }


  onReset(): void {
    this.riskService.setSelectedRisk(this.currentRisk);
    this.maxImpactTime = 0;
    this.minImpactTime = 0;
    this.maxProbability = 0;
    this.minProbability = 0;
    this.errorProbability = '';
    this.errorImpactTime = '';
  }

  onApply(): void {
    if ((this.changedRisk.id === newRisk.id) && (this.manageRisk)) {
      console.log(this.changedRisk);
      console.log(this.currentRisk);
      this.changedRisk.userID = localStorage.getItem(STORAGE_SAVED_TYPES.id);
      this.riskService.addNewRisk(this.changedRisk).subscribe(
        (data: Risk) => {
          this.riskService.getRisks();
        },
        error => console.log(error)
      );
    } else if (!this.manageRisk) {
      this.riskService.updateSelectedRisk(this.changedRisk).subscribe(
        (data: Risk) => {
          this.riskService.getRisks();
        },
        error => console.log(error)
      );
    }
    this.riskService.setSelectedRisk(emptyRisk);
  }

  onRemove(): void {
    this.riskService.deleteSelectedRisk(this.currentRisk).subscribe(
      (data: Risk) => {
        this.riskService.getRisks();
      },
      error => console.log(error)
    );
    this.riskService.setSelectedRisk(emptyRisk);
  }

  onFieldChange(field: string): void {
    switch (field) {
      case CALC_FIELDS.probability:
        this.minProbability = 0;
        this.maxProbability = 0;
        this.errorProbability = '';
        this.errorImpactTime = '';
        break;
      case CALC_FIELDS.impactTime:
        this.minImpactTime = 0;
        this.maxImpactTime = 0;
        this.errorImpactTime = '';
        this.errorImpactTime = '';
        break;
      case CALC_FIELDS.min_probability:
        if (this.minProbability > this.maxProbability) {
          this.errorProbability = CALC_FIELDS.max_probability;
        }else{
          this.errorProbability = '';
          this.changedRisk.probability = (this.minProbability + this.maxProbability) / 2;
        }
        break;
      case CALC_FIELDS.max_probability:
        if (this.maxProbability < this.minProbability) {
          this.errorProbability = CALC_FIELDS.min_probability;
        }else{
          this.errorProbability = '';
          this.changedRisk.probability = (this.minProbability + this.maxProbability) / 2;
        }
        break;
      case CALC_FIELDS.min_impactTime:
        if (this.minImpactTime > this.maxImpactTime) {
          this.errorImpactTime = CALC_FIELDS.max_impactTime;
        }else{
          this.errorImpactTime = '';
          this.changedRisk.impactTime = (this.minImpactTime + this.maxImpactTime) / 2;
        }
        break;
      case CALC_FIELDS.max_impactTime:
        if (this.maxImpactTime < this.minImpactTime) {
          this.errorImpactTime = CALC_FIELDS.min_impactTime;
        }else{
          this.errorImpactTime = '';
          this.changedRisk.impactTime = (this.minImpactTime + this.maxImpactTime) / 2;
        }
        break;
    }
  }
}
