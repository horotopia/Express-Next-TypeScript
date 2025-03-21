import { UserRole } from "@domain/value-objects";

export const usersData = [
  {
    "id": "1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "123456Password!",
    "phone": "123-456-7890",
    "role": UserRole.ADMIN,
    "isActive": true,
    "createdAt": new Date("2021-01-01T00:00:00Z"),
    "lastLoginAt": new Date("2021-01-10T00:00:00Z")
  },
  {
    "id": "2",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "password": "123456Password!",
    "phone": "123-456-7891",
    "role": UserRole.USER,
    "isActive": true,
    "createdAt": new Date("2021-01-01T00:00:00Z"),
    "lastLoginAt": new Date("2021-01-11T00:00:00Z")
  },
  {
    "id": "3",
    "firstName": "Alice",
    "lastName": "Johnson",
    "email": "alice.johnson@example.com",
    "password": "123456Password!",
    "phone": "123-456-7892",
    "role": UserRole.USER,
    "isActive": false,
    "createdAt": new Date("2021-01-01T00:00:00Z"),
    "lastLoginAt": undefined
  },
  {
    "id": "4",
    "firstName": "Bob",
    "lastName": "Brown",
    "email": "bob.brown@example.com",
    "password": "123456Password!",
    "phone": "123-456-7893",
    "role": UserRole.USER,
    "isActive": true,
    "createdAt": new Date("2021-01-01T00:00:00Z"),
    "lastLoginAt": new Date("2021-01-12T00:00:00Z")
  }
];