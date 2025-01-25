import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterSelect } from "@/components/filter-select";
import { setupRadixMocks, setupTestPortal } from "@/lib/test-utils";

describe("FilterSelect", () => {
  const defaultProps = {
    label: "Genre",
    value: null,
    options: ["Action", "Drama", "Comedy"],
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    setupRadixMocks();
  });

  it("renders with default value", () => {
    render(<FilterSelect {...defaultProps} />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("All Genres (3)");
  });

  it("renders with selected value", () => {
    render(<FilterSelect {...defaultProps} value="Action" />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("Action");
  });

  it("is disabled when options are empty", () => {
    render(<FilterSelect {...defaultProps} options={[]} />);
    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<FilterSelect {...defaultProps} disabled={true} />);
    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
  });

  it("shows placeholder when no value is selected", () => {
    render(<FilterSelect {...defaultProps} value={null} />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("All Genres (3)");
  });

  it("calls onChange with correct values", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    setupTestPortal();

    render(<FilterSelect {...defaultProps} onChange={onChange} />);

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    const option = screen.getByText("Action");
    await user.click(option);

    expect(onChange).toHaveBeenCalledWith("Action");
  });
});
