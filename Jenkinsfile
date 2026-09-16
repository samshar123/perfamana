pipeline {
    agent any

    environment {
        DEPLOY_HOST = "72.62.228.151"
        DEPLOY_USER = "crono"
        DEPLOY_PATH = "/home/crono/perfamana"
        PM2_APP_NAME = "perfamana-frontend"
        VITE_API_BASE_URL = "https://api.perfamana.com/api"
        HEALTH_CHECK_URL = "http://localhost:3010/"
    }

    stages {
        stage('Deploy Frontend') {
            steps {
                sshagent(['prod-ssh']) {
                    sh '''
                    ssh -q -T -o LogLevel=ERROR -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} << EOF
set -e
set -o pipefail
cd ${DEPLOY_PATH}

echo "Pulling latest code..."
git pull origin main

echo "Installing dependencies..."
npm ci || npm install

echo "Building application..."
export VITE_API_BASE_URL="${VITE_API_BASE_URL}"
npm run build 2>&1 | tee .npm-build.log || exit 1

echo "Restarting PM2 from ecosystem config..."
# Use startOrRestart so the process is always (re)registered with the config
# in the file (cwd, PORT, env). A plain restart reuses stale config.
if ! pm2 startOrRestart ecosystem.config.cjs --only ${PM2_APP_NAME} --update-env; then
    echo "startOrRestart failed, re-registering from config..."
    pm2 delete ${PM2_APP_NAME} || true
    pm2 start ecosystem.config.cjs --only ${PM2_APP_NAME} --update-env
fi
pm2 save

echo "Health checking ${HEALTH_CHECK_URL}..."
for i in 1 2 3 4 5 6 7 8 9 10; do
    if curl -sf -o /dev/null "${HEALTH_CHECK_URL}"; then
        echo "Health check OK"
        break
    fi
    if [ "\$i" -eq 10 ]; then
        echo "=============================="
        echo "   HEALTH CHECK FAILED: ${HEALTH_CHECK_URL}"
        echo "=============================="
        pm2 logs ${PM2_APP_NAME} --lines 40 --nostream || true
        exit 1
    fi
    sleep 3
done

echo "Deployment complete"
EOF
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✓ Frontend deployed successfully"
        }
        failure {
            echo "✗ Frontend deployment failed"
        }
        always {
            cleanWs()
        }
    }
}
