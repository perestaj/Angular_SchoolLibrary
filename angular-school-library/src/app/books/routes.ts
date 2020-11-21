import { Routes } from '@angular/router';
import { BooksListComponent } from './books-list/containers/books-list.component';
import { BookDetailsComponent } from './book-details/containers/book-details.component';
import { BooksGuard } from './books.guard';

export const booksRoutes: Routes = [
    { path: '', component: BooksListComponent },
    { path: ':id', component: BookDetailsComponent, canActivate: [BooksGuard] }

];
