import _ from 'lodash';

export function ExtendModuleNode(gidNode, macroGidMap, macroNameMap) {
    console.log('======== Extend module node ========');
    _.each(macroNameMap, function (name, macro) {
        var gid = macroGidMap[macro];
        if (!gid) {
            console.log('No gid mapped to macro', macro);
            return;
        }
        var node = gidNode[gid];
        if (!node) {
            console.log('No node mapped to gid', gid);
            return;
        }
        if (node.nodetype === 'TABLE' || node.nodetype === 'COMPLEX') {
            var parts = [];
            // urlParts = [];
            if (node.path) {
                parts.push(node.path);
                // urlParts = node.path.split(' ');
            } else {
                var found = true;
                var parentNode = node;
                do {
                    if (!parentNode.parentGid) {
                        console.log('This node has no \'parentGid\'', parentNode);
                        found = false;
                        break;
                    }
                    parentNode = gidNode[parentNode.parentGid];
                    if (!parentNode) {
                        console.log('No node mapped to gid', parentNode.parentGid);
                        found = false;
                        break;
                    }
                } while (parentNode.nodetype !== 'TABLE' && parentNode.nodetype !== 'COMPLEX');

                if (found) {
                    if (parentNode.path) {
                        parts.push(parentNode.path);
                        // urlParts = parentNode.path.split(' ');
                    } else {
                        console.log('This node has no \'path\'', parentNode);
                    }
                    if (parentNode.name) {
                        parts.push(parentNode.name);
                        // urlParts.push(parentNode.name);
                    } else {
                        console.log('This node has no \'name\'', parentNode);
                    }
                    parts.push('child');
                }
            }
            parts.push(node.name);
            var modelName = parts.join(' ');
            modelName = _.trim(modelName).split(' ').join('-').toLowerCase()
            modelName = modelName.replace(/-/g, '_');
            node.modelName = modelName;
            node.moduleName = name;

            if (!_.includes(parts, 'child')) {
                var phpClassName = parts.join('_');
                phpClassName = _.trim(phpClassName).split('_').map(itm => _.upperFirst(itm)).join('')
                node.phpClassName = phpClassName;
            }

            // console.log('julian funcs node2', _.clone(node));
            // console.log('julian funcs node2', _.clone(node.parseflag));
            // if (node.parseflag) {
            //   node.parseflag = node.parseflag.split(',');
            // }
        }
    });

    return gidNode
}

export function ExtendFieldNode(gidNode, macroGidMap, moduleFieldsMap) {
    console.log('======== Extend field node ========');
    _.each(moduleFieldsMap, function (fields, moduleName) {
        _.each(fields, function (field) {
            var fieldName = field.fieldName,
                macro = field.attrgid;
            if (!macro) {
                console.log('No \'attrgid\' for field', fieldName, 'of module', moduleName);
                return;
            }
            var gid = macroGidMap[macro];
            if (!gid) {
                console.log('No gid mapped to macro', macro);
                return;
            }
            var node = gidNode[gid];
            if (!node) {
                console.log('No node mapped to gid', gid);
                return;
            }

            _.extend(node, field);

            if (node.parseflag && typeof (node.parseflag) === 'string') {
                node.parseflag = node.parseflag.split(',');
            }

            if (node.nodetype === 'TABLENAME') {
                var parentGid = node.parentGid;
                if (!parentGid) {
                    console.log('This \'TABLENAME\' node has no \'parentGid\'', node);
                    return;
                }
                var parentNode = gidNode[parentGid];
                if (!parentNode) {
                    console.log('No node mapped to gid', parentGid);
                    return;
                }
                if (parentNode.nodetype === 'TABLE') {
                    parentNode.mkeyField = fieldName;
                } else {
                    console.log('This \'TABLENAME\' node\'s parent node is not a \'TABLE\'', node);
                }
            }
        });
    });

    return gidNode
}

export function ExtendNodeConditions(gidNode, conditions) {
    console.log('======== Extend node with conditions ========');
    _.each(conditions, function (conditions, gid) {
        var node = gidNode[gid];
        if (!node) {
            console.log('No node mapped to gid', gid);
            return;
        }
        var dependees = [],
            _conditions = [];
        _.each(conditions, function (condition) {
            var _condition = condition.split(' '),
                dependee_gid = _condition[0],
                operator = _condition[1],
                value = _condition[2],
                dependee_node = gidNode[dependee_gid];
            if (!dependee_node) {
                console.log('Unable to get dependee node: no node mapped to gid', dependee_gid);
                console.log('Ignore condition', condition, 'of', gid);
                return;
            }
            var dependee_fieldname = dependee_node.fieldName;
            if (!dependee_fieldname) {
                console.log('No fieldName of', dependee_gid);
                console.log('Ignore condition', condition, 'of', gid);
                return;
            }
            if (!_.includes(dependees, dependee_fieldname)) {
                dependees.push(dependee_fieldname);
            }
            var choices;
            if (dependee_node.choices) {
                choices = dependee_node.choices;
            } else if (dependee_node.property === 'OPTION_EN') {
                choices = {
                    '1': 'enable',
                    '0': 'disable'
                };
            }
            if (choices) {
                var _value = choices[value];
                if (!_value) {
                    console.log('No value mapping to', value, 'in', choices);
                    value = "";
                } else {
                    value = _value;
                }
            }

            _condition = [dependee_fieldname, operator, value].join(' ');
            _conditions.push(_condition);
        });
        if (!_.isEmpty(dependees)) {
            _.extend(node, {
                conditions: {
                    dependees: dependees,
                    conditions: _conditions
                }
            });
        }
    });

    return gidNode
}

export function getModuleInfo(gid, data) {

    var moduleNode = _.get(data, 'gid_node_map.' + gid, {}),
        fieldNodes = [],
        moduleInfo = {}

    moduleInfo.module = moduleNode
    moduleInfo.fields = fieldNodes

    if (_.isEmpty(moduleNode)) {
        console.log('No node mapped to gid', gid)
        return moduleInfo
    }
    var moduleName = moduleNode.moduleName,
        fields = _.get(data, 'module_fields.' + moduleName, []),
        children = {}

    _.each(fields, function (field) {
        var fieldName = field.fieldName,
            fieldMacro = field.attrgid

        var fieldGid = null
        if (fieldMacro) {
            fieldGid = _.get(data, 'macro_gid.' + fieldMacro)
        }

        var valType = field.valType

        if (_.startsWith(valType, 'CHILD')) {
            children[valType] = fieldGid;
            if (!fieldGid) {
                console.log(fieldName, 'has no attrgid');
            }
        }

        var fieldNode = null

        if (fieldGid) {
            fieldNode = _.get(data, 'gid_node_map.' + fieldGid)
        }
        if (fieldNode) {
            fieldNodes.push(fieldNode);
        } else {
            fieldNodes.push(field);
        }
    })

    if (!_.isEmpty(children)) {
        moduleInfo.children = children
    }

    var specifics = data.Specifics && _.get(data, 'Specifics.' + gid)

    if (specifics) {
        _.extend(moduleInfo, _.omit(specifics, 'module'))
        if (specifics.module) {
            _.extend(moduleInfo.module, specifics.module)
        }
    }

    return moduleInfo;
}

export function extendNode(gid_node, macro_gid, macro_name, module_fields, conditions) {

    let gid_node_map = ExtendModuleNode(gid_node, macro_gid, macro_name)

    gid_node_map = ExtendFieldNode(gid_node_map, macro_gid, module_fields)
    gid_node_map = ExtendNodeConditions(gid_node_map, conditions)

    return gid_node_map
}


export function getGidByPath(path, modules) {

    path = _.isString(path) ? _.get(path.match(/[^\/].+[^\/]/g), 0, '').split('/') : path

    if (path[0] == 'config') path.shift()

    let p = path.shift(),
        m = modules.find(itm => itm.name === p),
        gid


    if (m.children) {
        return getGidByPath(path, m.children)

    } else if (m.modules) {
        return getGidByPath(path, m.modules)

    } else {
        if (m.gid) {
            gid = m.gid

        } else if (m.widget) {
            gid = m.widget
        }

    }

    return gid
}
