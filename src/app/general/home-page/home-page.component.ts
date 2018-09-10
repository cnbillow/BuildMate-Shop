import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Upload } from '../../models/upload.model';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  gallery: Upload[] = [];
  subsription: Subscription;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.subsription = this.uploadService.getAllGallery().subscribe(gallery => {
      const images = [];
      gallery.forEach(item => {
        if (item.tag === 'PRODUCT') {
          images.push(item);
        }
      });

      this.gallery = images;
    });
  }

  ngOnDestroy(): void {
    if (this.subsription) {
      this.subsription.unsubscribe();
    }
  }


}
