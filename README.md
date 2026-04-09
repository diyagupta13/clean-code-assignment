# Clean Code Workshop

Welcome to the Clean Code Workshop! This repository contains hands-on sessions and a take-home assignment designed to help you practice and internalize clean code principles such as meaningful naming, reducing complexity, logic extraction, and testability.

## 📂 Repository Structure

- **`session-1/`**: Code Review & Refactoring
  - Focuses on identifying code smells (magic numbers, poor variable names, deep nesting) in an e-commerce cart calculation module and applying clean code principles to fix them.
- **`session-2/`**: Independent Refactoring
  - Features a messy user authentication module. Your goal is to apply guard clauses, separate concerns, and extract reusable pure functions.
- **`assignment/`**: Take-Home Assignment
  - Build an **Order Processing System** from scratch. This tests code organization under ambiguity and your ability to balance simplicity vs structure while handling validation, tax, and multiple discount rules cleanly.
- **`setup.md`**: Refer to this guide for workshop requirements and initial reference code.

## 🚀 Getting Started

Run the following commands in your terminal to set up the workshop:

```bash
# 1. Clone/download the workshop repo
git clone <workshop-repo>
cd clean-code

# 2. Check everything works
node session-1/exercise-1-solution.js

# 3. Start with review exercise
code session-1/exercise-1-review.js
```

### Next Steps:
1. Work through `session-1` to understand the initial refactoring approach and identify missing code smells.
2. Move on to `session-2` to practice independently on an authentication module.
3. Finally, navigate to `assignment/ASSIGNMENT.md` and complete the Take-Home coding assignment.