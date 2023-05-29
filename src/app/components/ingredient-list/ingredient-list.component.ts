import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cocktail } from 'src/app/models/cocktail.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {
  ingredient: Ingredient;
  cocktails: Cocktail[] = [];

  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private cocktailService: CocktailService
  ) {}

  ngOnInit(): void {
    const ingredientName = this.route.snapshot.paramMap.get('name');
    this.getIngredientCocktails(ingredientName);
    this.getIngredientDetails(ingredientName);
  }

  getIngredientCocktails(ingredientName: string): void {
    this.cocktailService.getDrinksByIngredient(ingredientName).subscribe((cocktails: Cocktail[]) => {
      this.cocktails = cocktails;
    });
  }

  getIngredientDetails(ingredientName: string): void {
    this.ingredientService.getIngredientByName(ingredientName).subscribe((ingredient: Ingredient) => {
      this.ingredient = ingredient;
    });
  }

}
