### T-542-HGOP <img align="right" width="150" height="150" src="http://iva2011.ru.is/images/default_mono.png">

**Instructors:** Guðlaugur Stefán Egilsson and Hannes Pétursson

**Teaching assistants:** Fanney Sigurðardóttir, Hrafn Orri Hrafnkelsson and Kristinn Þorri Þrastarson

---
# Answers - Day 2 :pencil2:

This Markdown Document contains our answers to the questions from the assignment scheduled for Day 2.

# Questions 

- **Docker Exercise**
Learn how to set up Docker and Docker Compose. Create Docker Images and build Docker Containers. We learned how push/publish Docker Images to DockerHub to be able to access our Docker Images on any machine that does not have it locally. We learned how to connect two Docker Containers and set up communication between them (item_repository → postgres).

- **What is Docker?**
Docker is an open source and tool that makes it easier to create, deploy and run applications by using containers. 
Developers use the containers to package up an application containing all the parts it needs (libraries and dependencies) and then ship it all out as one package. 


- **What is the difference between Virtual Machine, Docker Container and Docker Image**
 Main difference between Virtual Machines and Docker Containers is that VMs have Hardware-level process isolation but Docker Containers use OS level process isolation. Each VM has a seperate OS but each container can share OS. VMs boot in minutes unlike Docker Containers that boots in seconds. Pre-built docker containers are easily available but VMs are difficult to find. Containers can be created in seconds but it takes relatively longer time to create a VM. VMs can move to a new host easily but containers are destroyed and re-created rather than moving.  Every Docker container is based on an Docker image. Docker Images are the underlying definition of what gets reconstituted into a running Docker container. To spin up a container, you must either download a public image or create your own.


- **Web API?**
A Web API is an application programming interface for either a web server or a web browser. It is a web development concept, usually limited to a web application's client-side. 

-  **Postgres?**
is an open source object-relational database system that extends and uses the SQL language to integrate with many features that safely store and scale the most complicated data workloads. 


- **package.json file dependencies field:**
Dependencies are specified in a simple object that maps a package name to a version range. The version range is a string which has one or more space-separated descriptors.

- **npm express package:**
is a web application framework for Node.js. It is designed for building web applications and APIs.

- **npm pg package:**
Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.

- **What is docker-compose?**
Docker Compose is a tool to define and run multiple containers Docker applications. YAML file is used to configure the application’s services. With a single command, you create and start all the services from your configuration. 

- **Results**
Docker is installed. The docker command works without sudo privileges.We have created a docker image. We ran an instance of our image (a docker container) and saw the results in a browser (curl). We have stored our docker image on Docker Cloud. We have committed all our code to GitHub and commented each line in the Dockerfile, short description on the purpose of each line. We now know how to use Docker compose. We ran docker-compose up and saw the expected results. We posted the 12 animals to the API and got 10 expected items back and the items are ordered correct alphabetically. 


# Authors

Guðrún Margrét Ívansdóttir - gudruni17@ru.is

Hjörtur Jóhann Vignisson - hjorturv17@ru.is

# References

[What is Docker?](https://opensource.com/resources/what-docker)

[Virtual Machine vs. Docker Container](https://geekflare.com/docker-vs-virtual-machine/)


[What is Web API?](https://opensource.com/resources/what-docker)

[Dependencies field](https://docs.npmjs.com/files/package.json)

[npm express package](https://en.m.wikipedia.org/wiki/Express.js)

[npm pg package](https://www.npmjs.com/package/pg)

[What is docker-compose?](https://docs.docker.com/compose/)