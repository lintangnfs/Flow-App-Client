import { Component, OnInit, ViewChild } from '@angular/core';
import { DataServicesService } from '../data-services.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

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
  private split_pairs
  private final_pairs
  private pairss

  private relationData
  private displayedColumnsRelation
  private columnsToDisplayRelation

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  @ViewChild(MatPaginator) paginatorRelation: MatPaginator
  @ViewChild(MatSort) sortRelation: MatSort

  constructor(private dataService: DataServicesService, private snackbar: MatSnackBar, private _sanitizer: DomSanitizer) {
    
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
        // Transition
        this.transition = data.data.transition
        // this.transition = this.transition.replace()

        this.initialTransition = data.data.initialTransition
        this.finalTransition = data.data.finalTransition
        this.relation = data.data.relation

        // Pair edit view
        this.split_pairs = data.data.pairs
        this.pairs = this.split_pairs.replace('[{"pairs":' , '')
        this.pairs = this.pairs.replace('}]', '')
        this.pairs = this.pairs.replace(/]]/g, ']')
        this.pairs = this.pairs.replace(/\[\[/g, '[')
        this.final_pairs = this.pairs.split('}, {"pairs":')

        // Maximal Pairs edit view
        this.maximalPairs = data.data.maximalPairs
        this.maximalPairs = this.maximalPairs.replace('[{"pairs":' , '')
        this.maximalPairs = this.maximalPairs.replace('}]', '')
        this.maximalPairs = this.maximalPairs.replace(/]]/g, ']')
        this.maximalPairs = this.maximalPairs.replace(/\[\[/g, '[')
        this.maximalPairs = this.maximalPairs.split('}, {"pairs":')

        // Places Edit view
        this.places = data.data.places
        this.places = this.places.replace('[{"pairs":' , '')
        this.places = this.places.replace('}]', '')
        this.places = this.places.replace(/]]/g, ']')
        this.places = this.places.replace(/\[\[/g, '[')
        this.places = this.places.split('}, {"pairs":')

        this.image = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + data.data.image)

        // Relation display
        this.relationData = new MatTableDataSource(data.data.relation_data)
        this.relationData.paginator = this.paginatorRelation
        this.relationData.sort = this.sortRelation
        this.displayedColumnsRelation = data.data.relation_column
        this.columnsToDisplayRelation = this.displayedColumnsRelation.slice()
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
