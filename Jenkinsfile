pipeline {
    agent any

    stages {
        stage('Verify tools') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install dependencies') {
            steps {
                dir ('automation/playwright') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install Playwright browsers') {
            steps {
                dir ('automation/playwright') {
                    sh 'npx playwright install'
                }
            }
        }

        stage('Run Playwright tests') {
            steps {
                dir ('automation/playwright') {
                    sh 'BASE_URL=http://frontend-app:5173 npx playwright test'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'automation/playwright/playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'automation/playwright/test-results/**', allowEmptyArchive: true
        }
    }
}