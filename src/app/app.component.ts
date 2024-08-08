import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store'; // Import select from @ngrx/store
import { Observable } from 'rxjs';
import { addDigit, setOperator, calculateResult, clearCalculator } from './store/calculator.actions';
import { CalculatorState } from './store/calculator.reducer';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true
})
export class AppComponent {
  display$: Observable<string>;

  constructor(private store: Store<{ calculator: CalculatorState }>) {
    this.display$ = store.pipe(select(state => state.calculator?.display));
  }

  // Dispatch action to add digit
  onDigit(digit: string) {
    this.store.dispatch(addDigit({ digit }));
    console.log('Adding digit:', digit); // Add console log
  }

  // Dispatch action to set operator
  onOperator(operator: string) {
    this.store.dispatch(setOperator({ operator }));
    console.log('Setting operator:', operator); // Add console
  }

  // Dispatch action to calculate result
  onCalculate(calculate: string) {
    this.store.dispatch(calculateResult());
    console.log('Calculating result', calculate);
  }

  // Dispatch action to clear calculator
  onClear() {
    this.store.dispatch(clearCalculator({ clear: '0' }));
    console.log('Clearing calculator');
  }
}
