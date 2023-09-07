#!/bin/bash

email="test@example.com"
password="password"
fname="John"
lname="Smith"

preferredLanguage="en"

apiEndpoint="http://localhost:3000/users"

show_help() {
  echo "Usage: $0 [-e <email>] [-p <password>] [-f <first name>] [-l <last name>] [-h] [-g <language>]"
  echo "Options:"
  echo "  -e <email>      Email address of the user (default: 'test@example.com')."
  echo "  -p <password>   Password for the user (default: 'password')."
  echo "  -f <first name> First name of the user (default: 'John')."
  echo "  -l <last name>  Last name of the user (default: 'Smith')."
  echo "  -g <language>   Preferred language (default: 'en')."
  echo "  -h,             Display this help message."
  exit 0
}

while getopts "e:p:f:l:g:h" opt; do
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
    g)
      preferredLanguage="$OPTARG"
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

response=$(curl -X POST -H "Content-Type: application/json" -H "accept-language: $preferredLanguage" -d '{
  "email": "'"$email"'",
  "password": "'"$password"'",
  "fname": "'"$fname"'",
  "lname": "'"$lname"'"
}' "$apiEndpoint"
)

echo "$response"
