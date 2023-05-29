import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cocktail } from 'src/app/models/cocktail.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.css']
})
export class CocktailDetailsComponent implements OnInit {
  cocktail: Cocktail | undefined;
  ingredients: Ingredient[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cocktailService: CocktailService
  ) {}

  ngOnInit(): void {
    const cocktailId = this.route.snapshot.paramMap.get('id');
    if (cocktailId) {
      this.cocktailService.getCocktailById(cocktailId).subscribe(cocktail => {
        this.cocktail = cocktail;
        this.getIngredients(cocktailId);
      });
    }
  }

  getIngredients(cocktailId: string): void {
    this.cocktailService.getCocktailIngredients(cocktailId).subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  viewIngredientList(idIngredient: string): void {
    this.router.navigate(['/ingredient', idIngredient]);
  }
}
