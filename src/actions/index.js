import * as actions from './actionTypes'

export const login = (payload) => ({
    type: actions.LOGIN,
    payload
})

export const getConfig = (url) => ({
    type: actions.GET_CONFIG,
    payload: {
        entry: url
    }
})

/**
 * 
 * @param {String} type 'create'/'edit'
 * @param {Object} cfg ex. {gid: 123, data: {name:'xx', ...}}
 */
export const configEntry = (type, cfg) => {
    return {
        type: type == 'edit' ? actions.CONFIG_ENTRY_EDIT : actions.CONFIG_ENTRY_ADD,
        payload: cfg
    }
}
