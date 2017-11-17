import { CONFIG_ENTRY_ADD, CONFIG_ENTRY_EDIT, CONFIG_ENTRY_CLOSE, CONFIG_ENTRY_RESET } from './processTypes';

export function configEntryAdd(obja) {
    return {
        type: CONFIG_ENTRY_ADD,
        obj: obja
    }
}

export function configEntryEdit(obja) {
    return {
        type: CONFIG_ENTRY_EDIT,
        obj: obja
    }
}

export function configEntryDone() {
    return {
        type: CONFIG_ENTRY_CLOSE
    }
}

export function configEntryReset() {
    return {
        type: CONFIG_ENTRY_RESET
    }
}