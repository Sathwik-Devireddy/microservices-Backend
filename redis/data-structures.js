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
    //list data structure
    // await client.lPush("notes", ["note 1", "note 2 ", "note 3 "]);
    // const extractAllnotes = await client.lRange("notes", 0, -1);
    // console.log(extractAllnotes);
    // const firstNote = await client.lPop("notes");
    // console.log(`First Note: ${firstNote}`);
    // const remainingNotes = await client.lRange("notes", 0, -1);
    // console.log(`Remaining Notes: ${remainingNotes}`);
    //set data structure
    await client.sAdd("fruits", ["apple", "banana", "orange"]);
    const allFruits = await client.sMembers("fruits");
    console.log(`All Fruits: ${allFruits}`);
    const isBananaPresent = await client.sIsMember("fruits", "banana");
    console.log(`Is Banana Present: ${isBananaPresent}`);
    await client.sRem("fruits", "banana");
    const remainingFruits = await client.sMembers("fruits");
    console.log(`Remaining Fruits: ${remainingFruits}`);
    //sorted set data structure
    await client.zAdd("scores", [
      { score: 90, value: "Alice" },
      { score: 80, value: "Bob" },
      { score: 95, value: "Charlie" },
    ]);
    const allScores = await client.zRangeWithScores("scores", 0, -1);
    console.log(`All Scores: ${JSON.stringify(allScores)}`);
    const topScore = await client.zRangeWithScores("scores", 0, 0);
    console.log(`Top Score: ${JSON.stringify(topScore)}`);
    await client.zRem("scores", "Charlie");
    const remainingScores = await client.zRangeWithScores("scores", 0, -1);
    console.log(`Remaining Scores: ${JSON.stringify(remainingScores)}`);
    //hashes data structure
    await client.hSet("user:1", {
      name: "John",
      age: 25,
      city: "New York",
    });
    const getALlProducts = await client.hGetAll("user:1");
    console.log(`User Details: ${JSON.stringify(getALlProducts)}`);
    const userName = await client.hGet("user:1", "name");
    console.log(`User Name: ${userName}`);
    await client.hDel("user:1", "age");
    const remainingUserDetails = await client.hGetAll("user:1");
    console.log(
      `Remaining User Details: ${JSON.stringify(remainingUserDetails)}`,
    );
  } catch (e) {
    console.log(e);
  } finally {
    await client.quit();
  }
}
redisDS();
