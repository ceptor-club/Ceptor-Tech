const weekTimestamp = args[0];
// Add your API key here
const apiKey = "testKey";

const headers = {
    Accept: "application/json;",
    apiKey: "testkey", // Add your API key here
};
const apiResponse = await Functions.makeHttpRequest({
    url: 'https://ceptor-backend-staging.up.railway.app/mostLikedSubmission',
    headers: headers,
});

console.log('API response:', JSON.stringify(apiResponse, null, 2));

if (apiResponse.error) {
    console.error(apiResponse.error);
    throw Error("Request failed");
}

const { data } = apiResponse;

console.log("API response data:", JSON.stringify(data, null, 2));
// function returns array of objects, we only need the first one
const { tokenID } = data[0];

if (!tokenID) {
    throw new Error('No token ID found in response:'+ JSON.stringify(data));
}

return Functions.encodeString(JSON.stringify({
    tokenID
}));