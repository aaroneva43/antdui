import utils from '../utils'


const API_BASE = 'http://127.0.0.1:9999/api/v1'
const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
}

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
            headers: headers,
            body: JSON.stringify(cfg)
        })
            .then(response => response.json())
    },
    login: (cfg) => {
        return fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(cfg)
        })
            .then(response => response.json())
    },
    statics: (cfg) => {
        return fetch(`${API_BASE}/${cfg.url}`, { headers: headers }).then(response => response.json())
    }
}