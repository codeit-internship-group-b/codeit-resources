#!/bin/bash
cd /home/ubuntu/build/codeit-resources
git pull origin develop
pnpm install
pnpm --filter=api build
