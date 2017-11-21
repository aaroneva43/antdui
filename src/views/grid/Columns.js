import React, { Component } from 'react';

export function Availability() {
    return {
        Cell: ({ original }) => {
            let classes = 'fa fa-check-circle text-' + original.availability;
            return (
                <span title={original.availability}>
                    <i className={classes}></i>
                </span>
            );
        },
        Header: 'Availability',
        accessor: 'availability'
    };
}

export function Action(cols) {
    return {
        render: ({ scope }) => {
            return (
                <span>
                    <span title="Edit">
                        <i className="fa fa-pencil" onClick={this.handleOnForm.bind(this, scope, 'edit')} ></i>
                    </span>{' '}
                    <span title="Delete">
                        <i className="fa fa-times" onClick={this.deleteRow.bind(this, scope)}></i>
                    </span>{' '}
                    <span title="Copy">
                        <i className="fa fa-copy"></i>
                    </span>{' '}
                </span>
            );
        },
        title: 33333,
        sortable: false,
        width: 75
    }
}

