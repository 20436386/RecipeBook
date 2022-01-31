import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { SelectRecipeComponent } from "./recipes/select-recipe/select-recipe.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";


const appRoutes: Route[] = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component: SelectRecipeComponent},
        {path: 'detail/:recipeId', component: RecipeDetailComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: 'update/:recipeId', component: RecipeEditComponent}
    ]},
    {path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}