# Uses the latest postgres image
FROM postgres:latest

# Exposes the port. For postgres, it's always 5432
EXPOSE 5432

# Copies the initialization scripts. 
# This will automatically be executed by postgres at start
COPY ./init /docker-entrypoint-initdb.d/