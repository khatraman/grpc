const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const protoPath = __dirname + '/crawlService.proto';

console.log(protoPath);


const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});


const crawler_proto = grpc.loadPackageDefinition(packageDefinition).crawlService;

async function callCrawler(uname, crawl) {

  try {
    const cleint = new crawler_proto.Crawler('localhost:50001', grpc.credentials.createInsecure());

    let retdata = new Promise((resolve, reject) => {
      cleint.setCrawler({ name: uname, crawl: crawl }, function (err, response) {
        console.log("response from grpc: ", response);
        resolve(response);
      });
    })

    cleint.close();

    return retdata;

  } catch (err) {
    throw err;
  }
}

module.exports = callCrawler;