import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationUtils {
  /**
   * Checks if a value is null, undefined, or empty string
   * @param value - The value to check
   * @returns true if the value is null, undefined, or empty string; false otherwise
   */
  checkNullAndUndefined(value: any): boolean {
    return value === undefined || value === null || value === "";
  }
}