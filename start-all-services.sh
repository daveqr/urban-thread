#!/bin/bash

(cd ./gateway && yarn debug) &

(cd ./services/catalog && yarn debug) &

(cd ./services/users && yarn debug) &

wait
