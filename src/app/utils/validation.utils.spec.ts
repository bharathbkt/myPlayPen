import { TestBed } from '@angular/core/testing';
import { ValidationUtils } from './validation.utils';

describe('ValidationUtils', () => {
  let service: ValidationUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationUtils]
    });
    service = TestBed.inject(ValidationUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkNullAndUndefined', () => {
    it('should return true for undefined value', () => {
      expect(service.checkNullAndUndefined(undefined)).toBeTruthy();
    });

    it('should return true for null value', () => {
      expect(service.checkNullAndUndefined(null)).toBeTruthy();
    });

    it('should return true for empty string', () => {
      expect(service.checkNullAndUndefined("")).toBeTruthy();
    });

    it('should return false for non-empty string', () => {
      expect(service.checkNullAndUndefined("test")).toBeFalsy();
    });

    it('should return false for number 0', () => {
      expect(service.checkNullAndUndefined(0)).toBeFalsy();
    });

    it('should return false for false boolean', () => {
      expect(service.checkNullAndUndefined(false)).toBeFalsy();
    });

    it('should return false for array', () => {
      expect(service.checkNullAndUndefined([])).toBeFalsy();
    });

    it('should return false for object', () => {
      expect(service.checkNullAndUndefined({})).toBeFalsy();
    });
  });
});