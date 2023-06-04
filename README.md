# BoostFolio

BoostFolio is a web-based platform designed to enhance personal portfolios and assist users in tailoring their portfolios to specific job opportunities. It analyzes portfolios and CVs against job descriptions, providing tailored suggestions for improvement to boost users' prospects and help them achieve their career goals.

## Inspiration

The idea for BoostFolio originated from a challenge presented at a Hackathon, which focused on enhancing personal portfolios and aiding users in improving theirs. With diverse ideas and interests, it can be challenging to identify which projects will resonate most with potential employers who value different aspects. Furthermore, each job requires a unique approach, making the task of tailoring portfolios crucial.

## Features

- Portfolio analysis: BoostFolio analyzes users' portfolios and CVs, comparing them against the job description of their desired role. This analysis helps users understand how well their skills and projects align with the job opportunity.

- Tailored suggestions: Based on the portfolio analysis, BoostFolio provides personalized suggestions for improvement. These suggestions guide users in optimizing their portfolios to present their skills and projects in the most attractive light for each unique job opportunity.

- Seamless integration: BoostFolio seamlessly integrates Django, React.js, and CockroachDB to provide a robust and efficient platform for users. Django handles the backend logic and connects with the frontend user interactions, which are designed using Figma. React.js and static HTML are used for frontend development, ensuring a responsive and user-friendly interface. The database is hosted on the cloud using CockroachDB, ensuring secure and scalable storage of user data.

## Technologies Used

- Django: A Python web framework used for executing backend logic and connecting with frontend user interactions.

- React.js: A JavaScript library for building user interfaces, used for frontend development and creating a responsive user experience.

- Figma: A web-based design tool used for designing the frontend user interface and interactions.

- CockroachDB: A distributed SQL database used for hosting the application's database on the cloud. It provides scalability and reliability for storing user data.

## Challenges

During the development of BoostFolio, the team encountered several challenges, including:

- Integrating Django and React.js: Django does not have native support for React.js integration, leading to technical difficulties in connecting the backend and frontend frameworks. The team had to find workarounds and implement effective solutions to ensure seamless integration between the two.

- Centralized database management: Managing a centralized database posed a challenge, requiring careful design and implementation to handle user data securely and efficiently.

- Parsing and structuring data from PDF files: Extracting data from PDF files can be complex due to the various formatting and structure possibilities. The team faced challenges in accurately parsing and structuring the data extracted from PDF files.

## Getting Started

To get started with BoostFolio, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/BoostFolio.git`
2. Install the required dependencies for both the backend and frontend:
   - Backend (Django): `pip install -r requirements.txt`
   - Frontend (React.js):(in frontend folder) `npm install`
3. Set up the database:
   - Create a CockroachDB instance and obtain the connection URL.
   - Configure the connection settings in the Django settings file (`settings.py`).
4. Run the backend server: `python manage.py runserver`
5. Run the frontend development server: `npm start`
6. Access BoostFolio in your web browser at `http://localhost:3000`. 
## Screenshots<img width="960" alt="Screenshot 2023-06-04 173239" src="https://github.com/aviiciii/portfolio/assets/76479104/53a9c2a7-c0aa-43b5-b1bd-5b911572dd99">
<img width="960" alt="Screenshot 2023-06-04 173328" src="https://github.com/aviiciii/portfolio/assets/76479104/4a3afe87-64ca-4289-a619-29b0f11c85a2">

<img width="410" alt="Screenshot 2023-06-04 173403" src="https://github.com/aviiciii/portfolio/assets/76479104/c234f572-e2c7-4e23-b994-959f63d0eb08">
<img width="410" alt="Screenshot 2023-06-04 173422" src="https://github.com/aviiciii/portfolio/assets/76479104/e7a0f632-d215-4504-bfc3-5881156c830a">


## Contributors

- [@aviiciii](https://github.com/aviiciii) - Backend development
- [@HetviSoni](https://github.com/HetviSoni) - Frontend development
- [@audgeviolin07](https://github.com/audgeviolin07) - Frontend Development
- Caroline Jaworsky - Design and UI/UX


