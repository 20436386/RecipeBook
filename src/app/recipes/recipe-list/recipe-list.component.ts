import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeItemComponent  } from './recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeEmitter = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Eggs Benedict', 'Eggs and salmon on toast', 'http://3.bp.blogspot.com/-_pdJXbExgXE/U8tXlkuY5MI/AAAAAAAAJyA/Z2wBv7EYG9M/s1600/1.jpg'),
    new Recipe('Pepparoni Pizza', 'The only way to make a pizza!', 'https://riotfest.org/wp-content/uploads/2016/10/Pepperoni_1.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  recipeSelected(focusedRecipe: Recipe){
    // console.log('recipeSelect executed')
    this.recipeEmitter.emit(focusedRecipe);
  }

}
