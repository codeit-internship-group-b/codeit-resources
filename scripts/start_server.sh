#!/bin/bash
# express 실행
cd /home/ubuntu/build/codeit-resources
cd apps/api
pm2 start pnpm --name api -- start
cd /home/ubuntu/build/codeit-resources
