start ./crawler/crawler.js which is a grpc function

npm i and start index.js which is a express server which starts at 5005 port

call api http://localhost:5005/api/add/:uname
this api calls the grpc function and sends a response sent from the grpc server