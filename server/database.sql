CREATE DATABASE couch_surfing;
CREATE TABLE usersinfo (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    verification_code VARCHAR(10),
    verification_code_expires TIMESTAMP,
    user_type VARCHAR(10) NOT NULL CHECK (user_type IN ('host', 'guest'))
);
CREATE TABLE houses (
    id SERIAL PRIMARY KEY,
    provider_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
     image VARCHAR(255)
);
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    house_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'booked',
    FOREIGN KEY (house_id) REFERENCES houses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES usersinfo(id) ON DELETE CASCADE
);
