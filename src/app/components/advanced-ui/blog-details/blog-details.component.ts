import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogDetailsComponent implements OnInit {
  items!: GalleryItem[];

  imageData = data;

  constructor(public gallery: Gallery, public lightbox: Lightbox) {
  }

  ngOnInit(): void {
     /** Basic Gallery Example */

    // Creat gallery items
    this.items = this.imageData.map((item:any) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));


    /** Lightbox Example */

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }
}

const data = [
  {
    srcUrl: './assets/img/photos/1.jpg',
    previewUrl: './assets/img/photos/1.jpg'
  },
  {
    srcUrl: './assets/img/photos/2.jpg',
    previewUrl: './assets/img/photos/2.jpg'
  },
  {
    srcUrl: './assets/img/photos/3.jpg',
    previewUrl: './assets/img/photos/3.jpg'
  },
  {
    srcUrl: './assets/img/photos/4.jpg',
    previewUrl: './assets/img/photos/4.jpg'
  },
  {
    srcUrl: './assets/img/photos/5.jpg',
    previewUrl: './assets/img/photos/5.jpg'
  },
  {
    srcUrl: './assets/img/photos/6.jpg',
    previewUrl: './assets/img/photos/6.jpg'
  },
  {
    srcUrl: './assets/img/photos/7.jpg',
    previewUrl: './assets/img/photos/7.jpg'
  },
  {
    srcUrl: './assets/img/photos/8.jpg',
    previewUrl: './assets/img/photos/8.jpg'
  },
  {
    srcUrl: './assets/img/photos/9.jpg',
    previewUrl: './assets/img/photos/9.jpg'
  },
  {
    srcUrl: './assets/img/photos/10.jpg',
    previewUrl: './assets/img/photos/10.jpg'
  },
  {
    srcUrl: './assets/img/photos/11.jpg',
    previewUrl: './assets/img/photos/11.jpg'
  },
  {
    srcUrl: './assets/img/photos/12.jpg',
    previewUrl: './assets/img/photos/12.jpg'
  }
];