# Hospital Management System (HMS) - Monolith

A complete, enterprise-level monolithic Hospital Management System built with Java Spring Boot, MySQL, and React.

## 🚀 Tech Stack

- **Backend**: Java Spring Boot 3.2.4 (Java 21)
- **Frontend**: React + Vite + Bootstrap 5
- **Security**: JWT (Json Web Token) with Spring Security 6
- **Database**: MySQL 8+
- **Styling**: Vanilla Bootstrap for professional clinical aesthetics

## 📂 Project Structure

- `hms-backend/`: Spring Boot Maven project
- `hms-frontend/`: React Vite project

## ⚙️ Setup Instructions

### 1. Prerequisites
- Java 21+ installed
- Node.js 18+ installed
- MySQL Server running

### 2. Database Configuration
1. Create a database named `hms_db` in MySQL.
2. Update `hms-backend/src/main/resources/application.properties` with your MySQL `username` and `password`.

### 3. Backend Setup
1. Navigate to `hms-backend/`.
2. Run `./mvnw spring-boot:run` (or use your IDE).
3. The server will start on `http://localhost:8080`.
4. **Note**: `DataInitializer` will automatically create sample users on first run.

### 4. Frontend Setup
1. Navigate to `hms-frontend/`.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:5173`.

## 🔑 Sample Credentials

| Role | Username | Password |
|------|----------|----------|
| **Admin** | `admin` | `admin123` |
| **Doctor** | `doctor1` | `doctor123` |
| **Patient** | `patient1` | `patient123` |
| **Nurse** | `nurse1` | `nurse123` |

## ✨ Core Features
- Role-Based Access Control (RBAC).
- Real-time Notifications.
- Appointment Booking & Slot Management.
- Clinical Prescription System.
- Ward & Staff Roster Management.
- Responsive Dashboards.

---
Created by Antigravity HMS Builder.
