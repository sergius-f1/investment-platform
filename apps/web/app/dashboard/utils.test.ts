import { describe, expect, it } from "vitest";

import { prepareAllocationData, TOP_N } from "./utils";

describe("prepareAllocationData", () => {
  it("returns the top weighted positions in descending order", () => {
    const positions = Array.from({ length: TOP_N + 2 }, (_, index) => ({
      symbol: `ASSET_${index}`,
      weight: index + 1,
    }));

    const allocation = prepareAllocationData(positions);

    expect(allocation).toHaveLength(TOP_N);
    expect(allocation.map(({ name, value }) => ({ name, value }))).toEqual(
      positions
        .toSorted((a, b) => b.weight - a.weight)
        .slice(0, TOP_N)
        .map(({ symbol, weight }) => ({ name: symbol, value: weight })),
    );
    expect(allocation.every((item) => typeof item.fill === "string")).toBe(
      true,
    );
  });
});
