import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    CategoryComponent,
    ProductsComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class DashboardModule { }
