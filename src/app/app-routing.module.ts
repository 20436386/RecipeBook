import { NgModule } from "@angular/core";
import { PreloadAllModules, Route, RouterModule } from "@angular/router";

const appRoutes: Route[] = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {
        path: 'recipes',
        loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
    },
    {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
    },
    {
        path: 'authorize',
        loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule)
    }
]

@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules, onSameUrlNavigation: "reload"})
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})

    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}