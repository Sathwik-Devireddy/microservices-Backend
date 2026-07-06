const redis = require("redis");
const client = redis.createClient({
  host: "localhost",
  port: 6379,
});
client.on("error", (err) => {
  console.log(err);
});

async function testADDITIONALFeatures() {
  //this function is about subscriber and publisher features of redis
  try {
    await client.connect();
    const subscriber = client.duplicate();
    //creates a new client instance for subscribing to channels
    //shares the same connection pool as the original client
    await subscriber.connect();
    //above line was used to connect the subscriber client to the Redis server
    await subscriber.subscribe("my-channel", (message, channel) => {
      console.log(`Received message: ${message} from channel: ${channel}`);
    });
    //publish messages to the channel
    await client.publish("my-channel", "Hello, Redis!");
    await client.publish("my-channel", "This is a test message.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await subscriber.unsubscribe("my-channel"); // this line was used to unsubscribe the subscriber client from the "my-channel" channel
    await subscriber.quit(); // this line was used to close the subscriber client connection to the Redis server
    //pipeline and transactions
  } catch (e) {
    console.log(e);
  } finally {
    await client.quit();
  }
}
testADDITIONALFeatures();
