Setup message validator for ecom/ecom

1. docker pull node
2. clone this repo
3. open cloned repo
4. sudo docker build -t commit-message-validator .
5. sudo docker run -d -p 7000:7000 -it --name commit-message-validator commit-message-validator
6. on gihub add webhook with Payload URL: http://<ip address>:7000/validateCommitMessages