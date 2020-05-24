import {Component, OnInit} from '@angular/core';
import {Risk} from '../../shared/interfaces';
import {RiskService} from '../../shared/services/risk.service';
import {emptyRisk, STORAGE_SAVED_TYPES} from '../../shared/const';


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
  public error: string;
  constructor(private riskService: RiskService) {

  }

  ngOnInit(): void {

    this.riskService.getSelectedRisk().subscribe((el: Risk) => {
      this.changedRisk = JSON.parse(JSON.stringify(el));
      this.currentRisk = el;
    });
    this.riskService.manageRisks.subscribe(el => this.manageRisk = el);
  }


  onReset() {
    this.riskService.setSelectedRisk(this.currentRisk);
    this.maxImpactTime = 0;
    this.minImpactTime = 0;
    this.maxProbability = 0;
    this.minProbability = 0;
    this.error = '';
  }

  onApply() {
    if (this.changedRisk.id === '') {
      this.changedRisk.userID = localStorage.getItem(STORAGE_SAVED_TYPES.id);
      this.riskService.addNewRisk(this.changedRisk).subscribe(
        (data: Risk) => {
          this.riskService.getRisks();
        },
        error => console.log(error)
      );
    } else {
      this.riskService.updateSelectedRisk(this.changedRisk).subscribe(
        (data: Risk) => {
          this.riskService.getRisks();
        },
        error => console.log(error)
      );
    }
    this.riskService.setSelectedRisk(emptyRisk);
  }

  onRemove() {
    this.riskService.deleteSelectedRisk(this.currentRisk).subscribe(
      (data: Risk) => {
        this.riskService.getRisks();
      },
      error => console.log(error)
    );
    this.riskService.setSelectedRisk(emptyRisk);
  }

  onFieldChange(field: string) {
    switch (field) {
      case 'probability':
        this.minProbability = 0;
        this.maxProbability = 0;
        this.error = '';
        break;
      case 'impactTime':
        this.minImpactTime = 0;
        this.maxImpactTime = 0;
        this.error = '';
        break;
      case 'min_probability':
        if (this.minProbability > this.maxProbability) {
          this.error = 'max_probability';
        }else{
          this.error = '';
          this.changedRisk.probability = (this.minProbability + this.maxProbability) / 2;
        }
        break;
      case 'max_probability':
        if (this.maxProbability < this.minProbability) {
          this.error = 'min_probability';
        }else{
          this.error = '';
          this.changedRisk.probability = (this.minProbability + this.maxProbability) / 2;
        }
        break;
      case 'min_impactTime':
        if (this.minImpactTime > this.maxImpactTime) {
          this.error = 'max_impactTime';
        }else{
          this.error = '';
          this.changedRisk.impactTime = (this.minImpactTime + this.maxImpactTime) / 2;
        }
        break;
      case 'max_impactTime':
        if (this.maxImpactTime < this.minImpactTime) {
          this.error = 'min_impactTime';
        }else{
          this.error = '';
          this.changedRisk.impactTime = (this.minImpactTime + this.maxImpactTime) / 2;
        }

        break;

    }
  }


  //  setError( typeField: string) {
  //
  // }


}
