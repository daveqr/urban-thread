#!/bin/bash

email="test@example.com"
password="password"
fname="John"
lname="Smith"

apiEndpoint="http://localhost:3000/users/register"

show_help() {
  echo "Usage: $0 [-e <email>] [-p <password>] [-f <first name>] [-l <last name>] [-h]"
  echo "Options:"
  echo "  -e <email>      Email address of the user (default: 'test@example.com')."
  echo "  -p <password>   Password for the user (default: 'password')."
  echo "  -f <first name> First name of the user (default: 'John')."
  echo "  -l <last name>  Last name of the user (default: 'Smith')."
  echo "  -h,             Display this help message."
  exit 0
}

while getopts "e:p:f:l:h" opt; do
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
    h)
      show_help
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      show_help
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
