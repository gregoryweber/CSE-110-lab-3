import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";

describe("Create StickyNote", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });
});

describe("Read, update, delete StickyNote", () => {
  test("read sticky notes", () => {
    render(<StickyNotes />);
    for (const i of dummyNotesList) {
      const noteTitle = screen.getByText(i.title);
      const noteContent = screen.getByText(i.content);
      expect(noteTitle).toBeInTheDocument();
      expect(noteContent).toBeInTheDocument();
    }
  });
  test("update sticky note", () => {
    render(<StickyNotes />);
    const noteTitle = screen.getByText(dummyNotesList[0].title);
    fireEvent.change(noteTitle, {
      target: { innerHTML: "testing title change" },
    });
    expect(noteTitle.innerHTML).toEqual("testing title change");
  });
  test("delete sticky note", () => {
    const result = render(<StickyNotes />);
    const button = result.container.querySelectorAll(".delete-button")[0];
    fireEvent.click(button);
    const title = screen.queryByText(dummyNotesList[0].title);
    expect(title).toBeNull();
  });
});
