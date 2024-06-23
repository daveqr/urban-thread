#!/bin/bash

cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/
cp /usr/src/cache/yarn.lock /usr/src/app/yarn.lock
cp /usr/src/cache/package.json /usr/src/app/package.json

exec yarn start
