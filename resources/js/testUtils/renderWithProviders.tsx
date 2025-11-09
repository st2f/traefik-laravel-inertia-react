import React from "react";
import { render } from "@testing-library/react";
import { mockRouter } from "@/__mocks__/testData";
import { vi } from "vitest";

// ✅ Mock @inertiajs/react — your app uses ONLY this adapter
vi.mock("@inertiajs/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@inertiajs/react")>();
  return {
    ...actual,
    router: mockRouter,
  };
});

export function renderWithProviders(ui: React.ReactElement) {
  return render(ui);
}
