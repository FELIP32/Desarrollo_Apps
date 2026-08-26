import { Routes } from '@angular/router';
import { Personajes } from './paginas/api/api';

export const routes: Routes = [
	{ path: 'personajes', component: Personajes },
	{ path: '', redirectTo: 'personajes', pathMatch: 'full' }
];
