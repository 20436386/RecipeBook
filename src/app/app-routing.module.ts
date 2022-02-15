import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthenticateComponent } from "./authenticate/authenticate.component";

const appRoutes: Route[] = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
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