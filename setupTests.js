import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// Register the jest-dom matchers with Vitest's expect
expect.extend(matchers);
