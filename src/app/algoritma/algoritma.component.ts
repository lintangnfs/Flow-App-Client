import { Component, OnInit, ViewChild } from '@angular/core';
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
  private isHidden = false
  public isDisabled = false
  private activeTab
  private display = 'true'
  public displayedColumns
  public columnsToDisplay
  private value = 10

  private transition
  private initialTransition
  private finalTransition
  private relation
  private pairs
  private maximalPairs
  private places
  private image

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private dataService: DataServicesService, private snackbar: MatSnackBar) {
    
  }

  ngOnInit() {
    // TODO: add progress bar
    this.value = 25
    this.dataService.getAlphaData().subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      console.log(data)
      if (data.status == 'success') {
        // Data display
        this.eventLog = new MatTableDataSource(data.data.data)
        this.eventLog.paginator = this.paginator
        this.eventLog.sort = this.sort
        this.displayedColumns = data.data.column
        this.columnsToDisplay = this.displayedColumns.slice()
        this.display = 'block'
        this.isHidden = false
        // Transition dkk
        this.transition = data.data.transition
        this.initialTransition = data.data.initialTransition
        this.finalTransition = data.data.finalTransition
        this.relation = data.data.relation
        this.pairs = data.data.pairs
        this.maximalPairs = data.data.maximalPairs
        this.places = data.data.places
        this.image = atob(data.data.image)
        console.log(this.image)
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
    this.display = 'none'
    this.isHidden = false
  }

}
