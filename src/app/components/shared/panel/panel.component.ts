import { Component, Input,Output,EventEmitter, NgModule, OnInit, output  } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';
import { FormControl, FormGroup, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [PanelModule,TableModule,RatingModule,ProgressBarModule,ToastModule,ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  formGroup!: FormGroup;
  productdetails!: string[];
  rate: number = 0;

  ngOnInit(): void {
    this.productdetails = ["Black, Blue, Mint Green", "Xiaomi", "AMOLED, 120Hz", "6.67 inches", "1080 x 2400 pixels", "Corning Gorilla Glass 3", "3G,4G",
      "Android 13, MIUI 14", "Qualcomm SM6225 Snapdragon 685 (6 nm)", "Octa-core (4×2.8 GHz Cortex-A73 & 4×1.9 GHz Cortex-A53)", "Adreno 610", "256GB",
      "8GB", "108 MP", "108 MP, f/1.8, 24mm (wide), 1/1.67, 0.64µm, PDAF", "16 MP, f/2.4, (wide)", "5000 mAh, non-removable", "5000 mAh", "Fingerprint (under display, optical)"
    ];
  }

  @Output() ratingClicked: EventEmitter<number> = new EventEmitter<number>();

  setRate(value: number) {
    this.rate = value;
    this.ratingClicked.emit(this.rate); // Emitting the rating value to the parent component
  }
}
