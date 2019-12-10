# specifies the Parent Image from which we are building.
FROM node:erbium

# sets the working directory to /code for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it 
WORKDIR /code

# copies new files or directories from <src> to <dest> (in this case, from our local dir to the containers current workdir)
COPY package.json package.json

# runs this command in the current workdir (npm install installs the dependencies listed in package.json)
# Except the dev dependencies due to the production flag
RUN npm install --production

# copies all .js files into our containers /code workdir
COPY *.js ./

COPY database.json database.json

COPY migrations/*.js migrations/

COPY migrations/*.js migrations/

# Give postgres time to setup before we try to migrate.
CMD sleep 10 && npm run migratedb:pg && node app.js