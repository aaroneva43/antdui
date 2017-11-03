/* eslint-disable no-console */
import jsonServer from 'json-server';
import enableDestroy from 'server-destroy';
import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { chalkSuccess } from './chalkConfig';

let server = null;
const db = './tools/db.json';
const middlewares = jsonServer.defaults();
let router = jsonServer.router(db);
const token = "7xPJPuVfTse2pFHc5Pfu";


function isAuthorized(req) {
    return req.get("Authorization") == token;
}

function start() {
    const app = jsonServer.create();
    app.use(middlewares);
    app.use(function (req, res, next) {
        if (req.originalUrl == "/api/v1/auth") {

            if (req.method == 'POST') {
                return res.send({ success: true, result: '7xPJPuVfTse2pFHc5Pfu' })
            }
            return res.send({
                access_token: token
            });
        }

        if (/\/db.*/.test(req.originalUrl) || true/* isAuthorized(req) */) { // add your authorization logic here
            // continue to Mock Server router

            next()

        } else {
            res.sendStatus(401);
        }
    });
    // Add this before app.use(router)
    app.use(jsonServer.rewriter({
        '/api/v1/': '/'
    }));

    app.use(router);
    server = app.listen(9999, function () {
        console.log(chalkSuccess('Mock Server is running'));
    });
    // Enhance with a destroy function
    enableDestroy(server);
}

// Watch .js or .json file
// Since lowdb uses atomic writing, directory is watched instead of file
chokidar
    .watch(path.dirname(db))
    .on('change', function (file) {

        console.log(file)
        if (/^.+\.js$/.test(file)) return

        const obj = JSON.parse(fs.readFileSync(file));
        const isDatabaseDifferent = !_.isEqual(obj, router.db.getState());
        if (isDatabaseDifferent) {
            console.log(chalkSuccess('File was changed, Reloading...'));
            server && server.destroy();
            router = jsonServer.router(obj);
            start();
        }
    });

start();
