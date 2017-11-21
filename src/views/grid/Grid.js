import React, { PureComponent } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
// import ReactTable from 'react-table';
// import request from 'superagent';
// import 'react-table/react-table.css';
import { getModuleInfo } from '../../services/Data';
// import { AvailabilityCell, ActionsCell, CheckboxCell } from '../../services/Cells';

// redux stuff
// import { configEntryAdd, configEntryEdit, configEntryDone, configEntryReset } from '../../actions/processActions';
import { connect } from 'react-redux'

import _ from 'lodash'
import { Table, Button } from 'antd'

import { Action } from './Columns'

class Grid extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [],
            gid: null,
            selected: {},
            selectAll: 0,
            modalShow: false,
            moduelInfo: {}
        };

        this.toggleRow = this.toggleRow.bind(this);
    }

    componentDidMount() {

        const { statics } = this.props
        // const moduleInfo = getModuleInfo(this.props.gid, statics);
        // this.setState({ gid: this.props.gid, moduleInfo: moduleInfo });
        // this.setColumns(moduleInfo.columns);
        // this.fetchGrid('static/config_data/api/' + moduleInfo.module.modelName + '.json');
    }

    componentWillReceiveProps(nextProps) {
        const { statics } = this.props
        if (this.props.gid !== nextProps.gid && !_.isEmpty(statics)) {
            const moduleInfo = getModuleInfo(nextProps.gid, statics)

            // this.setState({ gid: nextProps.gid, moduleInfo: moduleInfo });
            this.setColumns(moduleInfo.columns)
            // this.fetchGrid('static/config_data/api/' + moduleInfo.module.modelName + '.json');
        }
    }

    // fetchGrid(api_url) {
    //     request
    //         .get(api_url)
    //         .set('Accept', 'application/json')
    //         .end((err, res) => {
    //             if (err) {
    //                 // dispatch(fetchGridFailure(err));
    //             } else {
    //                 this.setState({ data: res.body.payload });
    //             }

    //         });
    // }

    setColumns(cols) {
        let me = this

        if (cols) {
            let columns = cols.map(function (col) {
                if (col.cell === 'actions') {
                    return Action.call(me)
                } else if (col.cell === 'availability') {
                    // return AvailabilityCell();
                } else {
                    return { title: col.label, dataIndex: col.name };
                }
            });
            this.setState({ columns });
        }

        return []
        // const that = this;

        // if (typeof cols === 'undefined') return;

        // if (cols[0].cell !== 'checkbox') {
        //     cols.unshift({ cell: 'checkbox' });
        // }
        // if (cols[cols.length - 1].cell !== 'actions') {
        //     cols.push({ cell: 'actions' });
        // }

        // if (cols) {
        //     let colsList = cols.map(function (col) {
        //         if (col.cell === 'checkbox') {
        //             // return CheckboxCell.call(that);
        //         } else if (col.cell === 'actions') {
        //             // return ActionsCell();
        //         } else if (col.cell === 'availability') {
        //             // return AvailabilityCell();
        //         } else {
        //             return { Header: col.label, accessor: col.name };
        //         }
        //     });
        //     this.setState({ columns: colsList });
        // }
    }

    toggleRow(firstName) {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[firstName] = !this.state.selected[firstName];
        this.setState({
            selected: newSelected,
            selectAll: 2
        });
    }

    toggleSelectAll() {
        // let newSelected = {};

        // if (this.state.selectAll === 0) {
        //     this.state.data.forEach(x => {
        //         newSelected[x.mkey] = true;
        //     });
        // }

        // this.setState({
        //     selected: newSelected,
        //     selectAll: this.state.selectAll === 0 ? 1 : 0
        // });
    }

    handleOnAdd(gid) {
        // pass obj with gid
        // this.props.configEntryAdd({ gid: gid, modalType: 'form' });
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    render() {

        const { columns } = this.state

        // if (_.isEmpty(columns)) return (<div />)

        // const columns = [{
        //     title: 'Name',
        //     dataIndex: 'name',
        //     render: text => <a href="#">{text}</a>,
        // }, {
        //     title: 'Age',
        //     dataIndex: 'age',
        // }, {
        //     title: 'Address',
        //     dataIndex: 'address',
        // }];
        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }, {
            key: '4',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        }];

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };

        return (
            <div className="grid-page">
                <div className="header clearfix">
                    <div className="pull-left">
                        {/* <Button outline color="primary" onClick={this.handleOnAdd.bind(this, this.state.moduleInfo.module.gid)}><i className="fa fa-plus"></i> Add</Button>{' '}
                        <Button outline color="primary"><i className="fa fa-times"></i> Delete</Button>{' '}
                        <Button outline color="primary"><i className="fa fa-refresh"></i> Refresh</Button> */}
                    </div>
                </div>
                <div className="table">
                    <Table bordered rowSelection={rowSelection} columns={columns} dataSource={data} onChange={this.handleChange} />
                    {/* <ReactTable
                        data={this.state.data}
                        columns={this.state.columns}
                        defaultPageSize={10}
                    /> */}
                </div>
                {/* <ModalConfig /> */}
            </div>
        );
    }
}

export default connect(
    (state) => {

        return { statics: _.get(state, 'statics') }
    },
    { /* configEntryAdd, configEntryEdit, configEntryDone, configEntryReset */ })(Grid);

// export default Grid;
