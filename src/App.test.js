import { render, screen } from '@testing-library/react';
import App from './App';
import RegisterForm from './components/RegisterForm';

test('renders dashboard page', () => {
  render(<App />);
  const linkElement = screen.getByText(/dashboard page/i);
  expect(linkElement).toBeInTheDocument();
});

test('all field in form fully renders', () => {
  render(<RegisterForm />);
  const emailField = screen.getByTestId("email");
  const passwordField = screen.getByTestId("password");
  const firstNameField = screen.getByTestId("first_name");
  const lastNameField = screen.getByTestId("last_name");
  const dateOfBirth = screen.getByTestId("date_of_birth");
  const profilePic = screen.getByTestId("profile_picture");
  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(firstNameField).toBeInTheDocument();
  expect(lastNameField).toBeInTheDocument();
  expect(dateOfBirth).toBeInTheDocument();
  expect(profilePic).toBeInTheDocument();
});