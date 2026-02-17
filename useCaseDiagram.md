

```mermaid
usecaseDiagram
    actor Resident
    actor Admin
    actor "Maintenance Staff" as Staff
    actor "Security Guard" as Security

    package "Apartment Management System" {
        usecase "Login" as UC1
        usecase "View Dashboard" as UC2
        
        %% Maintenance
        usecase "Raise Maintenance Request" as UC3
        usecase "View Request Status" as UC4
        usecase "Update Request Status" as UC5
        usecase "Assign Staff" as UC6
        usecase "View Assigned Tasks" as UC7
        usecase "Track Request History" as UC8

        %% Visitor Management
        usecase "Pre-approve Visitor" as UC9
        usecase "Log Visitor Entry" as UC10
        usecase "Verify Visitor" as UC11
        usecase "View Visitor History" as UC12

        %% Admin
        usecase "Manage Residents" as UC13
        usecase "Generate Reports" as UC14
        usecase "Manage Staff" as UC15
    }

    Resident --> UC1
    Resident --> UC3
    Resident --> UC4
    Resident --> UC9
    Resident --> UC12

    Admin --> UC1
    Admin --> UC2
    Admin --> UC6
    Admin --> UC13
    Admin --> UC14
    Admin --> UC15
    Admin --> UC8

    Staff --> UC1
    Staff --> UC5
    Staff --> UC7
    Staff --> UC4

    Security --> UC1
    Security --> UC10
    Security --> UC11
    Security --> UC12
```
