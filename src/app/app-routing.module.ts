import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailDetailsComponent } from './components/cocktail-details/cocktail-details.component';
import { CocktailListComponent } from './components/cocktail-list/cocktail-list.component';
import { IngredientListComponent } from './components/ingredient-list/ingredient-list.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

const routes: Routes = [
  { path: '', redirectTo: '/cocktails', pathMatch: 'full' },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'cocktails', component: CocktailListComponent },
  { path: 'cocktail/:id', component: CocktailDetailsComponent },
  { path: 'ingredient/:name', component: IngredientListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
