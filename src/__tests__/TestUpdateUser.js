async function mock_call()
{
    const token = "FakeToken"
    const headers = {
    headers: {
        authorization: `Bearer ${token}`
    }
}
    const data = await fetch("https://us-central1-peerpal-a286b.cloudfunctions.net/updateUsers", headers)  //add updateUser to that endpoint 
    let ret = data
    if (typeof data == 'undefined'){
        ret = false
    }
    
    return ret;
}

describe("Fetches UserID from Canvas Courses Endpoint with Invalid Token", () => {
    it("Returns false if no data can be found from API", async () => {
       global.fetch = jest.fn(() => {
          Promise.resolve();
       });
       const value = await mock_call();
       expect(fetch).toHaveBeenCalledTimes(1);
       expect(value).toBe(false);
     });
  });