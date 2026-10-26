# Stage 1: Build the application using Maven Wrapper
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw

# Download dependencies offline (cached layer)
RUN ./mvnw dependency:go-offline -B || true

# Copy source code and build package
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimal runtime image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy jar from builder
COPY --from=builder /app/target/ArtStudioService-*.jar app.jar

# Server port configuration
EXPOSE 8081

# Default environment variables for container networking
ENV PORT=8081 \
    DB_HOST=postgresdb \
    DB_PORT=5432 \
    DB_NAME=exam_2400030016 \
    DB_USERNAME=postgres \
    DB_PASSWORD=root

ENTRYPOINT ["java", "-jar", "app.jar"]
