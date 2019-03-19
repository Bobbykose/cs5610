import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {environment} from '../../../../../environments/environment';


@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  @ViewChild('updateimage') updateImageFrom: NgForm;
  @ViewChild('uploadimage') uploadImageFrom: NgForm;
  @ViewChild('deleteimage') deleteImageFrom: NgForm;
  userId: string;
  websiteId : string;
  pageId: string;
  widgetId: string;
  widget: Widget = new Widget('000', '', '', '', '', '', '');
  //uploadUrl: string = "No File Chosen";
  baseUrl: string = environment.baseUrl;

  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.widgetId = params['wgid'];
      }
    );

    console.log('image user id: ' + this.userId);
    console.log('image web id: ' + this.websiteId);
    console.log('image page id: ' + this.pageId);
    console.log('image widget id: ' + this.widgetId);
    this.widgetService.findWidgetById(this.widgetId).subscribe(
      (data: Widget) => {
        this.widget = data;
        console.log('Got widget, type' + this.widget.widgetType);
        console.log('Got widget, type' + this.widget.url);
      },
      (error: any) => {
        console.log('Can not find widget.');
      }
    );
  }

  updateImage(){
    console.log('entering update image');
    console.log('widget url' + this.widget.url);
    this.widgetService.updateWidget(this.widgetId, this.widget).subscribe(
      (data: Widget) => {
        this.widget = data;
        console.log('exiting update image');
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
      },
      (error: any) => {
        console.log('Update Image failed');
      }
    );
  }

  deleteImage(){
    console.log('entering delete image');
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      (data: Widget) => {
        this.widget = data;
        console.log('exiting delete image');
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
      },
      (error: any) => {
        console.log('Delete Image failed');
      }
    );
  }

}



