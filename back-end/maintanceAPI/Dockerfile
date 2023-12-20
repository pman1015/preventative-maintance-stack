#build stage 
FROM maven:3.8.8-eclipse-temurin-17 AS build
COPY pom.xml /app/
COPY src /app/src
RUN mvn -f /app/pom.xml clean package

#run stage
FROM eclipse-temurin:17
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT [ "java","-jar","/app.jar" ]
