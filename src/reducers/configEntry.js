/**
 * handle the config-editing-modal states
 * 
 * @auther aaron xie
 * @copyright fortinet Inc.
 */

import { CONFIG_ENTRY_ADD, CONFIG_ENTRY_EDIT, CONFIG_ENTRY_CLOSE } from '../actions/actionTypes'
import reducerGenerator from './reducerGenerator'


const initialState = {
    stack: [],
    hidden: true
}

export default function configEntry(state = initialState, action) {
    let obj = action.payload
    let stack = state.stack

    if ([CONFIG_ENTRY_ADD, CONFIG_ENTRY_EDIT].includes(action.type)) {
        if (obj !== undefined) {
            // obj.addView = true;
            return { stack: [...stack, obj], hidden: false }
        }
    }

    // else if (CONFIG_ENTRY_CLOSE === action.type) {
    //     if (state.stackObjArray.length > 0) {
    //         let show = false;
    //         stackArray.pop();

    //         if (stackArray.length > 0) {
    //             show = true;
    //         }

    //         return { stackObjArray: stackArray, modalShow: show };
    //     }
    // }
    // else if (CONFIG_ENTRY_RESET === action.type) {
    //     return cfgInitialState;
    // }

    return state;

}