// Simple test script for the new authentication system
// You can use tools like Postman or curl to test the API endpoints

console.log("🚀 AI Chatbot Backend Authentication Test Guide");
console.log("=".repeat(50));

console.log("\n📋 Available Endpoints:");
console.log("1. POST http://localhost:5000/api/user/register");
console.log("   Body: { \"name\": \"Test User\", \"email\": \"test@example.com\", \"password\": \"password123\" }");

console.log("\n2. POST http://localhost:5000/api/user/login");
console.log("   Body: { \"email\": \"test@example.com\", \"password\": \"password123\" }");

console.log("\n3. GET http://localhost:5000/api/user/me");
console.log("   Headers: { \"token\": \"your-jwt-token-here\" }");

console.log("\n4. GET http://localhost:5000/health");
console.log("   Health check endpoint");

console.log("\n🧪 Test with curl commands:");
console.log("-".repeat(50));

console.log("\n# Register a new user:");
console.log(`curl -X POST http://localhost:5000/api/user/register \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123"}'`);

console.log("\n# Login with credentials:");
console.log(`curl -X POST http://localhost:5000/api/user/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "test@example.com", "password": "password123"}'`);

console.log("\n# Get user profile (replace YOUR_TOKEN):");
console.log(`curl -X GET http://localhost:5000/api/user/me \\
  -H "token: YOUR_TOKEN_HERE"`);

console.log("\n# Health check:");
console.log("curl http://localhost:5000/health");

console.log("\n✅ Backend is ready for testing!");