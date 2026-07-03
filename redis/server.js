const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});
//event listener for connection
client.on("error", (err) => {
  console.log(err);
});
async function connectRedis() {
  try {
    await client.connect();
    console.log("Connected to Redis");
    await client.set("key", "value");
    const value = await client.get("key");
    console.log(value);
    const deletecount = await client.del("key");
    console.log(`Deleted ${deletecount} key(s)`);
    const extractUpdatedValue = await client.get("name");
    console.log(`Extracted value: ${extractUpdatedValue}`);
    await client.set("count", "100");
    const incrementCount = await client.incr("count");
    console.log(`Incremented count: ${incrementCount}`);
    const decrementCount = await client.decr("count");
    console.log(`Decremented count: ${decrementCount}`);
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  } finally {
    await client.quit();
  }
}
connectRedis();
