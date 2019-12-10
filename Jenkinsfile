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

    stage("Test") {
        // Change current directory
        dir("game_api") {
            sh "npm run test:unit"
            step([
                $class: 'CloverPublisher',
                cloverReportDir: 'coverage',
                cloverReportFileName: 'clover.xml',
                healthyTarget: [methodCoverage: 80, conditionalCoverage: 80, statementCoverage: 80],
                unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50],
                failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
            ])
        }
    }

    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }

    stage("API Test") {
        sh "eval $(./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} apitest)"
        sh "echo ${PUBLIC_ADDR}"
        // Change current directory
        dir("game_api") {
            sh "API_URL=${PUBLIC_ADDR}:3000 npm run test:api"
        }

        dir("/var/lib/jenkins/terraform/hgop/apitest") {
            sh "terraform destroy -auto-approve"
        }
    }

    stage("Deploy") {
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} production"
    }
}