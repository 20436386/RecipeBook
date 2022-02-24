import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store'
import * as shoppingListActions from './store/shopping-list.actions'
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
// export class ShoppingListComponent implements OnInit, DoCheck, OnDestroy {
export class ShoppingListComponent implements OnInit {

  // private listChangedSub: Subscription;
  itemSelectedIndex:number;

  // ingredients: Ingredient[];
  ingredients: Observable<{ingredients: Ingredient[]}>;

  // constructor(private shoppingListService: ShoppingListService) { }
  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.listChangedSub = this.shoppingListService.listChanged.subscribe((list: Ingredient[]) =>{
    //   this.ingredients = list;
    // })
  }

  // ngOnDestroy(){
  //   this.listChangedSub.unsubscribe();
  // }

  ingredientSelected(index: number){
    console.log("ingredientSelected exec");
    // this.shoppingListService.ingredientSelectedIndex.next(index);
    let action = new shoppingListActions.StartEdit(index);
    this.store.dispatch(action);
    this.itemSelectedIndex = index;
  }
}
