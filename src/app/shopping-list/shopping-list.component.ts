import { Component, DoCheck, Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, DoCheck {

  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.listChanged.subscribe((list: Ingredient[]) =>{
      this.ingredients = list;
    })
  }

  ngDoCheck(): void {
    // this.ingredients = this.shoppingListService.getIngredients();
  }
}
