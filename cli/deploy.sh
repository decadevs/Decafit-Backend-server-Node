# echo "starting docker services"
# service docker start
# echo "spining containers"
# docker-compose up -d --build
#!/bin/bash

env=${NODE_ENV:-development}

if [[ $env == "local" ]]; then
    yarn run dev:start
elif [[ $env == "development" ]]; then
    echo "cleaning build"
    rimraf ./dist
    echo "building app"
    tsc
    echo "starting server.."
    node ./bin/www
fi