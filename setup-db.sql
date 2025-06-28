-- Create user and database for the blog application
CREATE USER bloguser WITH PASSWORD 'karthikM449$';
CREATE DATABASE modernblog;
GRANT ALL PRIVILEGES ON DATABASE modernblog TO bloguser;

-- Connect to the modernblog database and grant schema privileges
\c modernblog;
GRANT ALL ON SCHEMA public TO bloguser;
GRANT CREATE ON SCHEMA public TO bloguser;

