import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductsPage from "@/app/page";

describe("ProductsPage", () => {
  it("should render all components and interact with them correctly", async () => {
    render(<ProductsPage />);

    const pageTitle = screen.getByText(/All Products/i);
    expect(pageTitle).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox", { name: /search/i });
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput).toHaveValue("test");

    await waitFor(() => {
      const paginationNextButton = screen.getByTestId("next-page-button");
      expect(paginationNextButton).toBeInTheDocument();
    });

    const paginationNextButton = screen.getByTestId("next-page-button");
    fireEvent.click(paginationNextButton);

    await waitFor(() => {
      const productCards = screen.getAllByTestId("product-card");
      expect(productCards.length).toBeGreaterThan(0);
    });
  });
});
