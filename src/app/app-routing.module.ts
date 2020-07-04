import { NgModule } from '@angular/core';
import {RouterModule , Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { ClientsComponent } from './components/clients/clients.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AuthGaurd } from './gaurds/auth.gaurd';


const routes:Routes=[
  {path:'', component: DashboardComponent, canActivate:[AuthGaurd]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'client/add',component:AddClientComponent, canActivate:[AuthGaurd]},
  {path:'client/edit/:id',component:EditClientComponent, canActivate:[AuthGaurd]},
  {path:'client/:id',component:ClientDetailsComponent, canActivate:[AuthGaurd]},
  {path:'settings',component:SettingsComponent, canActivate:[AuthGaurd]},
  {path:'**',component:NotFoundComponent},
];

@NgModule({
  providers: [AuthGaurd],
  exports:[RouterModule],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ]
})
export class AppRoutingModule { }
