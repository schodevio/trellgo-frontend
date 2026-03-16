# API Error Handling

Backend returns errors in a consistent format.

Example validation error:

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Request validation failed",
    "details": {
      "email":    "must be a valid email address",
      "password": "must be at least 8 characters"
    }
  }
}
```

Frontend should map validation errors to form inputs.
