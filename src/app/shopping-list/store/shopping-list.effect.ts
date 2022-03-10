import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, of, switchMap, withLatestFrom } from "rxjs";
import * as shoppingListActions from "./shopping-list.actions";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { Ingredient } from "src/app/shared/ingredient.model";


@Injectable()
export class ShoppingListEffects{

    constructor(private actions$: Actions, private store: Store<fromApp.AppState>, private http: HttpClient){}

    fetchList = createEffect(() => {
        return this.actions$.pipe(
            ofType(shoppingListActions.FETCH_LIST),
            switchMap(() => {
                return this.http.get<Ingredient[]>('https://ng-course-recipe-book-b490c-default-rtdb.firebaseio.com/shopping-list/.json')
                .pipe(map((responseData) => {
                    // console.log(responseData);
                    if(responseData === null){
                        let error = new Error("There are no ingredients in the database!");
                        console.log(error);
                        return new shoppingListActions.UpdateFromServer([]);
                    }else{
                        return new shoppingListActions.UpdateFromServer(responseData);
                    }
                }))
            })
        )
    })

    storeList = createEffect(() => {
        return this.actions$.pipe(
            ofType(shoppingListActions.STORE_LIST),
            withLatestFrom(this.store.select("shoppingList")),
            switchMap(([actionData, slState]) => {
                var url = 'https://ng-course-recipe-book-b490c-default-rtdb.firebaseio.com/shopping-list/.json';
                return this.http.put<{[key: string] : string}>(url, slState.ingredients, {
                    observe: 'body'
                })
            })
        )
    }, {dispatch: false});

}