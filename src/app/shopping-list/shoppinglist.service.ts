import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService{

    listChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('cheese', 20)
      ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addItem(item: Ingredient){
        // console.log("AddItem called");
        this.ingredients.push(item);
        this.listChanged.emit(this.ingredients.slice());
    }

    addManyItems(ingredients: Ingredient[]){
        //Note that this will work but we are emitting many unnecessary events, therefore use code below 
        // for(let item of ingredients){
        //     this.addItem(item);
        //   }

        //Take note of the spread operator!!!
        this.ingredients.push(...ingredients);
        this.listChanged.emit(this.ingredients.slice());
    }

    deleteItem(item: Ingredient){
        let index = this.ingredients.findIndex((element)=>{
            if((element.name === item.name) && (element.amount === item.amount)){
              return true;
            }else{
              return false;
            }
          });
          
          if(index !== -1){
            this.ingredients.splice(index, 1);
          }else{
            return console.log("Entry Does not exist");
          }

        this.listChanged.emit(this.ingredients.slice());
    }
}