import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  VERSION,
  ViewEncapsulation,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fromEvent } from 'rxjs';
import {
  Gallery,
  GalleryItem,
  ImageItem,
  ThumbnailsPosition,
  ImageSize,
} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileDetailsComponent implements OnInit {
  items!: GalleryItem[];

  imageData = data;

  constructor(public gallery: Gallery, public lightbox: Lightbox) {}

  ngOnInit(): void {

    /** Basic Gallery Example */

    // Creat gallery items
    this.items = this.imageData.map(
      (item: any) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
    );

    /** Lightbox Example */

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);

    let ltr = document.querySelectorAll('#myonoffswitch54');
    let rtl = document.querySelectorAll('#myonoffswitch55');
    fromEvent(ltr, 'click').subscribe(() => {
      this.customOptions = { ...this.customOptions, rtl: false }; // this will make the carousel refresh
    });
    fromEvent(rtl, 'click').subscribe(() => {
      this.customOptions = { ...this.customOptions, rtl: true }; // this will make the carousel refresh
    });
  }


  customOptions: OwlOptions = {
    loop: true,
    rtl: false,
    navText: ['<', '>'],
    center:true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  slidesStore = [
    {
      id: '1',
      src: './assets/img/photos/fileimage1.jpg',
      alt: 'img',
      size: '120kb',
      title: 'fileImage1.jpg',
    },
    {
      id: '2',
      src: './assets/img/photos/fileimage2.jpg',
      alt: 'img',
      size: '256kb',
      title: 'fileImage2.jpg',
    },
    {
      id: '3',
      src: './assets/img/photos/fileimage3.jpg',
      alt: 'img',
      size: '500kb',
      title: 'fileImage3.jpg',
    },
    {
      id: '4',
      src: './assets/img/photos/fileimage4.jpg',
      alt: 'img',
      size: '1.2mb',
      title: 'fileImage4.jpg',
    },
    {
      id: '5',
      src: './assets/img/photos/fileimage5.jpg',
      alt: 'img',
      size: '258kb',
      title: 'fileImage5.jpg',
    },
  ];

  ngAfterViewInit() {
    if (document.querySelector('body')?.classList.contains('rtl')) {
      this.customOptions = { ...this.customOptions, rtl: true }; // this will make the carousel refresh
    }
  }
}

const data = [
  {
    srcUrl: './assets/img/media/1.jpg',
    previewUrl: './assets/img/media/1.jpg',
  },
  {
    srcUrl: './assets/img/media/2.jpg',
    previewUrl: './assets/img/media/2.jpg',
  },
  {
    srcUrl: './assets/img/media/3.jpg',
    previewUrl: './assets/img/media/3.jpg',
  },
  {
    srcUrl: './assets/img/media/4.jpg',
    previewUrl: './assets/img/media/4.jpg',
  },
  {
    srcUrl: './assets/img/media/5.jpg',
    previewUrl: './assets/img/media/5.jpg',
  },
  {
    srcUrl: './assets/img/media/6.jpg',
    previewUrl: './assets/img/media/6.jpg',
  },
  {
    srcUrl: './assets/img/media/7.jpg',
    previewUrl: './assets/img/media/7.jpg',
  },
  {
    srcUrl: './assets/img/media/8.jpg',
    previewUrl: './assets/img/media/8.jpg',
  },
];
