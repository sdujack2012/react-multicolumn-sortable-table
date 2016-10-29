// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <amd-dependency path="lib/errorInfoHandler">


let React = require('react');
let ReactDom = require('react-dom');
let _ = require('lodash');

let CSSModules = require('react-css-modules');
let SortByColumnsFunctionGenerator = require('./SortByColumnsFunctionGenerator').SortByColumnsFunctionGenerator;

export let MultiColumnSortableTableRaw = React.createClass({
    
    
    _sortingUtility: new SortByColumnsFunctionGenerator(),

    handleSortingEvent: function (columnName: string) {
        this._sortingUtility.AddSortingColumn(columnName);
        this.forceUpdate();
    },
    

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
                                                  <th key={Field.Name} onClick={() => this.handleSortingEvent(Field.Name) }>{Field.DisplayName===undefined?Field.Name:Field.DisplayName}<span className={Styles[this._sortingUtility.getSortingIcon(Field.Name)]} /></th>  )
                                 }
                                 </tr>
                            </thead>
                            <tbody>
                                    {
                                        _.map(Data,(Row:any) =>
                                            <tr key={Row.Id}>
                                                {
                                                    _.map(Fields,(Field:any)=>
                                                        <td>{Row[Field.Name]}</td>  
                                                    )
                                                }
                                            </tr>
                                       )
                                    }
                                </tbody>
                        </table>     
        );
    }
});

export let MultiColumnSortableTable = (props)=>{
    let {Styles} = props;
    let MultiColumnSortableTableWrapped = CSSModules(MultiColumnSortableTableRaw,Styles||{sortable:''},{errorWhenNotFound:false});

    return (

        <MultiColumnSortableTableWrapped {...props}/>
    );


}
    
 

