pipeline {
    agent any

    environment {
        BACKEND_DOCKER_IMAGE = 'geyumi/backend'
        BACKEND_DOCKER_TAG = 'latest'
        FRONTEND_DOCKER_IMAGE = 'geyumi/frontend'
        FRONTEND_DOCKER_TAG = 'latest'
        DOCKER_REPO = 'geyumi3961'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/geyumi/MERN_STACK_RESTAURANT_RESERVATION-main.git'
            }
        }

        stage('List Files') {
            steps {
                script {
                    bat 'dir /s'
                }
            }
        }

        stage('Verify Dockerfiles') {
            steps {
                script {
                    if (!fileExists('backend/Dockerfile')) {
                        error "Backend Dockerfile not found in the workspace"
                    }
                    if (!fileExists('frontend/Dockerfile')) {
                        error "Frontend Dockerfile not found in the workspace"
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    bat "docker build -t ${DOCKER_REPO}/${BACKEND_DOCKER_IMAGE}:${BACKEND_DOCKER_TAG} -f backend/Dockerfile backend"
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    bat "docker build -t ${DOCKER_REPO}/${FRONTEND_DOCKER_IMAGE}:${FRONTEND_DOCKER_TAG} -f frontend/Dockerfile frontend"
                }
            }
        }

        stage('Push Backend Docker Image') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'docker-pass', variable: 'DOCKER_PASSWORD')]) {
                        bat "docker login -u geyumi3961 -p ${DOCKER_PASSWORD}"
                        bat "docker push ${DOCKER_REPO}/${BACKEND_DOCKER_IMAGE}:${BACKEND_DOCKER_TAG}"
                    }
                }
            }
        }

        stage('Push Frontend Docker Image') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'docker-pass', variable: 'DOCKER_PASSWORD')]) {
                        bat "docker login -u geyumi3961 -p ${DOCKER_PASSWORD}"
                        bat "docker push ${DOCKER_REPO}/${FRONTEND_DOCKER_IMAGE}:${FRONTEND_DOCKER_TAG}"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            cleanWs()
        }
    }
}
