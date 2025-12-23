import { it, expect, describe } from 'vitest';
import { formatMoney } from './money.js';

describe('formatMoney', () => {
    it('formats 2999 cents as $29.99', () => {
        expect(formatMoney(2999)).toBe('$29.99');
    });

    it('displays 2 decimals', () => {
        expect(formatMoney(2090)).toBe('$20.90');
        expect(formatMoney(100)).toBe('$1.00');
    });

    it('formats 0 cents as $0.00', () => {
        expect(formatMoney(0)).toBe('$0.00');
    });

    it('displays -999 as -$9.99', () => {
        expect(formatMoney(-999)).toBe('-$9.99');
    });

    it('displays -100 as -$1.00', () => {
        expect(formatMoney(-100)).toBe('-$1.00');
    });
});