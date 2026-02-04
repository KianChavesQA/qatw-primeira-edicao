pipeline {
    agent {
        docker {
            image 'kianchaves/playwright:v1.58.0-noble'
            args '--network qatw-primeira-edicao_skynet'
        }
    }

    stages {
         stage('Node.js Deeps') {
            steps {
               sh 'npm install'
            }
        }
          stage('E2E Tests') {
            steps {
               sh 'npx playwright test'
               allure includeProperties: false, jdk: '', resultPolicy: 'LEAVE_AS_IS', results: [[path: 'allure-results']]
            }
        }
    }
}