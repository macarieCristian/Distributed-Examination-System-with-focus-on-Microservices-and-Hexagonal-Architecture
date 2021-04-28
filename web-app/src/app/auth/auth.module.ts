import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';

const material = [
  MatCardModule,
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    material
  ]
})
export class AuthModule {
}
