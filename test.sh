#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "================================"
echo "React App + MongoDB Test Suite"
echo "================================"
echo ""

# Test 1: Backend health check
echo -e "${YELLOW}Test 1: Backend Health Check${NC}"
response=$(curl -s http://localhost:5000/api/health)
if [[ $response == *"running"* ]]; then
    echo -e "${GREEN}✅ Backend is running${NC}"
else
    echo -e "${RED}❌ Backend health check failed${NC}"
    exit 1
fi
echo ""

# Test 2: SignUp
echo -e "${YELLOW}Test 2: User SignUp${NC}"
test_email="test_$(date +%s)@example.com"
signup_response=$(curl -s -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test User\",
    \"email\": \"$test_email\",
    \"password\": \"password123\"
  }")

if [[ $signup_response == *"success"* ]] && [[ $signup_response == *"true"* ]]; then
    echo -e "${GREEN}✅ SignUp successful${NC}"
    echo "Response: $signup_response"
    
    # Extract token from response
    token=$(echo $signup_response | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    echo "Token: $token"
else
    echo -e "${RED}❌ SignUp failed${NC}"
    echo "Response: $signup_response"
    exit 1
fi
echo ""

# Test 3: SignIn
echo -e "${YELLOW}Test 3: User SignIn${NC}"
signin_response=$(curl -s -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$test_email\",
    \"password\": \"password123\"
  }")

if [[ $signin_response == *"success"* ]] && [[ $signin_response == *"true"* ]]; then
    echo -e "${GREEN}✅ SignIn successful${NC}"
    echo "Response: $signin_response"
else
    echo -e "${RED}❌ SignIn failed${NC}"
    echo "Response: $signin_response"
    exit 1
fi
echo ""

# Test 4: Check MongoDB
echo -e "${YELLOW}Test 4: MongoDB Connection${NC}"
user_count=$(docker exec mongodb mongosh react-app-db --eval "db.users.countDocuments()" 2>/dev/null | tail -1)
if [[ -n "$user_count" ]] && [[ "$user_count" =~ ^[0-9]+$ ]]; then
    echo -e "${GREEN}✅ MongoDB connected - Total users: $user_count${NC}"
else
    echo -e "${RED}❌ MongoDB connection failed${NC}"
fi
echo ""

# Test 5: Frontend availability
echo -e "${YELLOW}Test 5: Frontend Server${NC}"
frontend_response=$(curl -s http://localhost:5173 | head -20)
if [[ $frontend_response == *"<!DOCTYPE"* ]] || [[ $frontend_response == *"<html"* ]]; then
    echo -e "${GREEN}✅ Frontend is accessible${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend might not be responding (expected in some cases)${NC}"
fi
echo ""

# Summary
echo "================================"
echo -e "${GREEN}All Tests Completed!${NC}"
echo "================================"
echo ""
echo "Summary:"
echo "- Backend API: http://localhost:5000"
echo "- Frontend App: http://localhost:5173"
echo "- MongoDB: localhost:27017"
echo ""
echo "Next Steps:"
echo "1. Open http://localhost:5173 in your browser"
echo "2. Go to Sign In page"
echo "3. Click 'Sign Up' to create an account"
echo "4. Use your credentials to Sign In"
echo "5. Check MongoDB Compass to see saved data"
echo ""
