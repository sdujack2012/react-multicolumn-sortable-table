// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <amd-dependency path="lib/errorInfoHandler">


let React = require('react');
let ReactDom = require('react-dom');
let _ = require('lodash');
let fontAwesome = require('font-awesome/css/font-awesome.min.css');
let CSSModules = require('react-css-modules').CSSModules;
let SortByColumnsFunctionGenerator = require('./SortByColumnsFunctionGenerator').SortByColumnsFunctionGenerator;



export let MultiColumnSortableTable = CSSModules(React.createClass({
    
    
    _sortingUtility: new SortByColumnsFunctionGenerator(),

    handleSortingEvent: _.debounce(function (columnName: string) {
        this._sortingUtility.AddSortingColumn(columnName);
        this.setState(this.state);
    }, 300),
    

    render:function() {
        let { Data,Fields,HeaderStyles,RowStyles,TableStyle,Styles } = this.props;
        var sortingFunc = this._sortingUtility.getSortingFunction();
        if(sortingFunc){
            Data.sort(sortingFunc);
        }
           
        return (
                      <table styleName="sortable">
                            <thead>
                                <tr >
                                 {
                                             _.map(Fields,(Field:any)=>
                                                  <th onClick={() => this.handleSortingEvent(Field.Name) }>{Field.DisplayName===undefined?Field.Name:Field.DisplayName}{this._sortingUtility.getSortingIcon(Field.Name) }</th>  )
                                 }
                                 </tr>
                            </thead>
                            <tbody>
                                    {
                                        _.map(Data,(Row:any) =>
                                            <tr key={Row.Id}>
                                                {
                                                    _.map(Fields,(Field:any)=>
                                                        <td>{Row[Field]}</td>  
                                                    )
                                                }
                                            </tr>
                                       )
                                    }
                                </tbody>
                        </table>     
        );
    }
}),fontAwesome);

