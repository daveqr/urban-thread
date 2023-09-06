#!/bin/bash

email="test@example.com"
password="password"
fname="John"
lname="Smith"

apiEndpoint="http://localhost:3000/users/register"

while getopts "e:p:f:l:" opt; do
  case $opt in
    e)
      email="$OPTARG"
      ;;
    p)
      password="$OPTARG"
      ;;
    f)
      fname="$OPTARG"
      ;;
    l)
      lname="$OPTARG"
      ;;
  esac
done

response=$(curl -X POST -H "Content-Type: application/json" -d '{
  "email": "'"$email"'",
  "password": "'"$password"'",
  "fname": "'"$fname"'",
  "lname": "'"$lname"'"
}' "$apiEndpoint"
)

echo "$response"
