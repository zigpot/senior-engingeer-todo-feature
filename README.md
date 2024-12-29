### Task: Development of a Comprehensive TODO-Feature for Medical Practices

#### Context:
The effective operation of medical practices involves the collaboration of multiple roles, necessitating robust task management to ensure clarity in responsibilities. A "To-Do" feature is indispensable for facilitating the assignment, tracking, and management of tasks across varied roles within the practice.

---

#### **Tech Stack:**
- **Backend:** NodeJS + TypeScript
- **Frontend:** React
- **Database:** PostgreSQL

---

#### **Acceptance Criteria:**

**User Management:**

- **User Creation:**
  - Enable the creation of users with predefined roles: **Doctor**, **Nurse**, and **Secretary**.
  - For users assigned the role of Doctor, additional attributes, such as a unique **doctor number**, must be captured and stored.

**Patient Management:**

- **Patient Creation:**
  - Allow the creation of patient profiles that can be associated with one or more doctors.

**To-Do Management:**

- **Task Creation and Assignment:**
  - Facilitate the creation of To-Do items that can be assigned to one or multiple users.
  - Provide the ability to define deadlines for each task.
- **Task-Resource Interaction:**
  - Enable the integration of external resources, such as patient files, doctor letters, or prescriptions, within To-Do items.
  - Example Use Case: A To-Do item might specify, “Review the doctor letter of patient PATIENT_NAME,” with an interactive link to the referenced doctor letter, allowing the assigned user to access it via a modal for review.

**Frontend Requirements:**

1. **Task Visualization:**
   - Display a comprehensive list of all To-Do items.
2. **Task Creation:**
   - Provide an interface for creating new To-Do items.
3. **Task Modification:**
   - Support updates to existing tasks, including modifications to deadlines and user assignments.
4. **Task Filtering:**
   - Implement filtering capabilities to sort and view tasks based on:
     - Deadline dates.
     - Assigned users.
     - Associated resources (e.g., patients, doctor letters).

---

#### **Deliverables:**

1. **Backend Development:**
   - Implement endpoints to support CRUD (Create, Read, Update, Delete) operations for Users, Patients, and To-Do items.
   - Develop functionality to link and interact with external resources.

2. **Frontend Development:**
   - Create a user interface that enables:
     - Viewing, creating, and updating To-Do items.
     - Filtering tasks based on the aforementioned criteria.
     - Interaction with linked external resources.

3. **Code Documentation:**
   - Include inline comments to elucidate the purpose and logic of key components.
   - Provide a detailed README.md file outlining setup instructions, database seeding, and feature testing procedures.

4. **Additional Enhancements (Bonus):**
   - Incorporate unit tests to validate backend logic.
   - Implement user authentication to secure task management functionalities.

---

#### **Evaluation Criteria:**

1. **Feature Fulfillment:**
   - Does the implementation comprehensively satisfy the stated acceptance criteria?
2. **Code Quality:**
   - Is the codebase well-structured, modular, and accompanied by adequate documentation?
3. **Database Design:**
   - Are the database models and relationships optimized for scalability and efficiency?
4. **Frontend Usability:**
   - Does the user interface facilitate intuitive interaction with tasks and resources?
5. **Scalability and Extensibility:**
   - Is the solution designed with future enhancements in mind?
6. **Additional Features:**
   - Are supplementary features, such as authentication or comprehensive testing, implemented?

---

#### Submission Guidelines:

- Upload the completed solution to a GitHub repository (public or private).
- Include detailed instructions in the README file for:
  - Setting up the application.
  - Seeding the database with sample data.
  - Testing the implemented functionalities.

