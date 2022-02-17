import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthInterceptorService } from './authenticate/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
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
