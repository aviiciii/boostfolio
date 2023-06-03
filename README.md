# portfolio


To run a Django project, you need to follow these steps:

1. Clone the repo and in the base dir

2. Run the following command to create a virtual environment:
   ```
   python -m venv env
   ```
   This will create a new directory named `env` that contains the virtual environment files.

3. Activate the Virtual Environment: After creating the virtual environment, you need to activate it. The commands to activate the virtual environment vary depending on your operating system:
   - On Windows:
     ```
     .\env\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source env/bin/activate
     ```

4. Install Django: Once the virtual environment is activated, you can install Django using the package manager called pip. Run the following command to install Django:
   ```
   pip install Django
   ```
5. Cd onto the Django directory:
  ```
  cd portfolio_dj
  ```


6. Apply Migrations: Django uses migrations to manage database schema changes. You need to apply the initial migrations to create the necessary database tables. In the terminal or command prompt, navigate to your project's directory (where the `manage.py` file is located) and run the following command:
   ```
   python manage.py migrate
   ```
   Run the above command once and then only when we make changes to the databases

7. Run the Development Server: Finally, you can start the Django development server to run your project. In the terminal or command prompt, navigate to your project's directory and run the following command:
   ```
   python manage.py runserver
   ```
   The development server will start running on `http://127.0.0.1:8000/` by default.

Congratulations! You have successfully set up and run your Django project. You can now access your project by opening a web browser and navigating to `http://127.0.0.1:8000/`.
