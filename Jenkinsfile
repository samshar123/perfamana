pipeline {
    agent any

    environment {
        SERVER_IP    = '72.62.228.151'
        DEPLOY_USER  = 'crono'
        DEPLOY_PATH  = '/home/crono/perfamana_backend'
        GIT_BRANCH   = 'main'
        PM2_APP_NAME = 'perfamana'
    }

    stages {
        stage('Deploy') {
            steps {
                sh '''
                    set -e

                    cd ${DEPLOY_PATH}

                    echo "Pulling latest code..."
                    git pull origin ${GIT_BRANCH}

                    echo "Installing dependencies..."
                    npm ci || npm install

                    echo "Building application..."

                    if ! npm run build 2>&1; then
                        echo "=============================="
                        echo "   NPM BUILD FAILED"
                        echo "=============================="

                        if [ -f ".npm_build.log" ]; then
                            tail -50 .npm_build.log
                        fi

                        exit 1
                    fi

                    echo "Restarting PM2..."

                    pm2 restart ${PM2_APP_NAME} || \
                    pm2 start ecosystem.config.cjs --only ${PM2_APP_NAME}

                    echo "Deployment complete"
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment succeeded on ${SERVER_IP}"
        }
        failure {
            echo "Deployment failed on ${SERVER_IP}"
        }
    }
}
