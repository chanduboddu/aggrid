import {Component, ViewChild, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
const users = 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json';

@Component({
    selector: 'app-grid',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    columnDefs;
    defaultColDef;
    rowData;
    topOptions = {alignedGrids: []};
    bottomOptions = {alignedGrids: []};
    @ViewChild('topGrid') topGrid;
    @ViewChild('bottomGrid') bottomGrid;

    bottomData = [
        {
            athlete: 'Total',
            age: '15 - 61',
            country: 'Ireland',
            year: '2020',
            date: '26/11/1970',
            sport: 'Synchronised Riding',
            gold: 55,
            silver: 65,
            bronze: 12
        }
    ];

    constructor(private http: HttpClient) {
        this.columnDefs = [
            {headerName: 'Athlete', field: 'athlete', width: 200},
            {headerName: 'Age', field: 'age', width: 100},
            {headerName: 'Country', field: 'country', width: 150},
            {headerName: 'Year', field: 'year', width: 120},
            {headerName: 'Sport', field: 'sport', width: 200},
            // in the total col, we have a value getter, which usually means we don't need to provide a field
            // however the master/slave depends on the column id (which is derived from the field if provided) in
            // order ot match up the columns
            {
                headerName: 'Total',
                field: 'total',
                valueGetter: 'data.gold + data.silver + data.bronze',
                width: 200
            },
            {headerName: 'Gold', field: 'gold', width: 100, editable: true},
            {headerName: 'Silver', field: 'silver', width: 100, editable: true},
            {headerName: 'Bronze', field: 'bronze', width: 100, editable: true}
        ];
       this.topOptions.alignedGrids.push(this.bottomOptions);
        this.bottomOptions.alignedGrids.push(this.topOptions);
    }

    ngOnInit() {
        this.http.get(users).subscribe(data => {
            this.rowData = data;
        });
    }

    btSizeColsToFix() {
        this.topGrid.api.sizeColumnsToFit();
        console.log('btSizeColsToFix ');
    }
    onGridReady(params) {
        params.api.sizeColumnsToFit();
    }
}
