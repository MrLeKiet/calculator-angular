import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AppComponent } from './app.component';
import { calculatorReducer } from './store/calculator.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule, // Add CommonModule here
    StoreModule.forRoot({ calculator: calculatorReducer }), // Register the reducer
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
