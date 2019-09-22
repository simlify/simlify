let request;

beforeAll(() => {
  request = global.request;
});

describe('Endpoint for flows (/api/v1/flows/*)', () => {    
  it('GET all flows', async done => {
    const response = await request.get('/api/v1/nodes/list');
    expect(response.status).toBe(200);
    done();
  });
});
