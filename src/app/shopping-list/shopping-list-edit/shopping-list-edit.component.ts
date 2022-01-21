import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('ingredientName', {static:false}) nameInputRef: ElementRef;
  @ViewChild('ingredientAmount', {static:false}) amountInputRef: ElementRef;
  @Output() shoppingListEdit = new EventEmitter<{action:string, data:Ingredient}>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){
    console.log("onAdd called")
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, parseInt(this.amountInputRef.nativeElement.value));
    this.shoppingListEdit.emit({
      action: "add", 
      data: newIngredient
    })
}

  onDeleteItem(){
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, parseInt(this.amountInputRef.nativeElement.value));
    this.shoppingListEdit.emit({
      action: "remove", 
      data: newIngredient
    })
}

  onClear(){
    console.log(this.nameInputRef)
    this.nameInputRef.nativeElement.value = '';
    this.amountInputRef.nativeElement.value = '';
  }

}
