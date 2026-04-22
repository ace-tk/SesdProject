export const INITIAL_MAINTENANCE_DATA = [
  {
    maintenance_id: 1,
    resident_id: 1,
    description: "Leaking faucet in kitchen",
    priority: "Medium",
    status: "Pending",
    created_at: "2026-04-20T10:00:00Z",
    staff_id: null,
    staff_name: null,
    feedback: null
  },
  {
    maintenance_id: 2,
    resident_id: 1,
    description: "Main door lock jammed",
    priority: "High",
    status: "In-Progress",
    created_at: "2026-04-21T08:30:00Z",
    staff_id: 101,
    staff_name: "Rahul Sharma",
    feedback: "Parts ordered, work started."
  },
  {
    maintenance_id: 3,
    resident_id: 2,
    description: "AC servicing required",
    priority: "Low",
    status: "Completed",
    created_at: "2026-04-18T14:15:00Z",
    staff_id: 102,
    staff_name: "Suresh Kumar",
    feedback: "Completed servicing and filter change."
  }
];

export const INITIAL_STAFF_DATA = [
  { staff_id: 101, username: "Rahul Sharma", specialization: "Plumbing & Hardware" },
  { staff_id: 102, username: "Suresh Kumar", specialization: "Electrical & AC" },
  { staff_id: 103, username: "Amit Singh", specialization: "Carpentry" },
  { staff_id: 104, username: "Vikas Patel", specialization: "General Maintenance" }
];

export const INITIAL_VISITOR_DATA = [
  {
    visitor_id: 1,
    resident_id: 1,
    name: "Aman Gupta",
    phone: "9876543210",
    purpose: "Delivery",
    status: "Entered",
    entry_time: "2026-04-22T09:15:00Z",
    exit_time: null,
    created_at: "2026-04-22T09:00:00Z"
  },
  {
    visitor_id: 2,
    resident_id: 1,
    name: "Sneha Reddy",
    phone: "9123456789",
    purpose: "Personal Guest",
    status: "Expected",
    entry_time: null,
    exit_time: null,
    created_at: "2026-04-22T10:30:00Z"
  },
  {
    visitor_id: 3,
    resident_id: 2,
    name: "Courier Service",
    phone: "9988776655",
    purpose: "Service",
    status: "Exited",
    entry_time: "2026-04-22T08:00:00Z",
    exit_time: "2026-04-22T08:20:00Z",
    created_at: "2026-04-22T07:45:00Z"
  }
];

export const INITIAL_RESIDENT_DATA = [
  { id: 1, username: "Resident 101", apartment: "A-101" },
  { id: 2, username: "Resident 205", apartment: "B-205" }
];
