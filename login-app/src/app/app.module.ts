import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ResgisterComponent } from './components/resgister/resgister.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginGuardService } from './services/login-guard.service';


const routes : Routes = [
  {path : 'user-list', component : UserListComponent, canActivate : [LoginGuardService]},
  {path : 'register', component : ResgisterComponent},
  {path : 'login', component : LoginComponent},
  {path : '', redirectTo : 'login', pathMatch : 'full'},
  {path : '**', redirectTo : 'login', pathMatch : 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResgisterComponent,
    UserListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: LoginGuardService, useClass : LoginGuardService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
