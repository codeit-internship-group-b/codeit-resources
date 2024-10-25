#!/bin/bash
cd /home/ubuntu/build/codeit-resources
git pull origin develop
sudo env "PATH=$PATH" pnpm install
sudo env "PATH=$PATH" pnpm --filter=api build
pm2 restart api


# express 실행 스크립트
# cd /home/ubuntu/build/codeit-resources/apps/api
# pm2 start pnpm --name api -- start