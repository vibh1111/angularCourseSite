import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
    {
        path:'',
        loadComponent:() => import('./pages/home/home.component').then(c=>HomeComponent)
    },
    {
        path:'about',
        loadComponent:() => import('./pages/about/about.component').then(c=>AboutComponent)
    },
    {
        path:'admin',
        loadComponent:() => import('./pages/admin/admin.component').then(c=>AdminComponent)
    },
];
