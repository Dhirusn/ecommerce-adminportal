import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryRoutingModule } from './category-routing.module';

import { ListCategoryComponent } from './list-category/list-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import {
  CardModule,
  ButtonModule,
  TableModule
} from '@coreui/angular';
import {IconModule } from '@coreui/icons-angular';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryService } from './category.service';

@NgModule({
  declarations: [
    ListCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    CategoryDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRoutingModule,
    CardModule,
    ButtonModule,
    TableModule,
    IconModule
  ]
})
export class CategoryModule { }
