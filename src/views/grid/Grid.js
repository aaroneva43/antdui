import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import ReactTable from 'react-table';
import request from 'superagent';
// import { Container, Table, Button } from 'reactstrap';
import { isEmpty } from '../../services/Utils';
// import ModalConfig from '../../containers/ModalConfig/ModalConfig';
import 'react-table/react-table.css';
import { getModuleInfo } from '../../services/Data';
import { AvailabilityCell, ActionsCell, CheckboxCell } from '../../services/Cells';

// redux stuff
import { configEntryAdd, configEntryEdit, configEntryDone, configEntryReset } from '../../actions/processActions';
import { connect } from 'react-redux';

@connect((store) => {
    return {
        store
    };
})

class Grid extends Component {
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
        const moduleInfo = getModuleInfo(this.props.gid, this.props.store.ConfigData);
        this.setState({ gid: this.props.gid, moduleInfo: moduleInfo });
        this.setColumns(moduleInfo.columns);
        // this.fetchGrid('static/config_data/api/' + moduleInfo.module.modelName + '.json');
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.gid !== nextProps.gid) {
            const moduleInfo = getModuleInfo(nextProps.gid, this.props.store.ConfigData);
            this.setState({ gid: nextProps.gid, moduleInfo: moduleInfo });
            this.setColumns(moduleInfo.columns);
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
        const that = this;

        if (typeof cols === 'undefined') return;

        if (cols[0].cell !== 'checkbox') {
            cols.unshift({ cell: 'checkbox' });
        }
        if (cols[cols.length - 1].cell !== 'actions') {
            cols.push({ cell: 'actions' });
        }

        if (!isEmpty(cols)) {
            let colsList = cols.map(function (col) {
                if (col.cell === 'checkbox') {
                    return CheckboxCell.call(that);
                } else if (col.cell === 'actions') {
                    return ActionsCell();
                } else if (col.cell === 'availability') {
                    return AvailabilityCell();
                } else {
                    return { Header: col.label, accessor: col.name };
                }
            });
            this.setState({ columns: colsList });
        }
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
        let newSelected = {};

        if (this.state.selectAll === 0) {
            this.state.data.forEach(x => {
                newSelected[x.mkey] = true;
            });
        }

        this.setState({
            selected: newSelected,
            selectAll: this.state.selectAll === 0 ? 1 : 0
        });
    }

    handleOnAdd(gid) {
        // pass obj with gid
        this.props.configEntryAdd({ gid: gid, modalType: 'form' });
    }

    render() {
        if (!this.state.columns.length) return (<div />);

        return (
            <div className="grid-page">
                <div className="header clearfix">
                    <div className="pull-left">
                        <Button outline color="primary" onClick={this.handleOnAdd.bind(this, this.state.moduleInfo.module.gid)}><i className="fa fa-plus"></i> Add</Button>{' '}
                        <Button outline color="primary"><i className="fa fa-times"></i> Delete</Button>{' '}
                        <Button outline color="primary"><i className="fa fa-refresh"></i> Refresh</Button>
                    </div>
                </div>
                <div className="table">
                    <ReactTable
                        data={this.state.data}
                        columns={this.state.columns}
                        defaultPageSize={10}
                    />
                </div>
                {/* <ModalConfig /> */}
            </div>
        );
    }
}

export default connect(null, { configEntryAdd, configEntryEdit, configEntryDone, configEntryReset })(Grid);
// export default Grid;
