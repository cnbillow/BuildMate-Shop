import { ProductCategoryService } from './../../../services/product-category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/product-category.model';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  category: Category = {};

  constructor(private categoryService: ProductCategoryService) { }

  ngOnInit() {
  }

  async onSubmit() {
    await this.categoryService.addCategory(this.category);
  }

}
