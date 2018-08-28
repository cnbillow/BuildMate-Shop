import { AlertService } from './../../../services/alert.service';
import { ProductCategoryService } from './../../../services/product-category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  category: Category = {};

  constructor(private categoryService: ProductCategoryService, 
    private alertService: AlertService, 
    private dialogRef: MatDialogRef<ProductCategoryComponent>) { }

  ngOnInit() {
  }

  async onSubmit() {
    const confirm = await this.alertService.confirmUpdate();
    if (confirm.value) {
      await this.categoryService.addCategory(this.category);

      this.alertService.afterUpdateSuccess();
      this.dialogRef.close();
    }
    
  }

}
