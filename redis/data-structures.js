const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});
//event listener for connection
client.on("error", (err) => {
  console.log(err);
});
async function redisDS() {
  try {
    await client.connect();
    console.log("Connected to Redis");
    await client.set("user:name", "JOhnwick");
    const value = await client.get("user:name");
    console.log(value);
    await client.mSet([
      //m means multiple
      "user:email",
      "sk@gmail.com",
      "user:age",
      "60",
      "user:country",
      "india",
    ]);
    const [email, age, country] = await client.mGet([
      "user:email",
      "user:age",
      "user:country",
    ]);
    console.log(`Email: ${email}, Age: ${age}, Country: ${country}`);
  } catch (e) {
    console.log(e);
  } finally {
    await client.quit();
  }
}
redisDS();
