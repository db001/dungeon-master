#!/bin/bash

source ./config/config.sh
export PGPASSWORD=$PGPASSWORD

echo "Configuring db"

dropdb -U postgres dungeon
createdb -U postgres dungeon

psql -U postgres dungeon < ./database/database.sql

echo "db configured"