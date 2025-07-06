# 🎨 MoodBoard Java Project Starter

## 🗃️ Database Setup

Inside the `<project-root>/database/` directory, you'll find an executable Bash script (`create.sh`) and several SQL scripts (`.sql` files). These are used to build and rebuild the **PostgreSQL** database for the MoodBoard project.

To build the database, run the following from your terminal:

```bash
cd <project-root>/database/
./create.sh
```

This Bash script:

* Drops the existing `moodboard` database (if it exists)
* Recreates the database
* Runs all SQL setup scripts in the correct order

You don't need to modify the script unless you plan to change the database name.

### 🗂 SQL Scripts

| File Name    | Description                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------- |
| `data.sql`   | Populates the database with demo/test data. This includes default users for testing.              |
| `dropdb.sql` | Destroys the database and users so it can be cleanly rebuilt.                                     |
| `schema.sql` | Creates all database objects (tables, sequences, etc.). Modify this to define your app structure. |
| `user.sql`   | Creates the database users (`moodboard_owner`, `moodboard_appuser`) and assigns privileges.       |

---

### 👥 Database Users

The superuser `postgres` is only for administration — not used by the application itself. Instead, we use two project-specific users:

| Username            | Description                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `moodboard_owner`   | Owns all schema objects. Full privileges. Used for admin purposes in tools like PgAdmin.                                      |
| `moodboard_appuser` | Used by the application to connect. Has `SELECT`, `INSERT`, `UPDATE`, `DELETE` access to tables and read access to sequences. |

---

## 🚀 Spring Boot Backend

> Note: Spring Boot is configured to run on port `9000` instead of the default `8080`.

### 🔌 Datasource Configuration

Your `src/resources/application.properties` file has the following setup:

```properties
# datasource connection properties
spring.datasource.url=jdbc:postgresql://localhost:5432/moodboard
spring.datasource.name=moodboard
spring.datasource.username=moodboard_appuser
spring.datasource.password=moodboard
```

### 🧱 Using JdbcTemplate

An example DAO setup with Spring's `JdbcTemplate` is found in:

```
src/main/java/com/moodboard/dao/JdbcUserDao.java
```

```java
@Service
public class JdbcUserDao implements UserDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcUserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
}
```

Spring automatically injects `JdbcTemplate` into DAO constructors.

---

### 🌐 CORS Support

To allow requests from the React frontend, controllers should use:

```java
@CrossOrigin
```

Example:

```java
@RestController
@CrossOrigin
public class AuthenticationController {
    // ...
}
```

---

## 🔐 Security

Security config is located under:

```
src/main/java/com/moodboard/security/
```

This includes JWT-based auth and should not need major changes unless customizing login/registration behavior.

---

## 📡 Controllers

Controllers are under:

```
com.moodboard.controller
```

### 🔑 `AuthenticationController.java`

* Handles `/login` and `/register`
* Works seamlessly with the React starter
* Uses `JdbcUserDao` to authenticate and register users

### 👤 `UserController.java`

* Endpoints:

    * `GET /users`
    * `GET /users/{id}`
* Used by the frontend to validate user tokens on login and re-entry

---

## 🔪 Testing

### DAO Integration Tests

Use the provided base test class:

```
com.moodboard.dao.BaseDaoTest
```

This:

* Initializes a test datasource
* Rolls back changes between tests

### Example Test:

```
com.moodboard.dao.JdbcUserDaoTest
```

Test data is found in:

```
src/test/resources/test-data.sql
```

Schema for tests is reused from:

```
database/schema.sql
```

