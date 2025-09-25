# 🏥 HealthForgee User API Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [User Endpoints](#user-endpoints)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Android Integration](#android-integration)
- [Testing with Postman](#testing-with-postman)

## 🔍 Overview

HealthForgee User API provides comprehensive user management functionality including:
- User registration and authentication
- Health information management
- Profile data retrieval and updates

## 🔗 Base URL

```
http://your-server-ip:4000/api/user
```

**Note:** Replace `your-server-ip` with your actual server IP address or domain.

## 🔐 Authentication

Most endpoints require JWT token authentication. Include the token in request headers:

```
Headers: {
    "token": "your-jwt-token-here"
}
```

## 📡 User Endpoints

### 1. Register User
**Create a new user account**

```http
POST /api/user/register
Content-Type: application/json
```

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Account Created",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validation Rules:**
- `name`: Required, string
- `email`: Required, valid email format
- `password`: Required, minimum 8 characters

---

### 2. Login User
**Authenticate existing user**

```http
POST /api/user/login
Content-Type: application/json
```

**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Login Successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Get User Profile
**Retrieve complete user profile data**

```http
GET /api/user/get-profile
Headers: {
    "token": "your-jwt-token"
}
```

**Response:**
```json
{
    "success": true,
    "userData": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "gender": "Male",
        "dob": "1990-01-01",
        "address": {
            "line1": "123 Main St",
            "line2": "Apt 4B"
        },
        "image": "image_url",
        "height": "6'0\"",
        "weight": "70kg",
        "bloodGroup": "O+",
        "medicalConditions": ["Diabetes", "Hypertension"],
        "currentMedications": ["Metformin", "Lisinopril"],
        "allergies": ["Peanuts", "Shellfish"],
        "dietPreference": "Vegetarian",
        "activityLevel": "Moderate",
        "exerciseRoutine": "Running 3x/week",
        "sleepDuration": "7-8 hours",
        "alcoholOrSmoking": "No",
        "healthGoal": "Weight Loss",
        "dietaryRestrictions": ["Gluten-free"],
        "preferredExerciseType": "Cardio"
    }
}
```

---

### 4. Update Health Information ⭐
**Update comprehensive health and lifestyle data**

```http
POST /api/user/update-health-info
Content-Type: multipart/form-data
Headers: {
    "token": "your-jwt-token"
}
```

**Form Data Parameters:**

| Field | Type | Example | Description |
|-------|------|---------|-------------|
| `name` | String | "John Doe" | User's full name |
| `phone` | String | "+1234567890" | Phone number |
| `gender` | String | "Male" | Gender (Male/Female/Other) |
| `height` | String | "6'0\"" | Height measurement |
| `weight` | String | "70kg" | Weight measurement |
| `bloodGroup` | String | "O+" | Blood group |
| `medicalConditions` | JSON Array | "[\"Diabetes\",\"Hypertension\"]" | Medical conditions |
| `currentMedications` | JSON Array | "[\"Metformin\",\"Lisinopril\"]" | Current medications |
| `allergies` | JSON Array | "[\"Peanuts\",\"Shellfish\"]" | Known allergies |
| `dietPreference` | String | "Vegetarian" | Diet type preference |
| `activityLevel` | String | "Moderate" | Physical activity level |
| `exerciseRoutine` | String | "Running 3x/week" | Exercise routine |
| `sleepDuration` | String | "7-8 hours" | Sleep duration |
| `alcoholOrSmoking` | String | "No" | Alcohol/smoking habits |
| `healthGoal` | String | "Weight Loss" | Health goal |
| `dietaryRestrictions` | JSON Array | "[\"Gluten-free\"]" | Dietary restrictions |
| `preferredExerciseType` | String | "Cardio" | Preferred exercise type |

**Response:**
```json
{
    "success": true,
    "message": "Health information updated successfully!"
}
```

**Important Notes:**
- Arrays must be sent as JSON strings
- All fields are optional except `name`
- Use proper JSON format for array fields: `"[\"item1\",\"item2\"]"`

## 📊 Data Models

### User Registration Request
```typescript
interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}
```

### User Login Request
```typescript
interface LoginRequest {
    email: string;
    password: string;
}
```

### Authentication Response
```typescript
interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
}
```

### User Profile Response
```typescript
interface ProfileResponse {
    success: boolean;
    userData: UserData;
}
```

### Complete User Data Model
```typescript
interface UserData {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    gender?: string;
    dob?: string;
    address?: {
        line1: string;
        line2: string;
    };
    image?: string;
    
    // Health Information
    height?: string;
    weight?: string;
    bloodGroup?: string;
    medicalConditions?: string[];
    currentMedications?: string[];
    allergies?: string[];
    
    // Lifestyle Information
    dietPreference?: string;
    activityLevel?: string;
    exerciseRoutine?: string;
    sleepDuration?: string;
    alcoholOrSmoking?: string;
    healthGoal?: string;
    dietaryRestrictions?: string[];
    preferredExerciseType?: string;
}
```

## ❌ Error Handling

### Common Error Responses

**Validation Error:**
```json
{
    "success": false,
    "message": "Missing Details"
}
```

**Authentication Error:**
```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

**Token Error:**
```json
{
    "success": false,
    "message": "Invalid token"
}
```

**Server Error:**
```json
{
    "success": false,
    "message": "Internal server error"
}
```

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid token)
- `404` - Not Found
- `500` - Internal Server Error

## 📱 Android Integration

### Retrofit Setup

**1. Add Dependencies (build.gradle):**
```gradle
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
implementation 'com.squareup.okhttp3:logging-interceptor:4.9.0'
```

**2. API Interface:**
```kotlin
interface UserApiService {
    
    @POST("user/register")
    fun registerUser(@Body request: RegisterRequest): Call<AuthResponse>
    
    @POST("user/login")
    fun loginUser(@Body request: LoginRequest): Call<AuthResponse>
    
    @GET("user/get-profile")
    fun getUserProfile(@Header("token") token: String): Call<ProfileResponse>
    
    @Multipart
    @POST("user/update-health-info")
    fun updateHealthInfo(
        @Header("token") token: String,
        @PartMap data: Map<String, @JvmSuppressWildcards RequestBody>
    ): Call<ApiResponse>
}
```

**3. Retrofit Client:**
```kotlin
object ApiClient {
    private const val BASE_URL = "http://your-server-ip:4000/api/"
    
    val userApi: UserApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(UserApiService::class.java)
    }
}
```

**4. Usage Example:**
```kotlin
// Login User
val loginRequest = LoginRequest("john@example.com", "password123")
ApiClient.userApi.loginUser(loginRequest).enqueue(object : Callback<AuthResponse> {
    override fun onResponse(call: Call<AuthResponse>, response: Response<AuthResponse>) {
        if (response.isSuccessful && response.body()?.success == true) {
            val token = response.body()?.token
            // Save token and proceed
        }
    }
    
    override fun onFailure(call: Call<AuthResponse>, t: Throwable) {
        // Handle error
    }
})

// Update Health Info
val healthData = mapOf(
    "name" to "John Doe".toRequestBody("text/plain".toMediaType()),
    "height" to "6'0\"".toRequestBody("text/plain".toMediaType()),
    "weight" to "70kg".toRequestBody("text/plain".toMediaType()),
    "allergies" to "[\"Peanuts\"]".toRequestBody("text/plain".toMediaType())
)

ApiClient.userApi.updateHealthInfo(token, healthData).enqueue(object : Callback<ApiResponse> {
    override fun onResponse(call: Call<ApiResponse>, response: Response<ApiResponse>) {
        if (response.isSuccessful && response.body()?.success == true) {
            // Health info updated successfully
        }
    }
    
    override fun onFailure(call: Call<ApiResponse>, t: Throwable) {
        // Handle error
    }
})
```

## 🧪 Testing with Postman

### Import Collection
Create a Postman collection with these requests:

**1. Register User:**
- Method: POST
- URL: `{{baseUrl}}/user/register`
- Body (JSON):
  ```json
  {
      "name": "Test User",
      "email": "test@example.com",
      "password": "password123"
  }
  ```

**2. Login User:**
- Method: POST
- URL: `{{baseUrl}}/user/login`
- Body (JSON):
  ```json
  {
      "email": "test@example.com",
      "password": "password123"
  }
  ```

**3. Get Profile:**
- Method: GET
- URL: `{{baseUrl}}/user/get-profile`
- Headers: `token: {{authToken}}`

**4. Update Health Info:**
- Method: POST
- URL: `{{baseUrl}}/user/update-health-info`
- Headers: `token: {{authToken}}`
- Body (form-data): Add health fields as needed

### Environment Variables
```json
{
    "baseUrl": "http://localhost:4000/api",
    "authToken": "your-jwt-token-here"
}
```

## 🔧 Development Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Environment variables configured

### Environment Variables (.env)
```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### Running the Server
```bash
# Install dependencies
npm install

# Start development server
npm run server

# Start production server
npm start
```

## 📞 Support

For API support and questions:
- **Repository:** [HealthForgee](https://github.com/mrravipandee/HealthForgee)
- **Developer:** @mrravipandee
- **Issues:** Create an issue in the GitHub repository

## 🔄 Version History

- **v1.0.0** - Initial User API endpoints
- **v1.1.0** - Added comprehensive health information management
- **v1.2.0** - Enhanced error handling and validation

---

**Last Updated:** September 26, 2025
**API Version:** 1.2.0