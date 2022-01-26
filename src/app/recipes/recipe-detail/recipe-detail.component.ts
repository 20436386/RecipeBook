import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{

  @Input() recipe: Recipe;
  // recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onAddToList(){
    this.recipeService.onAddToShoppingList(this.recipe.ingredients);
  }

}
