# Clinical Treatment Planning API: Software Requirements Specification (SRS)

Version: 0.1
Status: First draft
Author: Yashesh Dasari
Date: February 24, 2026

Find the revision details at the end of the document.

---

# 1. Introduction
## 1.1 Purpose
This document defines the functional, non-functional, and security requirements for the Clinical Treatment Planning API. 
The system architect is aligned with the principles outlined in IEC 62304: Medical Software Lifecycle Processes, emphasizing traceability, structured 
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


