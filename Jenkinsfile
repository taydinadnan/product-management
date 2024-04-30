pipeline {
    agent any

    environment {
        VERSION = '0.0.1'
        DOCKER_HUB_REPO = 'your-docker-hub-username/node-product-management'
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
                    def dockerImageTag = "${DOCKER_HUB_REPO}:${env.VERSION}"
                    sh "docker push ${dockerImageTag}"
                }
            }
        }
    }
}
