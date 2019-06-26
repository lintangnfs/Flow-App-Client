import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../data-services.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-algoritma',
  templateUrl: './algoritma.component.html',
  styleUrls: ['./algoritma.component.css']
})
export class AlgoritmaComponent implements OnInit {

  private title = 'Display Data'
  public fullLog
  private eventLog
  private isHidden = true
  public isDisabled = true
  private activeTab
  private display = 'true'
  public displayedColumns
  public columnsToDisplay
  private value = 10

  constructor(private dataService: DataServicesService, private snackbar: MatSnackBar) {
    
  }

  ngOnInit() {
    // TODO: add progress bar
    this.value = 25
    this.dataService.display().subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
      this.fullLog = data.data
      } else {
        console.log(data)
      }
      this.snackbar.open(data.message, '', {
        duration: 3000
      })
      this.value = 100
    })
  }

  raw() {
    // TODO: add progress bar in between changing displaying raw and final file
    this.eventLog = new MatTableDataSource(this.fullLog.final.data)
    this.displayedColumns = this.fullLog.raw.head
    this.columnsToDisplay = this.displayedColumns.slice()
    this.display = 'true'
    this.isHidden = false
  }

}
