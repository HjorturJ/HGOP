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
        dir("game_client") {
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
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} apitest"

        // Change current directory
        dir("game_api") {
            sh "./../scripts/api_test.sh"
        }

        // Change current directory
        dir("/var/lib/jenkins/terraform/hgop/apitest") {
            sh "terraform destroy -auto-approve -var environment=apitest || exit 1"
        }
    }

    stage("Capacity Test") {
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} capacitytest"

        // Change current directory
        dir("game_api") {
            sh "./../scripts/capacity_test.sh"
        }

        // Change current directory
        dir("/var/lib/jenkins/terraform/hgop/capacitytest") {
            sh "terraform destroy -auto-approve -var environment=capacitytest || exit 1"
        }
    }

    stage("Deploy") {
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} production"
    }
}