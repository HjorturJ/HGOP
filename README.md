### T-542-HGOP <img align="right" width="150" height="150" src="http://iva2011.ru.is/images/default_mono.png">

**Instructors:** Guðlaugur Stefán Egilsson and Hannes Pétursson

**Teaching assistants:** Fanney Sigurðardóttir, Hrafn Orri Hrafnkelsson and Kristinn Þorri Þrastarson

---

This README contains information on Assignments 1 and 2 which were finished in the first 2 weeks in the course Introduction to quality management and testing. 

<br>

<details>
<summary><b>Week 1</b></summary>

#### API instance 
Here is a link to our API instace:
http://54.86.210.109:3000/status

#### Project status 

```bash
├── assignments
│   ├── day01
│   │   └── answers.md
│   └── day02
│       └── answers.md
├── item_repository
│   ├── app.js
│   ├── database.js
│   ├── Dockerfile
│   └── package.json
├── scripts
│   ├── deploy.sh
│   ├── initialize_game_api_instance.sh
│   └── setup_local_dev_environment.sh
├── .gitignore
├── README.md
├── aboutus.md
├── docker-compose.yml
└── infrastructure.tf

```
</details>
<details open>
<summary><b>Week 2</b></summary>

#### Jenkins instance 
Here is a link to our Jenkins instance: ec2-52-54-102-207.compute-1.amazonaws.com:8080


#### Project status 

[![Build Status](http://ec2-52-54-102-207.compute-1.amazonaws.com:8080/buildStatus/icon?job=JenkinsHgop)](http://ec2-52-54-102-207.compute-1.amazonaws.com:8080/job/JenkinsHgop/)

```bash
├── assignments
│   ├── day01
│   │   └── answers.md
│   └── day02
│       └── answers.md
├── game_api
│   ├── .dockerignore
│   ├── .eslintrc.json
│   ├── app.js
│   ├── config.js
│   ├── context.js
│   ├── database.js
│   ├── dealer.js
│   ├── dealer.unit-test.js
│   ├── deck.js
│   ├── deck.unit-test.js
│   ├── Dockerfile
│   ├── inject.js
│   ├── lucky21.js
│   ├── lucky21.unit-test.js
│   ├── package.json
│   ├── random.js
│   ├── random.unit-test.js
│   └── server.js
├── scripts
│   ├── deploy.sh
│   ├── docker_build.sh
│   ├── docker_compose_up.sh
│   ├── docker_push.sh
│   ├── initialize_game_api_instance.sh
│   ├── jenkins_deploy.sh
│   ├── setup_local_dev_environment.sh
│   └── sync_session.sh
├── .gitignore
├── Jenkinsfile
├── README.md
├── aboutus.md
├── docker-compose.yml
└── infrastructure.tf

```
</details>

<br>

#### Authors
Guðrún Margrét Ívansdóttir - gudruni17@ru.is

Hjörtur Jóhann Vignisson - hjorturv17@ru.is 
