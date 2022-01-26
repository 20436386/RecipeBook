import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('ingredientName', {static:false}) nameInputRef: ElementRef;
  @ViewChild('ingredientAmount', {static:false}) amountInputRef: ElementRef;
  // @Output() shoppingListEdit = new EventEmitter<{action:string, data:Ingredient}>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){
    // console.log("onAdd called")
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, parseInt(this.amountInputRef.nativeElement.value));
    this.shoppingListService.addItem(newIngredient);
  }

  onDeleteItem(){
    const existingIngredient = new Ingredient(this.nameInputRef.nativeElement.value, parseInt(this.amountInputRef.nativeElement.value));
    this.shoppingListService.deleteItem(existingIngredient);
  }

  onClear(){
    console.log(this.nameInputRef)
    this.nameInputRef.nativeElement.value = '';
    this.amountInputRef.nativeElement.value = '';
  }

}
