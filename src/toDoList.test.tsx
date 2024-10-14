import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

describe("todoList", () => {
  test("read todoList", () => {
    render(<ToDoList />);
    for (const i of dummyGroceryList) {
      const item = screen.getByText(i.name);
      expect(item).toBeInTheDocument();
    }
  });
  test("test update title", () => {
    const result = render(<ToDoList />);
    const checkbox = result.container.querySelectorAll("input")[0];
    fireEvent.click(checkbox);
    const title = screen.getByText("Items bought: 1");
    expect(title).toBeInTheDocument();
  });
});
