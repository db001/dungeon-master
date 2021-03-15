#!/bin/bash

source ./config.sh
export PGPASSWORD=$PGPASSWORD

echo "Configuring db"

dropdb -U postgres dungeon
createdb -U postgres dungeon

psql -U postgres dungeon < ./database.sql

echo "db configured"