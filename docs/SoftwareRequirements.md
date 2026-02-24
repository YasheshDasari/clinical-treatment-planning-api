# Clinical Treatment Planning API: Software Requirements Specification (SRS)

Version: 0.1 <br>
Status: First draft <br>
Author: Yashesh Dasari <br> 
Date: February 24, 2026 <br>

Find the revision details at the end of the document.

---

# 1. Introduction
## 1.1 Purpose
This document defines the functional, non-functional, and security requirements for the Clinical Treatment Planning API. 
The system architect is aligned with the principles outlined in [International Electrotechnical Commission 62304](https://webstore.iec.ch/en/publication/22794) (IEC 62304): Medical device software - Software life cycle processes, emphasizing traceability, structured 
documentation, and verification planning.   

## 1.2 Scope
The Clinical Treatment Planning API is a secure backend REST system that provides the following capabilities:
1. User management (Admin, and Clinician).
2. Create new and manage existing treatment plans.
3. Secure authentication and role-based authorization.
4. Structured data management of treatment configuration data.

The system is designed for Docker-based local deployment. The system architecture is designed with the awareness of future cloud deployment.

---

## 1.3 Definitions
1. User roles:
   1. Admin: User role with elevated privileges.
   1. Clinician: User role responsible for creating treatment plans.
1. Treatment Plan: A structured workflow defining clinical treatment parameters. 
1. API: Application Programming Interface. APIs are guiding definitions and protocols that enable two software components to communicate with each other.
1. JWT: JSON Web Token. It is an open standard (RFC 7519) that defines a compact and self-contained way for secure information exchange using JSON objects.
1. REST: Representational State Transfer. It is an architectural standard that guides the design and development of processes which enable interaction with data stored on web servers.
1. RBAC: Role-Based Access Control. It is a cybersecurity model that restricts system access to authorized users based on pre-defined rules.
1. Treatment Plan Status:
   1. Draft: Initial editable state.
   1. Approved: Finalized state, no further modification allowed.

---

# 2. System Overview 
The Clinical Treatment Planning API exposes REST endpoints secured via JSON Web Token (JWT) authentication. It stores and manages data 
in a PostgreSQL database and follows a modular NestJS architecture. 

There are two types of user roles (also called actors):
1. Admin
2. Clinician

## 2.1 System Context
The system operates as a backend service within a clinical software ecosystem. It exposes REST endpoints consumed by client applications. The API 
does not directly control medical hardware and is limited to configuration and workflow management.

---

# 3. Functional Requirements
This section outlines the functional requirements of the Clinical Treatment Planning API.

### FR-1: User Authentication
The system shall authenticate registered users using email and password credentials.

### FR-2: JWT Issuance
The system shall issue a JWT upon successful authentication.

### FR-3: Role-Based Access Control
The system shall restrict access to protected endpoints based on user role.
   
<!-- CRUD operations -->
### FR-4: Create Clinical Treatment Plan
The system shall allow a Clinician to create a treatment plan with defined parameters.

### FR-5: Access Treatment Plan
The system shall allow authorized users to access and retrieve treatment plan details.

### FR-6: Update Treatment Plan
The system shall allow modification of treatment plans only while in 'Draft' status.

### FR-7: Approve Treatment Plan
The system shall allow Admin users to approve a treatment plan.

### FR-8: Treatment Plan Status Control
The system shall enforce valid treatment plan status transitions, from 'Draft' to 'Approved'. 

### FR-9: Input Validation
The system shall validate all incoming data using defined constraints.

### FR-10: Audit Logging
The system shall record audit logs for treatment plan creation, modification, and approval events.

---

# 4. Non-Functional Requirements
This section outlines the non-functional requirements of the Clinical Treatment Planning API.

### NFR-1: Modularity
The system shall follow a modular architecture separating the routing, services, and data access layers. 

### NFR-2: Containerized
The system shall support Docker-based deployment.

### NFR-3: Data Persistence
The system shall persist all treatment plans in a PostgreSQL database.

### NFR-4: Performance
The system shall respond to API requests within 500ms under single-user local development conditions.

### NFR-5: Maintainability
The system shall use TypeScript for type safety and maintainability.

### NFR-6: Testability
The system shall implement unit and integration tests for business logic.

---

# 5. Security Requirements

### SEC-1: Password Encryption
The system shall hash user passwords before storage.

### SEC-2: Endpoint Protection
The system shall protect all treatment plan endpoints using JWT authentication.

### SEC-3: Authorization Enforcement
The system shall enforce RBAC rules at the API layer.

### SEC-4: Input Sanitization
The system shall validate and sanitize input data to prevent malformed requests.

### SEC-5: Immutable Audit Logs
Audit records shall not be modifiable through public API endpoints.

---

# 6. Project Constraints
1. The system is initially developed as a prototype project and must not be used for real-world applications.
2. No real patient data is processed.
3. Risk management and hazard analysis are outside current project scope.
4. The system is deployed locally using Docker. Cloud deployment is a future task.
5. Formal IEC 62304 certification activities are outside current project scope.
6. Formal FDA approval activities are outside current project scope.

---

# 7. Traceability Plan
Each requirement (FR, NFR, and SEC) shall:
1. Map to one or more GitHub issues.
2. Map to one or more unit or integration tests.
3. Be referenced in the Merge Request implementing the requirement.

---

# 8. Verification Plan
1. Unit tests shall validate business logic.
2. Integration tests shall validate authentication and lifecycle workflows.

---
# 9. Future Scope
1. Risk management documentation.
2. Safety classification as per the IEC 62304 standards.
3. Cloud deployment architecture.

---