import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BooksListComponent } from './books-list/containers/books-list.component';
import { BooksSearchPanelComponent } from './books-list/components/books-search-panel/books-search-panel.component';
import { BooksTableComponent } from './books-list/components/books-table/books-table.component';

import { booksRoutes } from './routes';

import { BookDetailsComponent } from './book-details/containers/book-details.component';
import { BookDetailsFormComponent } from './book-details/components/book-details-form/book-details-form.component';
import { BookEditFormComponent } from './book-details/components/book-edit-form/book-edit-form.component';
import { reducer } from './state/book.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './state/book.effects';
import { BookFacade } from './state/book.facade';
import { BooksGuard } from './books.guard';
import { BooksService } from './books.service';


@NgModule({
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild(booksRoutes),
    HttpClientModule,
    StoreModule.forFeature('books', reducer),
    EffectsModule.forFeature([BookEffects])
  ],
  declarations: [
    BooksListComponent,
    BooksSearchPanelComponent,
    BooksTableComponent,
    BookDetailsComponent,
    BookDetailsFormComponent,
    BookEditFormComponent
  ],
  providers: [BooksService, BookFacade, BooksGuard]
})
export class BooksModule { }
