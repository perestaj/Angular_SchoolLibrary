import { Routes } from '@angular/router';
import { AuthorsListComponent } from './authors/authors-list/containers/authors-list.component';
import { AuthorDetailsComponent } from './authors/author-details/containers/author-details.component';
import { PublishersListComponent } from './publishers/publishers-list/containers/publishers-list.component';
import { PublisherDetailsComponent } from './publishers/publisher-details/containers/publisher-details.component';
import { UsersListComponent } from './users/users-list/containers/users-list.component';
import { UserDetailsComponent } from './users/user-details/containers/user-details.component';

import { AuthorsGuard } from './authors/authors.guard';
import { AuthorGuard } from './authors/author.guard';
import { PublisherGuard } from './publishers/publisher.guard';
import { PublishersGuard } from './publishers/publishers.guard';
import { UsersGuard } from './users/users.guard';
import { UserGuard } from './users/user.guard';

export const administrationRoutes: Routes = [
    { path: 'authors', component: AuthorsListComponent, canActivate: [AuthorsGuard] },
    { path: 'authors/:id', component: AuthorDetailsComponent, canActivate: [AuthorGuard] },
    { path: 'publishers', component: PublishersListComponent, canActivate: [PublishersGuard] },
    { path: 'publishers/:id', component: PublisherDetailsComponent, canActivate: [PublisherGuard] },
    { path: 'users', component: UsersListComponent, canActivate: [UsersGuard] },
    { path: 'users/:id', component: UserDetailsComponent, canActivate: [UserGuard] }
];
