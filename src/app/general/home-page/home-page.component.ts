import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Upload } from '../../models/upload.model';
import { UploadService } from '../../services/upload.service';
import { IImage } from 'ng-simple-slideshow';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  gallery: Observable<Upload[]>;
  // imageUrls: (string | IImage)[];

  imageUrls: (string | IImage)[] = [
    { url: '../../../assets/carousel/carousel1.jpg', caption: 'The first slide' },
    { url: '../../../assets/carousel/carousel2.jpg', caption: 'The second slide' },
    { url: '../../../assets/carousel/carousel3.jpg', caption: 'The third slide' },
    { url: '../../../assets/carousel/carousel4.jpg', caption: 'The fourth slide' },
    { url: '../../../assets/carousel/carousel5.jpg', caption: 'The fifth slide' },
    { url: '../../../assets/carousel/carousel6.jpg', caption: 'The sixth slide' },
    { url: '../../../assets/carousel/carousel7.jpg', caption: 'The seventh slide' },
    { url: '../../../assets/carousel/carousel8.jpg', caption: 'The eight slide' },
    { url: '../../../assets/carousel/carousel9.jpg', caption: 'The nineth slide' },
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg',
    caption: 'The first slide', href: '#config' },
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg',
    clickAction: () => alert('custom click function') },
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg',
    caption: 'Apple TV', href: 'https://www.apple.com/' },
    'https://cdn.vox-cdn.com/uploads/chorus_image/image/56674755/mr_pb_is_the_best.0.jpg',
  ];

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    // this.uploadService.getAllGallery().subscribe(gallery => {
    //   this.imageUrls = gallery.map(g => {
    //     return {
    //       url: g.url,
    //       caption: g.Id
    //     };
    //   });
    // });
  }

}
