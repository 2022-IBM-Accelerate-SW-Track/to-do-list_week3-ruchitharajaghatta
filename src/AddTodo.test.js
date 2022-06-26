import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  let check;
  try{
    check = screen.getByText(/History Test/i);
    check = true;
  }catch{
    check = false;
  }
  expect(check).toBe(true);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  let check;
  try{
    check = screen.getByText(/History Test/i);
    check = false;
  }catch{
    check = true;
  }
  expect(check).toBe(true);
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.click(element);
  let check;
  try{
    check = screen.getByText(/History Test/i);
    check = true;
  }catch{
    check = false;
  }
  expect(check).toBe(false);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const box = screen.getByRole('checkbox');
  fireEvent.click(box);
  let check;
  try{
    check = screen.getByText(/History Test/i);
    check = true;
  }catch{
    check = false;
  }
  expect(check).toBe(false);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const newDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "New Test"}});
  fireEvent.change(inputDate, { target: { value: newDate}});
  fireEvent.click(element);
  const oldDate = "05/30/2022";
  fireEvent.change(inputTask, { target: { value: "Old Test"}});
  fireEvent.change(inputDate, { target: { value: oldDate}});
  fireEvent.click(element);
  const colorOld = screen.getByTestId(/Old Test/i).style.background;
  const colorNew = screen.getByTestId(/New Test/i).style.background;
  const check = (colorOld != colorNew);
  expect(check).toBe(true);
 });
