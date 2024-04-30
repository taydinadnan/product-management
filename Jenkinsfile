pipeline {
    agent any

    environment {
        VERSION = '0.0.2'
        DOCKER_HUB_REPO = 'taydinadnan/node-product-management'
        DEPLOYMENT_NAME = 'my-app'
        NAMESPACE = 'default' 
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

        stage('Update Deployment in AKS') {
            steps {
                script {
                    def azureCli = 'mcr.microsoft.com/azure-cli'
                    def kubeConfig = "${env.HOME}/.kube/config"
                    def dockerImageTag = "${DOCKER_HUB_REPO}:${env.VERSION}"
                    withCredentials([usernamePassword(credentialsId: 'AZURE_CREDENTIALS', usernameVariable: 'AZURE_USERNAME', passwordVariable: 'AZURE_PASSWORD')]) {
                        // Add withCredentials block for AZURE_TENANT_ID
                        withCredentials([string(credentialsId: 'AZURE_TENANT_ID', variable: 'AZURE_TENANT_ID')]) {
                            sh """
                                echo ${AZURE_PASSWORD} | az login --service-principal -u ${AZURE_USERNAME} --password ${AZURE_PASSWORD} --tenant ${AZURE_TENANT_ID}
                                az aks get-credentials --resource-group ${RESOURCE_GROUP} --name ${CLUSTER_NAME}
                                kubectl set image deployment/${DEPLOYMENT_NAME} ${DEPLOYMENT_NAME}=${dockerImageTag} -n ${NAMESPACE}
                            """
                        }
                    }
                }
            }
        }
    }
}
