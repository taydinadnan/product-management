pipeline {
    agent any

    environment {
        VERSION = '2.0.0'
        DOCKER_HUB_REPO = 'taydinadnan/node-product-management'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    def dockerfilePath = "Dockerfile"
                    def dockerImageTag = "${DOCKER_HUB_REPO}:${env.VERSION}"
                    sh "docker build -t ${dockerImageTag} ."
                    def versionArray = env.VERSION.tokenize('.')
                    def majorVersion = versionArray[0].toInteger()
                    def minorVersion = versionArray[1].toInteger()
                    def patchVersion = versionArray[2].toInteger() + 1
                    env.VERSION = "${majorVersion}.${minorVersion}.${patchVersion}"
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                               withCredentials([usernamePassword(credentialsId: 'DOCKER_HUB_CRED', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                def dockerImageTag = "${DOCKER_HUB_REPO}:${env.VERSION}"
                sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                sh "docker push ${dockerImageTag}"
                }
              }
            }
        }
    }
}
