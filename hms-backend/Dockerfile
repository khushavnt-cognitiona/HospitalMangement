# Use OpenJDK 21 to match the project's java.version in pom.xml
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled executable JAR file into the container
# This assumes you have run 'mvn clean package' locally first
COPY target/*.jar app.jar

# Define the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
