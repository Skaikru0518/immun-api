<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🧬 Immunology API Backend

This is a NestJS-based backend application modeling an immunology database.  
It allows management of immune cells, receptors, and cytokines, as well as the biological relationships between them (e.g., which cell expresses which receptor, or which cytokine it produces).

## 🚀 Main Features

- **Receptors:** CRUD operations for immune receptors (e.g., CD4, IL-2R).
- **Immune Cells:** CRUD operations for immune cells (e.g., T helper cell, Macrophage).
- **Cytokines:** CRUD operations for cytokines (e.g., IL-2, TNF-alpha).
- **Relationships:**
  - Cells can express multiple receptors, and receptors can exist on multiple cells (`ManyToMany`).
  - Cells can produce multiple cytokines, and cytokines can be produced by multiple cells (`ManyToMany`).
- **Database:** MySQL (Amazon RDS).
- **API Documentation:** Swagger UI for easy testing and integration.
- **Validation:** `class-validator` for input validation.
- **Idempotent Seeding:** Load the database with predefined sample data, safe to run multiple times without duplicates.

## 🛠️ Tech Stack

- **Backend:** NestJS (Node.js framework)
- **Database:** MySQL with TypeORM
- **API Docs:** Swagger (OpenAPI)
- **Validation:** `class-validator`, `class-transformer`
- **Environment variables:** `@nestjs/config`

## 📦 Installation & Local Run

1. **Clone the repo:**

   ```bash
   git clone <repo link>
   cd immunology-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the project root and add your MySQL RDS credentials:

   ```env
   DB_HOST=your-rds-endpoint.rds.amazonaws.com
   DB_PORT=3306
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=your_database_name
   ```

4. **Seed sample data (immune cells, receptors, cytokines):**

   ```bash
   npm run seed
   ```

   The seeder is idempotent – you can run it multiple times without creating duplicates.

5. **Start the application:**
   - Development mode:
     ```bash
     npm run start:dev
     ```
   - Production mode:
     ```bash
     npm run build
     npm run start:prod
     ```

The app will run on: `http://localhost:3000`

## 📄 API Documentation (Swagger)

Once the application is running, you can view the API documentation:

- **Swagger UI:** `http://localhost:3000/api`

Here you can explore all available endpoints, request/response schemas, and directly test the API.
