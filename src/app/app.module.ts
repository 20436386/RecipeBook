import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from './recipes/recipe.service';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthInterceptorService } from './authenticate/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  //Note that RecipeService is included here so that this specific instance of the service is available to all child nodes. That way the Recipes array will not be reinitialized every time the recipe list initializes. 
  providers: [RecipeService, 
    RecipeResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent],
  // entryComponents: [AlertComponent]
})
export class AppModule { }
