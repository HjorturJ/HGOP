node {
    def git = checkout scm

    stage("Clean") {
        sh "git clean -dfxq"
        sh "git stash"
    }

    stage("Setup") {
        // Change current directory
        dir("game_api") {
            sh "npm install"
        }
    }

    stage("Lint") {
        // Change current directory
        dir("game_api") {
            sh "npm run eslint"
        }
    }

    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
}