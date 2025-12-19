import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// Register the jest-dom matchers with Vitest's expect
expect.extend(matchers);

// Add a small custom matcher to mimic Jest's toHaveBeenNthCalledWith behavior (1-based index)
expect.extend({
  toHaveBeenNthCalledWith(received, nth, ...expectedArgs) {
    const calls = received?.mock?.calls;
    if (!calls) {
      return {
        pass: false,
        message: () => 'Received value is not a mock function with a .mock.calls array',
      };
    }

    const index = nth - 1;
    const actual = calls[index];
    if (actual === undefined) {
      return {
        pass: false,
        message: () =>
          `Expected mock to have a call number ${nth}, but it has ${calls.length} calls`,
      };
    }

    const pass = this.equals(actual, expectedArgs);
    return {
      pass,
      message: () =>
        pass
          ? `Expected mock not to have been called with ${this.utils.printExpected(expectedArgs)} at call ${nth}`
          : `Expected mock to have been called with ${this.utils.printExpected(expectedArgs)} at call ${nth}\nReceived: ${this.utils.printReceived(actual)}`,
    };
  },
});
