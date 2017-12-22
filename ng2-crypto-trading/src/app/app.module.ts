import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { OrderedByPipe } from './pipes/orderby.pipe';
import { AppComponent } from './app.component';
import { CryptoTableComponent } from './crypto-table/crypto-table.component';
import { CoincapService } from './services/coincap.service';
import { SortingService } from './services/sorting.service';

@NgModule({
  declarations: [
    AppComponent,
    OrderedByPipe,
    CryptoTableComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [CoincapService, SortingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
