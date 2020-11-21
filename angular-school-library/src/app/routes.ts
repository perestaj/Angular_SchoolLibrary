import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
    { path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
    { path: 'loans', loadChildren: () => import('./loans/loans.module').then(m => m.LoansModule) },
    { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
];
