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

    <hr style="margin: 20px 0;">

    <div style="padding: 20px;">
      <h1>Month Selector CCM -1 + 3</h1>
      <select 
        [(ngModel)]="selectedDate" 
        (change)="onDateChange()"
        style="padding: 8px; font-size: 16px; border-radius: 4px;">
        <option value="">-- Select Effective Date --</option>
        <option *ngFor="let date of availableDates" [value]="date.toISOString()">
          {{ date | date:'MMMM d, yyyy' }}
        </option>
      </select>

      <div style="margin-top: 20px;">
        Selected date: {{ selectedDate ? (selectedDate | date:'longDate') : 'No date selected' }}
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

  constructor(private validationUtils: ValidationUtils) {
    this.generateDates();

  }

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
  availableDates: Date[] = [];
  selectedDate: string = '';
  generateDates() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Generate dates for -1, 0, +1, +2, +3 months
    for (let i = -1; i <= 3; i++) {
      let month = currentMonth + i;
      let year = currentYear;

      // Handle year transition for previous months
      if (month < 0) {
        month = 12 + month;
        year--;
      }
      // Handle year transition for future months
      else if (month > 11) {
        month = month - 12;
        year++;
      }

      // Create date for 1st of the month
      const date = new Date(year, month, 1);
      this.availableDates.push(date);
    }

    // Set default selected date to current month
    this.selectedDate = this.availableDates[1].toISOString(); // Index 1 is current month (0 is previous month)
  }

  onDateChange() {
    console.log('Selected date:', this.selectedDate);
  }
}

bootstrapApplication(App, {
  providers: [ValidationUtils]
});