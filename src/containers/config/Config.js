import React, { Component } from 'react';
import Grid from '../../views/grid/Grid';
import Widget from '../../widget/Widget';

// redux stuff
import { connect } from 'react-redux';

class Config extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widget: null,
            gid: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.store.ConfigData.MenuPieces &&
            nextProps.store.ConfigData.GidNodeMap
        ) {
            const modules = nextProps.store.ConfigData.MenuPieces;
            this.setGidWidget(Object.values(nextProps.match.params), modules, nextProps);
        }
    }

    setGidWidget(params, modules, props) {
        const param = params.shift();
        let module = modules[param];

        if (typeof module === 'undefined') {
            module = modules.find(function (item) {
                return item.name === param;
            });
        }

        if (module.children) {
            this.setGidWidget(params, module.children, props);
        } else if (module.modules) {
            this.setGidWidget(params, module.modules, props);
        } else {
            if (module.gid) {
                this.setState({ gid: module.gid, widget: null });
            } else if (module.widget) {
                this.setState({ widget: module.widget, gid: null });
            }
        }
    }

    render() {
        return (
            <div> {this.state.gid ? <Grid gid={this.state.gid} /> : <Widget widget={this.state.widget} />}  </div>
        );
    }
}

export default Config;
