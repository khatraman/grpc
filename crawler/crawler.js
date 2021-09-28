const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync("./crawlService.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});


const crawler_proto = grpc.loadPackageDefinition(packageDefinition).crawlService;


//RPC method
function setCrawler(call, callback) {
  if (call.request.crawl) {
    callback(null, { name: call.request.name, crawl: true })
  } else {
    callback(null, { name: call.request.name, crawl: false })
  }
}


//start rpc server
function main() {
  const server = new grpc.Server();
  server.addService(crawler_proto.Crawler.service, { setCrawler: setCrawler });
  server.bindAsync('0.0.0.0:50001', grpc.ServerCredentials.createInsecure(), () => {
    console.log("GRPC server started.... at port 50001")
    server.start();
  })

}

main();
