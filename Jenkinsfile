pipeline {
    agent any

    environment {
        
        VERSION = '0.0.1'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    
                    def dockerfilePath = "Dockerfile"

                    
                    def dockerImageTag = "taydinadnan/node-product-management:${env.VERSION}"

                    
                    sh "docker build -t ${dockerImageTag} ."

                    
                    def versionArray = env.VERSION.tokenize('.')
                    def majorVersion = versionArray[0].toInteger()
                    def minorVersion = versionArray[1].toInteger()
                    def patchVersion = versionArray[2].toInteger() + 1
                    env.VERSION = "${majorVersion}.${minorVersion}.${patchVersion}"
                }
            }
        }
    }
}
