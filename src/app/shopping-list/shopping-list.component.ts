import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, DoCheck, OnDestroy {

  private listChangedSub: Subscription;

  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.listChangedSub = this.shoppingListService.listChanged.subscribe((list: Ingredient[]) =>{
      this.ingredients = list;
    })
  }

  ngDoCheck(): void {
    // this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnDestroy(){
    this.listChangedSub.unsubscribe();
  }
}
