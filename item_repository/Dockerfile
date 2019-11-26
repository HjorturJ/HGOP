# specifies the Parent Image from which we are building.
FROM node:erbium

# sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it 
WORKDIR /code

# copies new files or directories from <src> to <dest> (in this case, from our local dir to the containers current workdir)
COPY package.json package.json

# runs this command in the current workdir (npm install installs the dependencies listed in package.json)
RUN npm install

# copies database.js into our containers /code workdir
COPY database.js database.js

# copies app.js into our containers /code workdir
COPY app.js app.js

# CMD is run as the last step when starting a container (start the appliaction inside the container).
CMD node app.js