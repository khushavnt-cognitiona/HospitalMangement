# Stage 1: Build the application using Maven
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy the hms-backend contents (monorepo setup)
COPY hms-backend/pom.xml hms-backend/
COPY hms-backend/src hms-backend/src

# Set working directory to the backend folder
WORKDIR /app/hms-backend

# Build the application and create the JAR file
RUN mvn clean package -DskipTests

# Stage 2: Run the application using a lightweight JRE
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy the JAR file from the build stage for running
COPY --from=build /app/hms-backend/target/*.jar app.jar

# Expose the port the app runs on (Render defaults to this if not specified)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
