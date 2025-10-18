const request = require("supertest");
const app = require("../server");

describe("GET /api/me", () => {
	// Fixed endpoint path
	it("should return profile with correct structure", async () => {
		const response = await request(app).get("/api/me"); // Fixed path

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("status", "success");
		expect(response.body).toHaveProperty("user");
		expect(response.body.user).toHaveProperty("email");
		expect(response.body.user).toHaveProperty("name");
		expect(response.body.user).toHaveProperty("stack");
		expect(response.body).toHaveProperty("timestamp");
		expect(response.body).toHaveProperty("fact");
	});

	it("should have valid timestamp", async () => {
		const response = await request(app).get("/api/me"); // Fixed path
		const timestamp = new Date(response.body.timestamp);

		expect(timestamp instanceof Date).toBe(true);
		expect(isNaN(timestamp.getTime())).toBe(false);
	});

	// Add more comprehensive tests
	it("should return user object with all required fields", async () => {
		const response = await request(app).get("/api/me");

		expect(response.body.user.email).toBeDefined();
		expect(typeof response.body.user.email).toBe("string");
		expect(response.body.user.name).toBeDefined();
		expect(typeof response.body.user.name).toBe("string");
		expect(response.body.user.stack).toBeDefined();
		expect(typeof response.body.user.stack).toBe("string");
	});

	it("should return a valid cat fact string", async () => {
		const response = await request(app).get("/api/me");

		expect(response.body.fact).toBeDefined();
		expect(typeof response.body.fact).toBe("string");
		expect(response.body.fact.length).toBeGreaterThan(0);
	});
});
