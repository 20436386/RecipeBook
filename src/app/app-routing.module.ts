import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { SelectRecipeComponent } from "./recipes/select-recipe/select-recipe.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthenticateComponent } from "./authenticate/authenticate.component";
import { AuthGuardService } from "./authenticate/auth-guard.service";


const appRoutes: Route[] = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', 
        canActivateChild: [AuthGuardService],
        component: RecipesComponent, 
        children: [
            {path: '', component: SelectRecipeComponent},
            {path: 'detail/:recipeId', component: RecipeDetailComponent, resolve:[RecipeResolverService]},
            {path: 'new', component: RecipeEditComponent},
            {path: 'update/:recipeId', component: RecipeEditComponent, resolve:[RecipeResolverService]}
    ]},
    {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuardService]},
    {path: 'authorize', component: AuthenticateComponent}
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