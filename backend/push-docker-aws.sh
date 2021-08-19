#!/bin/bash

# Push commands from AWS ECR, to avoid repetition
echo "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <DOCKER_IMG_URI>"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <DOCKER_IMG_URI>
echo "docker build -t <ECR_REPO_NAME>:<DOCKER_IMG_TAG> ."
docker build -t <ECR_REPO_NAME>:<DOCKER_IMG_TAG> .
echo "docker tag <ECR_REPO_NAME>:<DOCKER_IMG_TAG> <DOCKER_IMG_URI>/<ECR_REPO_NAME>:<DOCKER_IMG_TAG>"
docker tag <ECR_REPO_NAME>:<DOCKER_IMG_TAG> <DOCKER_IMG_URI>/<ECR_REPO_NAME>:<DOCKER_IMG_TAG>
echo "docker push <DOCKER_IMG_URI>/<ECR_REPO_NAME>:<DOCKER_IMG_TAG>"
docker push <DOCKER_IMG_URI>/<ECR_REPO_NAME>:<DOCKER_IMG_TAG>


