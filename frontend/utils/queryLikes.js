const { MongoClient } = require("mongodb");
require('dotenv').config();

const url = process.env.DB_CONN_STRING;
const client = new MongoClient(url);

const dbName = process.env.DB_NAME;
const colName = process.env.DB_COLLECTION;

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection(colName);
  
        // Aggregate the likes for each NFT
        const aggregationResult = await col.aggregate([
            {
                $match: {
                    likes: { $exists: true } // filter documents where likes field exists
                }
            },
            {
                $project: {
                    ownerId: 1,
                    tokenId: 1,
                    contractAddress: 1,
                    likesCount: { $size: "$likes" } // count the number of elements in the likes array
                }
            },
            {
                $sort: { likesCount: -1 } // sort in descending order of likes
            }
        ]).toArray();

        console.log(aggregationResult);
        console.log(aggregationResult[0].ownerId);
    } catch (err) {
        console.error(err.stack);
    } finally {
        await client.close();
    }
}

run();
