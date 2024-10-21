#!/bin/bash
curl -f http://localhost:8080 || http://localhost:3000 || exit 1 
