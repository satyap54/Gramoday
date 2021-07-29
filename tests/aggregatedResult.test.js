const request = require('supertest')("http://localhost:8001");
const expect = require('chai').expect;


const post1 = {
  "reportDetails": {
    "userID": "user-1",
    "marketID": "market-1",
    "marketName": "Vashi Navi Mumbai",
    "cmdtyID": "cmdty-1",
    "cmdtyName": "Potato",
    "priceUnit": "Quintal",
    "convFctr": "50",
    "price": "700"
  }
};


const post2 = {
  "reportDetails": {
    "userID": "user-2",
    "marketID": "market-1",
    "marketName": "Vashi Navi Mumbai",
    "cmdtyID": "cmdty-1",
    "cmdtyName": "Potato",
    "priceUnit": "Quintal",
    "convFctr": "100",
    "price": "1600"
  }
};

const post3 = {
  "reportDetails": {
    "userID": "user-3",
    "marketID": "market-1",
    "marketName": "Vashi Navi Mumbai",
    "cmdtyID": "cmdty-1",
    "cmdtyName": "Potato",
    "priceUnit": "Quintal",
    "convFctr": "100",
    "price": "1600"
  }
};

const calculateScore = (A, B)=>{
  const price1 = parseFloat(A["reportDetails"]["price"]), price2 = parseFloat(B["reportDetails"]["price"]),
    factor1 = parseFloat(A["reportDetails"]["convFctr"]), factor2 = parseFloat(B["reportDetails"]["convFctr"]);
  return String(((price1/factor1) + (price2/factor2))/2.0); 
}

describe("Data consistency", ()=>{
  it("Post a single report for a market-commodity combination", async()=>{
    const response = await request.post("/reports").send(post1);
    expect(response.status).to.eql(200);
    expect(response.body).to.have.all.keys('reportID', 'status');
  });

  it("Post a second report for the market-commodity combination and get the correct avg. price per kg", async()=>{
    let response = await request.post("/reports").send(post2);
    expect(response.status).to.eql(200);
    const { reportID } = response.body;
    response = await request.get(`/reports?reportID=${reportID}`);
    // TODO: calculate the expectedPrice
    const expectedPrice = calculateScore(post1, post2);
    expect(response.body.price).to.eql(expectedPrice);
  });

  it("Restict modification of a market-commodity combination to only 2 users", async()=>{
    let response = await request.post("/reports").send(post3);
    expect(response.status).to.eql(400);
  });
});