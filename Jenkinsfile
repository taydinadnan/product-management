pipeline {
    agent any

    environment {
        VERSION = '0.0.2'
        DOCKER_HUB_REPO = 'taydinadnan/node-product-management'
        RESOURCE_GROUP = credentials('AZURE_RESOURCE_GROUP')
        CLUSTER_NAME = credentials('AZURE_AKS_CLUSTER_NAME')
        DEPLOYMENT_NAME = 'my-app' // Assuming this is the name of your deployment in Kubernetes
        NAMESPACE = 'default' // Assuming the deployment is in the default namespace
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
                    sh """
                        docker run -v ${kubeConfig}:/root/.kube/config ${azureCli} \
                        az aks get-credentials --resource-group ${RESOURCE_GROUP} --name ${CLUSTER_NAME}
                    """
                    sh """
                        docker run -v ${kubeConfig}:/root/.kube/config ${azureCli} \
                        kubectl set image deployment/${DEPLOYMENT_NAME} ${DEPLOYMENT_NAME}=${dockerImageTag} -n ${NAMESPACE}
                    """
                }
            }
        }
    }
}
