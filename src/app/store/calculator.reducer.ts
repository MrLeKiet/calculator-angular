import { createReducer, on } from '@ngrx/store';
import { addDigit, setOperator, calculateResult, clearCalculator } from './calculator.actions';

// Define the interface for the calculator state
export interface CalculatorState {
  display: string;
  firstOperand: number | null;
  operator: string | null;
  waitingForSecondOperand: boolean;
}

// Initial state of the calculator
export const initialState: CalculatorState = {
  display: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
};

// Reducer function to handle actions and update the state
export const calculatorReducer = createReducer(
  initialState,
  on(addDigit, (state, { digit }) => {
    console.log('Adding digit:', digit); // Add console log
    if (state.waitingForSecondOperand) {
      return {
        ...state,
        display: digit,
        waitingForSecondOperand: false,
      };
    }
    return {
      ...state,
      display: state.display === '0' ? digit : state.display + digit,
    };
  }),
  on(setOperator, (state, { operator }) => {
    console.log('Setting operator:', operator); // Add console log
    if (state.firstOperand === null && !state.waitingForSecondOperand) {
      return {
        ...state,
        firstOperand: parseFloat(state.display),
        operator,
        waitingForSecondOperand: true,
      };
    }

    if (state.operator && state.waitingForSecondOperand) {
      return {
        ...state,
        operator,
      };
    }

    return {
      ...state,
      firstOperand: calculate(state),
      operator,
      waitingForSecondOperand: true,
      display: calculate(state).toString(),
    };
  }),
  on(calculateResult, (state) => {
    console.log('Calculating result'); // Add console log
    if (state.operator && state.firstOperand !== null) {
      const result = calculate(state);
      return {
        ...state,
        display: result.toString(),
        firstOperand: result,
        operator: null,
        waitingForSecondOperand: false,
      };
    }
    return state;
  }),
  on(clearCalculator, () => {
    console.log('Clearing calculator'); // Add console log
    return initialState;
  })
);

// Function to perform calculations based on the operator
function calculate({ firstOperand, operator, display }: CalculatorState): number {
  const secondOperand = parseFloat(display);

  switch (operator) {
    case '+':
      return (firstOperand ?? 0) + secondOperand;
    case '-':
      return (firstOperand ?? 0) - secondOperand;
    case '*':
      return (firstOperand ?? 0) * secondOperand;
    case '/':
      return secondOperand !== 0 ? (firstOperand ?? 0) / secondOperand : 0;
    default:
      return secondOperand;
  }
}
