import { GET_STATICS, GET_MENU } from './actionTypes'
import cookie from 'js-cookie'
import _ from 'lodash'

export const getStatics = (url) => ({
    type: GET_STATICS,
    payload: _.castArray(url).map((itm) => {
        return {
            entry: itm.split('/').pop().split('.').shift(), // use file name as entry name
            url: itm

        }
    })
})

export const getMenu = (menu, menuPieces) => ({
    type: GET_MENU,
    payload: generateMenuData1(menu, menuPieces)
})

const generateMenuData1 = (menu, menuPieces) => {

    const menuData = []

    try {
        menu['vdom_disabled'].forEach((itm) => {
            menuData.push(menuPieces[itm])
        })

    } catch (error) {
        console.error(error)
    }

    return menuData
}

const generateMenuData = (menu, menuPieces) => {
    let uiData = []

    let getChild2 = (pieces, prop2) => {
        let url = `/config/${pieces.name}/${prop2.name}`;
        if (prop2.modules) {
            url += `/${prop2.modules[0].name}`;
        }
        return {
            name: prop2.text,
            url: url
        };
    }

    let getChild3 = (pieces, prop2, prop3) => {
        let url = `/config/${pieces.name}/${prop2.name}/${prop3.name}`;
        if (prop3.modules) {
            url += `/${prop3.modules[0].name}`;
        }
        return {
            name: prop3.text,
            url: url
        };
    }

    menu.vdom_disabled.forEach(function (prop) {
        let obj = {
            name: menuPieces[prop].text,
            url: `/${menuPieces[prop].name}`,
            icon: 'icon-speedometer',
            children: []
        };
        menuPieces[prop].children.forEach(function (prop2) {
            if (prop2.children) {
                obj.children.push({
                    name: prop2.text,
                    title: prop2.text
                });
                prop2.children.forEach(function (prop3) {
                    obj.children.push(getChild3(menuPieces[prop], prop2, prop3));
                });
            } else {
                obj.children.push(getChild2(menuPieces[prop], prop2));
            }
        });
        uiData.push(obj);
    });

    return uiData
}