import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationUtils } from './app/utils/validation.utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1>Date Difference Calculator</h1>
      
      <div style="margin: 20px 0;">
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">Start Date:</label>
          <input 
            type="date" 
            [(ngModel)]="startDate"
            style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
          >
        </div>

        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">End Date:</label>
          <input 
            type="date" 
            [(ngModel)]="endDate"
            style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
          >
        </div>
        
        <button 
          (click)="calculateMonthsDifference()"
          style="padding: 8px 16px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Calculate Difference
        </button>
      </div>

      <div *ngIf="monthsDifference !== null" 
           style="margin-top: 10px; font-weight: bold; color: #28a745;">
        Difference: {{ monthsDifference }} months
      </div>

      <hr style="margin: 20px 0;">

      <!-- Previous Null/Undefined Checker -->
      <h2>Null/Undefined Checker</h2>
      <div style="margin: 20px 0;">
        <input 
          type="text" 
          [(ngModel)]="inputValue"
          placeholder="Enter a value to check"
          style="padding: 8px; margin-right: 10px; border: 1px solid #ccc; border-radius: 4px;"
        >
        
        <button 
          (click)="checkValue()"
          style="padding: 8px 16px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Check Value
        </button>
      </div>

      <div *ngIf="resultMessage" 
           [style.color]="isNullOrUndefined ? '#dc3545' : '#28a745'"
           style="margin-top: 10px; font-weight: bold;">
        {{ resultMessage }}
      </div>
    </div>
  `,
})
export class App {
  inputValue: string = '';
  resultMessage: string = '';
  isNullOrUndefined: boolean = false;
  startDate: string = '';
  endDate: string = '';
  monthsDifference: number | null = null;

  constructor(private validationUtils: ValidationUtils) {}

  checkValue() {
    this.isNullOrUndefined = this.validationUtils.checkNullAndUndefined(this.inputValue);
    this.resultMessage = this.isNullOrUndefined 
      ? 'The value is null, undefined, or empty!'
      : 'The value is valid!';
  }

  calculateMonthsDifference() {
    if (!this.startDate || !this.endDate) {
      alert('Please select both dates');
      return;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    // Calculate the difference in months
    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();
    this.monthsDifference = yearDiff * 12 + monthDiff;

    // Adjust for partial months if end date is earlier in the month than start date
    if (end.getDate() < start.getDate()) {
      this.monthsDifference--;
    }
  }
}

bootstrapApplication(App, {
  providers: [ValidationUtils]
});