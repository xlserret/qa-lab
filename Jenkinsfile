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

        stage('Run Appium tests') {
            environment {
                APPIUM_HOST = 'host.docker.internal'
                ANDROID_UDID = 'emulator-5554'
                ANDROID_APP_PATH = 'Users/xavier/Development/qa-lab/automation/appium/apks/Android-MyDemoAppRN.1.3.0.build-244.apk'
            }
            steps {
                dir ('automation/appium') {
                    sh 'npm ci'
                    sh 'npm test'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'automation/playwright/playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'automation/playwright/test-results/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'automation/appium/test-results/**', allowEmptyArchive: true
        }
    }
}