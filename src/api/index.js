import utils from '../utils'


const API_BASE = 'http://127.0.0.1:9999/api/v1'

export default {

    getConfig: (cfg) => {
        cfg = {
            entry: cfg.entry || '',
            params: cfg.params || {}
        }

        return fetch(`${API_BASE}/${cfg.entry}?${utils.serializeParams(cfg.params)}`).then(response => response.json())
    },
    auth: (cfg) => {
        return fetch(`${API_BASE}/auth`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'no-cors',
            body: JSON.stringify({ a: 1, b: 2 })
        })
            .then(response => response.json())
    }
}