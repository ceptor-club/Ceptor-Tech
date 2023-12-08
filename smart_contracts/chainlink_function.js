const url = args[0];//request with the week timestamp parameter
 const weekTimestamp = args[1];


const getPrDetailsUrl = `${url}/${weekTimestamp}`


const headers = {
   
    Accept: "application/json",
};

// Get the timeline to find the closing PR
let apiResponse = await Functions.makeHttpRequest({ url: url, headers });


if (apiResponse.error) {
    console.error(apiResponse.error);
    throw Error("Request failed");
}

const { data } = apiResponse;

console.log("API response data:", JSON.stringify(data, null, 2));

const { tokenId } = data;

if (!tokenId) {
    throw new Error(`No token ID found in response: ${JSON.stringify(data)}`);
}

return Functions.encodeString(JSON.stringify({
    tokenId
}));