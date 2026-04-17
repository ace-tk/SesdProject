-- Apartment Maintenance & Visitor Management System Schema

-- 1. Apartments Table
CREATE TABLE IF NOT EXISTS APARTMENTS (
    apartment_id INT AUTO_INCREMENT PRIMARY KEY,
    block_number VARCHAR(10) NOT NULL,
    flat_number VARCHAR(10) NOT NULL,
    floor INT NOT NULL,
    type VARCHAR(20) DEFAULT 'Standard',
    status ENUM('Occupied', 'Vacant', 'Maintenance') DEFAULT 'Vacant',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users Table (Core Auth Table)
CREATE TABLE IF NOT EXISTS USERS (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15),
    role ENUM('Admin', 'Resident', 'Staff', 'Security') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Staff Table (Inheritance from User)
CREATE TABLE IF NOT EXISTS STAFF (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    specialization VARCHAR(50),
    shift_timing VARCHAR(50),
    join_date DATE,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
);

-- 4. Residents Table (Inheritance from User)
CREATE TABLE IF NOT EXISTS RESIDENTS (
    resident_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    apartment_id INT NOT NULL,
    is_owner BOOLEAN DEFAULT FALSE,
    move_in_date DATE,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (apartment_id) REFERENCES APARTMENTS(apartment_id) ON DELETE CASCADE
);

-- 5. Maintenance Requests Table
CREATE TABLE IF NOT EXISTS MAINTENANCE_REQUESTS (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    resident_id INT NOT NULL,
    assigned_staff_id INT,
    description TEXT NOT NULL,
    status ENUM('Pending', 'In-Progress', 'Completed', 'Cancelled') DEFAULT 'Pending',
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completion_date TIMESTAMP,
    feedback TEXT,
    FOREIGN KEY (resident_id) REFERENCES RESIDENTS(resident_id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_staff_id) REFERENCES STAFF(staff_id) ON DELETE SET NULL
);

-- 6. Visitors Table
CREATE TABLE IF NOT EXISTS VISITORS (
    visitor_id INT AUTO_INCREMENT PRIMARY KEY,
    host_resident_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(15),
    purpose VARCHAR(255),
    expected_arrival DATETIME,
    actual_entry DATETIME,
    exit_time DATETIME,
    status ENUM('Expected', 'Checked-In', 'Checked-Out', 'Denied') DEFAULT 'Expected',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (host_resident_id) REFERENCES RESIDENTS(resident_id) ON DELETE CASCADE
);

-- 7. Seed Data for Demo
INSERT INTO APARTMENTS (block_number, flat_number, floor, type, status) 
VALUES 
('A', '101', 1, 'Standard', 'Vacant'),
('A', '102', 1, 'Standard', 'Occupied'),
('B', '201', 2, 'Premium', 'Vacant'),
('B', '202', 2, 'Premium', 'Maintenance'),
('C', '301', 3, 'Standard', 'Vacant');
