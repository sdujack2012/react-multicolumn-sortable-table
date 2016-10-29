
let _ = require('lodash');
var firstBy = require('thenby');


export class SortByColumnsFunctionGenerator {
    constructor() {
        this.SortingColumns = {};
    }
    SortingColumns: any;
    Clear() {
        this.SortingColumns = {};
    }
    AddSortingColumn(columnName: string) {
        var Column = this.SortingColumns[columnName];
        if (this.SortingColumns[columnName]) {
            if (this.SortingColumns[columnName].Asc)
                this.SortingColumns[columnName].Asc = false;
            else delete this.SortingColumns[columnName];
        }
        else {
            this.SortingColumns[columnName] = { Column: columnName, Asc: true }
        }
    }
    getSortingFunction() {
        var sortingFunction = null;
        _.forEach(this.SortingColumns, function (value, key) {
            if (!sortingFunction) {
                sortingFunction = firstBy(value.Column, value.Asc || -1);
            }
            else {
                sortingFunction = sortingFunction.thenBy(value.Column, value.Asc || -1)
            }
        });

        return sortingFunction;
    }

    getSortingIcon(columnName: string) {
        var Column = this.SortingColumns[columnName];
        if (this.SortingColumns[columnName]) {
            if (this.SortingColumns[columnName].Asc)
                return "<i styleName='sort-asc'></i>";
            else return "<i styleName='sort-asc'></i>";
        }
        else {
            return "<i styleName='sort'></i>";
        }
    }
    getSortingColumns() {
        return this.SortingColumns;
    }
    

}