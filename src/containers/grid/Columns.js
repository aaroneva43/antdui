import React, { Component } from 'react'

import { Icon } from 'antd'
import style from './Grid.css'


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
            debugger
            return (
                <span className={style.actionWrapper}>
                    <span title="Edit" >
                        <Icon type="edit" action="edit" className={style.actionIcon} onClick={this.handleOnForm.bind(this, scope)} />
                        {/* <i className="" onClick={this.handleOnForm.bind(this, suope, 'edit')} ></i> */}
                    </span>{' '}
                    <span title="Delete">
                        <Icon type="delete" className={style.actionIcon} onClick={this.deleteRow.bind(this, scope, 'edit')} />
                        {/* <i className="" onClick={this.deleteRow.bind(this, scope)}></i> */}
                    </span>{' '}
                    <span title="Copy">
                        <Icon type="copy" className={style.actionIcon} />
                    </span>{' '}
                </span>
            );
        },
        title: '',
        sortable: false,
        width: 75
    }
}

