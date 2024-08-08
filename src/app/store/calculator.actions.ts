import { createAction, props } from '@ngrx/store';

// Define actions for numbers and operations
export const addDigit = createAction('[Calculator] Add Digit', props<{ digit: string }>());
export const setOperator = createAction('[Calculator] Set Operator', props<{ operator: string }>());
export const calculateResult = createAction('[Calculator] Calculate Result');
export const clearCalculator = createAction('[Calculator] Clear Calculator', props<{ clear: string }>());
