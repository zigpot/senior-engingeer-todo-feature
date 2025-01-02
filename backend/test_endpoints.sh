# Base URL
BASE_URL="http://localhost:5000"

# Test GET / (default route)
echo "Testing GET /"
curl -X GET "$BASE_URL/" -w "\n\n"

# Test POST /todos (add a new todo task)
echo "Testing POST /todos"
curl -X POST "$BASE_URL/todos" \
     -H "Content-Type: application/json" \
     -d '{"task": "Sample Task"}' -w "\n\n"

# Test GET /todos (retrieve all tasks)
echo "Testing GET /todos"
curl -X GET "$BASE_URL/todos" -w "\n\n"

# Test PUT /todos/:id (update a task by ID)
echo "Testing PUT /todos/1"
curl -X PUT "$BASE_URL/todos/1" \
     -H "Content-Type: application/json" \
     -d '{"task": "Updated Task", "completed": true}' -w "\n\n"

# Test GET /todos (retrieve all tasks)
echo "Testing GET /todos"
curl -X GET "$BASE_URL/todos" -w "\n\n"

# Test DELETE /todos/:id (delete a task by ID)
echo "Testing DELETE /todos/1"
curl -X DELETE "$BASE_URL/todos/1" -w "\n\n"

