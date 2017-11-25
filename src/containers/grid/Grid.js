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
import { Table, Button, Icon } from 'antd'

import { Action } from './Columns'

import style from './Grid.css'

import { configEntry } from '../../actions'

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

        const { statics, gid } = this.props
        const moduleInfo = getModuleInfo(gid, statics);

        this.setState({ gid, moduleInfo: moduleInfo });
        this.setColumns(moduleInfo.columns)

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

    handleOnForm(event, record, index) {
        const { configEntry } = this.props

        const action = event.target.getAttribute('action')

        configEntry(action || 'create', _.merge({ gid: 22 }, action == 'edit' ? record : {}))


    }
    deleteRow() { }

    setColumns(cols) {
        let me = this

        if (cols) {
            let columns = cols.map(function (col) {
                if (col.cell === 'action') {
                    return {
                        render: ({ text, record }) => {

                            return (
                                <span className={style.actionWrapper}>
                                    <span title="Edit" >
                                        <Icon type="edit" action="edit" className={style.actionIcon} />
                                    </span>
                                    <span title="Delete">
                                        <Icon type="delete" className={style.actionIcon} onClick={me.deleteRow} />
                                    </span>
                                    <span title="Copy">
                                        <Icon type="copy" className={style.actionIcon} />
                                    </span>
                                </span>
                            );
                        },
                        title: '',
                        sortable: false,
                        width: 75
                    }
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

        const me = this

        const { columns } = this.state
        const { gid } = this.props

        // if (_.isEmpty(columns) || _.isEmpty(gid)) return (<div />)

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
        const data = [
            { "mkey": "admin", "passwd": "$1$61c82717$nxiwMC7FXoJIpcuqfFgty0", "theme": "", "trusted-host": "0.0.0.0\/0 ::\/0 ", "auth_stratgey": "local", "auth_radius_server_id": "", "auth_ldap_server_id": "", "profile": "super_admin_prof", "hidden": 0, "vdom": "root ", "is-system-admin": "yes", "wildcard": "disable", "_nondeletable": 1, "_noneditable": 0 },
            { "mkey": "seuser", "passwd": "$1$5712703e$AHawn.D\/RO1TEhFI9ekIA0", "theme": "", "trusted-host": "0.0.0.0\/0 ::\/0 ", "auth_stratgey": "local", "auth_radius_server_id": "", "auth_ldap_server_id": "", "profile": "seuser", "hidden": 0, "vdom": "root ", "is-system-admin": "no", "wildcard": "disable", "_nondeletable": 0, "_noneditable": 0 },
            { "mkey": "demo", "passwd": "$1$dd47a1cc$Dkh1HY.X2ZYEsiAV24Rwt\/", "theme": "", "trusted-host": "0.0.0.0\/0 ::\/0 ", "auth_stratgey": "radius", "auth_radius_server_id": "HA_FAC", "auth_ldap_server_id": "", "profile": "demo", "hidden": 0, "vdom": "root ", "is-system-admin": "no", "wildcard": "disable", "_nondeletable": 0, "_noneditable": 0 },
            { "mkey": "erezy", "passwd": "$1$9ec15b29$IqAjijAIEMci5mqQaXCla0", "theme": "", "trusted-host": "0.0.0.0\/0 ::\/0 ", "auth_stratgey": "local", "auth_radius_server_id": "", "auth_ldap_server_id": "", "profile": "erez", "hidden": 0, "vdom": "root ", "is-system-admin": "no", "wildcard": "disable", "_nondeletable": 0, "_noneditable": 0 }
        ]

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };

        return (
            <div className={style.gridPage}>
                <div className={style.toolbar}>
                    <Button action="create" icon="file-add" onClick={me.handleOnForm.bind(me)}> Add</Button>
                    <Button action="delete" icon="delete" color="primary"> Delete</Button>
                    <Button action="reload" icon="reload" color="primary"> Refresh</Button>
                </div>

                <div className="table">
                    <Table


                        rowKey='mkey'
                        onRowClick={(record, index, event) => { me.handleOnForm(event, record, index) }}
                        bordered
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={data}
                        onChange={this.handleChange}
                        pagination={{ pageSize: 2 }}
                    />
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
    { configEntry })(Grid);

// export default Grid;
