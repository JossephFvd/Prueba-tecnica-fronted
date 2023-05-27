import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cocktail } from 'src/app/models/cocktail.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { CocktailService } from 'src/app/services/cocktail.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.css']
})
export class CocktailDetailsComponent implements OnInit {
  cocktail: Cocktail | undefined;
  ingredients: Ingredient[] = [];
  ingredientImages: Ingredient[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cocktailService: CocktailService,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    const cocktailId = this.route.snapshot.paramMap.get('id');
    if (cocktailId) {
      this.cocktailService.getCocktailById(cocktailId).subscribe(cocktail => {
        this.cocktail = cocktail;
        this.ingredients = this.getIngredients(cocktail);

        // Obtener las imágenes de los ingredientes
        this.getIngredientImages(this.ingredients);
      });
    }
  }

  getIngredientImages(ingredients: Ingredient[]): void {
    const ingredientObservables = ingredients.map(ingredient => {
      return this.ingredientService.getIngredientByName(ingredient.name);
    });

    forkJoin(ingredientObservables).subscribe(dataArray => {
      dataArray.forEach((data, index) => {
        const ingredientData = data && data[0];
        const ingredientImage = ingredientData && ingredientData.strIngredientThumb;
        if (ingredientImage) {
          const ingredientWithImage: Ingredient = {
            name: ingredientData.strIngredient,
            measure: this.ingredients[index].measure, 
            imageUrl: ingredientImage
          };
          console.log('Ingredient with image:', ingredientWithImage);
          this.ingredientImages.push(ingredientWithImage);
        }
      });
    });
  }

  getIngredients(cocktail: Cocktail): Ingredient[] {
    const ingredients: Ingredient[] = [];
    for (let i = 1; i <= 15; i++) {
      const ingredientName = cocktail['strIngredient' + i];
      const ingredientMeasure = cocktail['strMeasure' + i];
      if (ingredientName) {
        const ingredient: Ingredient = {
          name: ingredientName,
          measure: ingredientMeasure,
          imageUrl: ''
        };
        ingredients.push(ingredient);
      } else {
        break;
      }
    }
    return ingredients;
  }

  viewIngredientList(ingredientName: string): void {
    this.router.navigate(['/ingredient-list', ingredientName]);
  }
}
