import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../data-services.service';
import {NgForm} from '@angular/forms';
import { LogHeader } from '../log-header';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-preprocessing-alpha',
  templateUrl: './preprocessing-alpha.component.html',
  styleUrls: ['./preprocessing-alpha.component.css']
})
export class PreprocessingAlphaComponent implements OnInit {

  // Progress Bar
  private value = 10
  // Change ID
  private changeReady = false
  private changeColumn
  // Alias
  private aliasReady = false
  private aliasColumn
  private aliasData
  private aliasChoosenColumn
  private selectedValueAlias
  private aliasValue: Array<String> = []
  private newColumn = false
  // Choose
  private chooseData
  private chooseReady = false
  // Button
  private clicked = false

  // asd
  private chooseColumn

  constructor(private dataService: DataServicesService, private router: Router, private titleService: Title, private snackbar: MatSnackBar) {
    this.titleService.setTitle('Preprocess Data')
  }

  ngOnInit() {
    this.value = 25
    // Convert Time
    this.dataService.getChangeCaseId().subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        this.changeColumn = data.data
        console.log(this.changeColumn)
        this.changeReady = true
      } else {
        this.snackbar.open(data.message, '', {
          duration: 3000
        })
      }
      this.value = 100
    })
  }

  stepChange(event){
    this.value = 25
    if (event.selectedIndex == 0) {
      this.changeReady = false
      this.dataService.getChangeCaseId().subscribe((data: any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.changeColumn = data.data
          console.log(this.changeColumn)
          this.changeReady = true
        } else {
          this.snackbar.open(data.message, '', {
            duration: 3000
          })
        }
        this.value = 100
      })
    } else if (event.selectedIndex == 1) {
      this.dataService.preprocessHead().subscribe((data: any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.chooseData = data.data
          this.chooseReady = true
        } else {
          this.snackbar.open(data.message, '', {
            duration: 3000
          })
        }
        this.value = 100
      })
    }
  }

   // CHANGE
   submitChange(change: NgForm) {
     console.log(change)
    this.value = 25
    let data = JSON.stringify(
      {
        'data': change.value
      }
      )

      this.dataService.sendChangeCaseId(data).subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        change.resetForm()
        this.changeColumn = data.data
      }
      this.snackbar.open(data.message, '', {
        duration: 3000
      })
      this.value = 100
    })
  }

  // CHOOSE
  submitChoose(choose: NgForm) {
    if (choose.valid) {
      this.value = 25
      let case_id = choose.value.case_id
      let event = choose.value.event
      let timestamp = choose.value.timestamp
      let formData = new FormData()
      formData.append('case_id', case_id)
      formData.append('event', event)
      this.value = 50
      this.dataService.alphaChoose(formData).subscribe((data: any) => {
        data = JSON.parse(data)
        this.value - 75
        if (data.status == 'success') {
          this.router.navigate(['display'])
        }
        this.snackbar.open(data.message, '', {
          duration: 3000
        })
        this.value = 100
      })
    }
  }

}
