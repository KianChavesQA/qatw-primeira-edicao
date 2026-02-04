pipeline {
    agent any

    stages {
         stage('Node.js Deeps') {
            steps {
               sh 'npm install'
            }
        }
          stage('E2E Tests') {
            steps {
               sh 'npx playwright test'
            }
        }