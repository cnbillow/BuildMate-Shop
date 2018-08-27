import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductCategoryComponent } from '../product-category/product-category.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  step = 0;

  imageUrl = '../../../../assets/avatars/avatar3.png';
  fileToUpload: FileList;
  isHovering: boolean;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file;

    if (this.fileToUpload.item(0).type !== 'image') {
      console.log('unsupported file type :( ');
    }

    // show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload.item(0));
  }

  toggleHover($event: boolean) {
    this.isHovering = $event;
  }

  addCategory() {
    this.dialog.open(ProductCategoryComponent, {
      height: '500px',
      width: '500px'
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
