#!/bin/bash

mc alias set minio http://localhost:9000 user password;
mc mb minio/images --region=ap-northeast-1;
mc anonymous set public minio/images;
exit 0;