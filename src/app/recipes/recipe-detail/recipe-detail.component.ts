import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{

  // @Input() recipe: Recipe;
  recipe: Recipe;
  recipeIndex: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = (+params['recipeId']); 
      this.recipe = this.recipeService.getRecipes()[this.recipeIndex];
    })
  }

  onAddToList(){
    this.recipeService.onAddToShoppingList(this.recipe.ingredients);
  }

  onDelete(){
    this.recipeService.removeRecipe(this.recipeIndex);
    this.router.navigate(['/recipes']);
  }

}
