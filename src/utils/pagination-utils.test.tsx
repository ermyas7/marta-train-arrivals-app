import { showPageItem } from "./pagination-utils";

describe("showPageItem()", () => {
  it("calculates correct items to show based on page value", () => {
    // Test page 1
    expect(showPageItem(0, 1)).toBe(true);
    expect(showPageItem(1, 1)).toBe(true);
    expect(showPageItem(9, 1)).toBe(true);
    expect(showPageItem(10, 1)).toBe(false);
    // Test page 2
    expect(showPageItem(9, 2)).toBe(false);
    expect(showPageItem(10, 2)).toBe(true);
    expect(showPageItem(11, 2)).toBe(true);
    expect(showPageItem(19, 2)).toBe(true);
    expect(showPageItem(20, 2)).toBe(false);
  });
});
