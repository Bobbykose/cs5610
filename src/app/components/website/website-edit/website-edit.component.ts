import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {async} from '@angular/core/testing';


@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  @ViewChild('updateweb') updateWebFrom: NgForm;
  @ViewChild('deleteweb') deleteWebFrom: NgForm;
  userId: string;
  websiteId : string;
  website: Website = new Website('Name', '', '');
  websites: Website[] = [];
  errorFlag: boolean;
  errorMsg = 'Website name is required!';

  constructor(private websiteService: WebsiteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
    });

    console.log('user id: ' + this.userId + ' website id: ' + this.websiteId);

    //this.websites = this.websiteService.findWebsitesByUser(this.userId);
    //this.website = this.websiteService.findWebsiteById(this.websiteId);
    this.websiteService.findWebsitesByUser(this.userId).subscribe(
      (data: any) => {
        this.websites = data;
        console.log('Got websites');
      });

    this.websiteService.findWebsiteById(this.websiteId).subscribe(
      (data: any)=>{
        this.website = data;
        console.log('Got website');
      });
  }

  updateWebsite(){
    console.log('entering update website');
    if (!this.website.name || this.website.name.length === 0) {
      this.errorFlag = true;
      return;
    }

    this.websiteService.updateWebsite(this.websiteId, this.website)
      .subscribe(
        (data: any) => {
          this.website = data;
          console.log('exiting update website');
          this.router.navigate(['/user', this.userId, 'website']);
        }
      );
  }

  deleteWebsite(){
    console.log('entering delete website');
    this.websiteService.deleteWebsite(this.websiteId).subscribe(
      (data: any) => {
        console.log('exiting delete website');
        this.router.navigate(['/user', this.userId, 'website']);
      }
    );
  }

}

