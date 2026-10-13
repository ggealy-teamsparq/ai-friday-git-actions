import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Home from "../app/page";

const MESSAGE = "Welcome to AI Friday";

function renderHome() {
  const user = userEvent.setup();
  render(<Home />);
  const star = screen.getByRole("button", { name: "Show welcome message" });
  return { user, star };
}

describe("Welcome star", () => {
  it("keeps the welcome dialog hidden on initial load", () => {
    renderHome();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the welcome dialog when the star is clicked", async () => {
    const { user, star } = renderHome();

    await user.click(star);

    expect(screen.getByRole("dialog", { name: MESSAGE })).toBeInTheDocument();
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])("opens the welcome dialog with the %s key", async (_key, keys) => {
    const { user, star } = renderHome();
    act(() => star.focus());

    await user.keyboard(keys);

    expect(screen.getByRole("dialog", { name: MESSAGE })).toBeInTheDocument();
  });

  it("shows the exact welcome message as the dialog title", async () => {
    const { user, star } = renderHome();

    await user.click(star);

    const dialog = screen.getByRole("dialog", { name: MESSAGE });
    expect(
      within(dialog).getByRole("heading", { name: MESSAGE }),
    ).toHaveTextContent(/^Welcome to AI Friday$/);
  });

  it("moves focus into the dialog when it opens", async () => {
    const { user, star } = renderHome();

    await user.click(star);

    expect(screen.getByRole("dialog", { name: MESSAGE })).toContainElement(
      document.activeElement as HTMLElement,
    );
  });

  it("closes with the Close button and returns focus to the star", async () => {
    const { user, star } = renderHome();
    await user.click(star);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(star).toHaveFocus();
  });

  it("closes with the Escape key and returns focus to the star", async () => {
    const { user, star } = renderHome();
    await user.click(star);

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(star).toHaveFocus();
  });
});
