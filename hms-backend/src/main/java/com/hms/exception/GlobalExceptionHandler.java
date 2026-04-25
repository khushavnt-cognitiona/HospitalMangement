package com.hms.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.validation.FieldError;
import java.util.stream.Collectors;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleException(Exception e) {
        e.printStackTrace(); 
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("message", e.getMessage() != null ? e.getMessage() : "Unknown Error");
        response.put("errorType", e.getClass().getSimpleName());
        
        // Temporarily include stack trace snippet for easy remote debugging
        java.io.StringWriter sw = new java.io.StringWriter();
        e.printStackTrace(new java.io.PrintWriter(sw));
        String fullStackTrace = sw.toString();
        response.put("stackTrace", fullStackTrace.length() > 500 ? fullStackTrace.substring(0, 500) : fullStackTrace);
        
        response.put("status", 500);
        return ResponseEntity.internalServerError().body(response);
    }

    @ExceptionHandler(org.springframework.security.core.AuthenticationException.class)
    public ResponseEntity<Map<String, Object>> handleAuthenticationException(org.springframework.security.core.AuthenticationException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("errorType", e.getClass().getSimpleName());
        response.put("message", "Invalid username or password");
        response.put("status", 401);
        return ResponseEntity.status(401).body(response);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException e) {
        e.printStackTrace();
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("errorType", e.getClass().getSimpleName());
        
        if (e instanceof org.springframework.dao.DataIntegrityViolationException) {
            response.put("message", "Username or email already exists. Please choose another.");
        } else {
            response.put("message", e.getMessage());
        }
        
        response.put("status", 400);
        return ResponseEntity.badRequest().body(response);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", 400);
        response.put("errorType", "ValidationError");
        
        String errorMessage = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(", "));
        
        response.put("message", errorMessage);
        return ResponseEntity.badRequest().body(response);
    }
}
