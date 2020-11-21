import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoansListComponent } from './loans-list/containers/loans-list.component';
import { LoansTableComponent } from './loans-list/components/loans-table/loans-table.component';
import { LoansSearchPanelComponent } from './loans-list/components/loans-search-panel/loans-search-panel.component';
import { LoansGuard } from './loans.guard';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/loans.reducer';
import { LoansEffects } from './state/loans.effects';
import { EffectsModule } from '@ngrx/effects';
import { LoansFacade } from './state/loans.facade';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: LoansListComponent, canActivate: [LoansGuard] }
    ]),
    ReactiveFormsModule,

    StoreModule.forFeature('loans', reducer),
    EffectsModule.forFeature([LoansEffects])
  ],
  declarations: [
    LoansListComponent,
    LoansTableComponent,
    LoansSearchPanelComponent
  ],
  providers: [
    LoansGuard,
    LoansFacade
  ]
})
export class LoansModule { }
