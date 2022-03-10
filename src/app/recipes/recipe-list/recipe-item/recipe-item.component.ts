import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Recipe } from '../../recipes.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromRecipes from 'src/app/recipes/store/recipe.reducer';
import * as recipeActions from '../../store/recipe.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {
  }

  // onClick(){
  //   this.store.dispatch(new recipeActions.UpdateIndex(this.index));
  //   this.router.navigate(['/recipes/detail', this.index]);
  // }

}
