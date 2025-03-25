const express = require("express");
const BigNumber = require('bignumber.js');
const { processPendoFeatureCreation } = require('./pendo.js');

const PORT = process.env.PORT || 5000;
const app = express();

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVHlwZSI6Imdvb2dsZSIsImV4cCI6MTczODg1OTMwMCwiZ3JhbnRUaW1lIjoiMTgxZjg1NDIyODg5NTRhMSIsImlhdCI6MTczODI1NDUwMCwibmJmIjoxNzM4MjU0NTAwLCJzZXNzaW9uRXBvY2giOiIxN2UyNmVkMmZmMmU2MjFkIiwic2Vzc2lvbmlkIjoiNzg2OGQ1NTFjNDY4NWQ2YSIsInVzZXJpZCI6IjQ4MDQ2OTI4NTcwNjEzNzYifQ.9mf9tVuHrvj-VML8YjtjOfMcIuRBi5a_qImnFA5bEvM';

app.use(express.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

const convertIntToGuid = (num) => {
    // convert the string representation of the decimal number to a BigNumber object
    const bn = new BigNumber(num, 10);
    // convert the BigNumber to a hexadecimal string
    const id = bn.toString(16);
    console.log(id);
    // return the string with the dashes (8-4-4-4-12)
    return `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(16, 4)}-${id.substr(20)}`;
  };

app.post("/api/pendo-feature", async (req, res) => {
    const result = await processPendoFeatureCreation(jwt, req.body.name, convertIntToGuid(req.body.extensionId));
    console.log(result);
    res.json({ result });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});