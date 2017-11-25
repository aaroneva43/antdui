import React, { Component } from 'react';
// import DisplayModal from '../../components/Modal/';
// import { configEntryAdd, configEntryEdit, configEntryDone, configEntryReset } from '../../actions/processActions';
// import { addFormData } from '../../actions/formActions';
// import Form from '../../components/Form/Form';
import { getModuleInfo } from '../../services/Data';

import { connect } from 'react-redux';

class ModalConfig extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prevMove: false,
            nextMove: false,
            leftBtnText: 'Cancel',
            rightBtnText: 'Save',
            leftBtnDisabled: false,
            rightBtnDisabled: false

        };
    }

    componentWillMount() {
        /*  this.props.dispatch(configEntryReset());
         this.setState({ lastGiveObj: this.props.givenObj }); */
    }

    componentWillReceiveProps(nextProps) {
        //console.log('mmmfff nextProps ===> ', nextProps)
        /* let newObj = nextProps.givenObj,
            oldObj = this.props.operConfigEntry.stackObjArray[this.props.operConfigEntry.stackObjArray.length - 1],
            nextObj = nextProps.operConfigEntry.stackObjArray[nextProps.operConfigEntry.stackObjArray.length - 1];
        console.log('dave oldObj ===> ', oldObj, ' newObj ===> ', nextObj);

        if (
            typeof newObj !== 'undefined' &&
            newObj !== null &&
            typeof this.state.lastGiveObj !== 'undefined' &&
            this.state.lastGiveObj !== null
        ) {
            if (newObj.id !== this.state.lastGiveObj.id) {
                this.setState({ lastGiveObj: newObj });
                this.props.dispatch(configEntryReset());
            }
            if (this.props.show === false && nextProps.show === true) {
                if (nextProps.add === true) {
                    this.props.dispatch(configEntryAdd(newObj));
                    if (typeof this.props.wizard !== 'undefined') {
                        if (this.state.leftBtnDisabled === true) {
                            this.setState({ leftBtnText: 'Cancel' });
                        }
                        if (this.state.rightBtnDisabled === true) {
                            this.setState({ rightBtnText: 'Save' });
                        }
                        else {
                            this.setState({ rightBtnText: 'Next' });
                        }
                    }
                }
                else {
                    this.props.dispatch(configEntryEdit(newObj));
                    this.setState({ leftBtnText: 'Cancel', rightBtnText: 'Save', leftBtnDisabled: false, rightBtnDisabled: false });
                }
            }

            if ((typeof oldObj !== 'undefined') && (typeof nextObj !== 'undefined')) {
                if (this.state.lastGiveObj.id === oldObj.id && this.state.lastGiveObj.id !== nextObj.id) {
                    if (nextProps.add === true && typeof this.props.wizard !== 'undefined') {
                        this.setState({ leftBtnText: 'Cancel', rightBtnText: 'Save', leftBtnDisabled: false, rightBtnDisabled: false });
                    }
                }
                if (this.state.lastGiveObj.id !== oldObj.id && this.state.lastGiveObj.id === nextObj.id) {
                    if (nextProps.add === true && typeof this.props.wizard !== 'undefined') {
                        if (this.state.leftBtnDisabled === true) {
                            this.setState({ leftBtnText: 'Cancel' });
                        }
                        if (this.state.rightBtnDisabled === true) {
                            this.setState({ rightBtnText: 'Save' });
                        }
                    }
                }
            }
        } */

    }

    handleSubmits(values) {
        /*  
         let formName = Object.keys(this.props.store.form).toString();
         console.log('dave formName ==> ', formName)
         let formValues = this.props.store.form.formname2.values;
 
 
         let localArray = localStorage.getItem('data');
         ///console.log('localArray ==> ', localArray, ' - ', typeof localArray);
         let dataArray = [];
 
         if (localArray === null) {
             dataArray.push(formValues);
         } else {
             dataArray = JSON.parse(localArray);
             dataArray.push(formValues);
         }
 
         let cleanedDataArray = JSON.stringify(dataArray);
         // I think this need to be in action creator:
         localStorage.setItem("data", cleanedDataArray);
 
         this.props.dispatch(configEntryDone());
         this.props.dispatch(addFormData(formName, cleanedDataArray)); */
    }

    render() {

        return ''/* 
        let viewObj;
        let lgTitle;
        let lgContent;
        let children = {};

        const { operConfigEntry } = this.props;
        const divProps = Object.assign({}, this.props);
        delete divProps.layout;

        viewObj = operConfigEntry.stackObjArray[operConfigEntry.stackObjArray.length - 1];
        if (typeof viewObj === 'undefined' || viewObj === null) {
            return null;
        }


        lgTitle = viewObj.title;

        const lgProps = {
            ref: viewObj.gid,
            onSubmit: this.handleSubmits.bind(this),
            add: viewObj.addView,
            value: viewObj.valueObj
        }

        let stack = this.props.operConfigEntry.stackObjArray;
        let gid = stack[stack.length - 1].gid;
        let moduleInfo = getModuleInfo(gid, this.props.store.ConfigData);
        ///this.setState({ moduleInfo: getModuleInfo(gid, divProps.store.ConfigData) });
        ///console.log('moduleInfo ===> ', moduleInfo)

        lgContent = stack.length ? <Form gid={gid} {...lgProps} moduleInfo={moduleInfo} /> : '';
        lgTitle = stack.length ? stack[stack.length - 1].gid : null;
        children = moduleInfo.children;

        let stackarray;
        if (stack.length > 1) {
            stackarray = (
                <ul className="circle-step">
                    {stack.map((result, index) => (
                        <li key={index} className={(index == stack.length - 1) && 'active'}>{result.gid}</li>
                    ))}
                </ul>
            );
        }

        return (
            <DisplayModal
                isOpen={this.props.operConfigEntry.modalShow}
                stackarray={stackarray}
                onTitle={lgTitle}
                onContent={lgContent}
                children={children}
            />
        ) */
    }
}

export default connect(
    state => ({ operConfigEntry: state.operConfigEntry })
)(ModalConfig);
