### Clean architecture implementation
This is a REST API built in Node.js using TypeScript. The objective is to implement Clean Architecture introduced by Robert C. Martin.

![Clean Architecture](assets/img/clean-architecture.avif "Clean Architecture")

### Source Directory

The `src/` directory contains the source code for the application.

### Subdirectories

#### `config/`
Configuration files and adapters for third party dependencies

#### `data/`
Direct reference to databases: PostgreSQL, Oracle, MongoDB, etc.
In this way we decouple the model from the entities
- **mongodb/**: MongoDB implementation
  - **models/**

#### `domain/`
Application business rules. This is agnostic and should not have dependencies
to third party libraries.
- **datasources/**: Data sources rules to follow
- **dtos/**: Data Transfer Objects
- **entities/**: Entities business rules, decoupled from the database schemas
- **errors/**: Managed customized errors
- **repositories/**: Repository rules
- **use-cases/**: Use cases rules

#### `infrastructure/`
Implementations of business rules.
- **datasources/**: Data sources implementations
- **mappers/**: Object transformations
- **repositories/**: Call data sources. Bridge between data sources and our code

#### `presentation/`
Presentation layer to the users.

