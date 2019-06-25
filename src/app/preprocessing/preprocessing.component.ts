import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../data-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import { LogHeader } from '../log-header';
import { catchError, map, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-preprocessing',
  templateUrl: './preprocessing.component.html',
  styleUrls: ['./preprocessing.component.css']
})
export class PreprocessingComponent implements OnInit {

  private activeTab
  private progressmode = 'determinate'
  

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle('Preprocessing')
  }

  ngOnInit() {
  }

  generalPrepro() {
    this.activeTab = 0
    this.router.navigate(['preprocess'], {relativeTo: this.route})
  }

  alphaPrepro(){
    this.activeTab = 1
    this.router.navigate(['preprocessingalpha'], {relativeTo: this.route})
  }

}
