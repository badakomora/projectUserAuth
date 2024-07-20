CREATE DATABASE projectuserauth;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    phone VARCHAR(255),
    password VARCHAR(255),
    otp VARCHAR(255)
);