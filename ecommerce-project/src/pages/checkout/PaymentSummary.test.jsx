/**
 * @vitest-environment jsdom
 */

import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
if (matchers) expect.extend(matchers);
import { MemoryRouter, useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios');

describe('PaymentSummary component', () => {
    let paymentSummary;
    let loadCart;
    let user;

    beforeEach(() => {
        // Clean up DOM from previous tests and re-create user event for each test
        cleanup();

        paymentSummary = {
            "totalItems": 6,
            "productCostCents": 9467,
            "shippingCostCents": 0,
            "totalCostBeforeTaxCents": 9467,
            "taxCents": 947,
            "totalCostCents": 10414
        };

        loadCart = vi.fn();
        user = userEvent.setup();
    });

    it('displays the correct details', async () => {
        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
            </MemoryRouter>
        );

        expect(
            screen.getByText('Items (6):')
        ).toBeInTheDocument();

        // There are multiple ways to check the text inside an element.
        // 1. within() + getByText() + toBeInTheDocument()
        expect(
            within(screen.getByTestId('payment-summary-product-cost'))
                .getByText('$94.67')
        ).toBeInTheDocument();
        // 2. getByTestId() + toHaveTextContent()
        // (toHaveTextContent() checks the text inside an element)
        // This solution is a little cleaner in this case.
        expect(
            screen.getByTestId('payment-summary-shipping-cost')
        ).toHaveTextContent('$0.00');

        expect(
            screen.getByTestId('payment-summary-total-before-tax')
        ).toHaveTextContent('$94.67');

        expect(
            screen.getByTestId('payment-summary-tax')
        ).toHaveTextContent('$9.47');

        expect(
            screen.getByTestId('payment-summary-total')
        ).toHaveTextContent('$104.14');
    });

    it('places an order', async () => {
        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>;
        }

        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentSummary={paymentSummary}
                    loadCart={loadCart}
                />
                <Location />
            </MemoryRouter>
        );
        const placeOrderButton = screen.getByTestId('place-order-button');
        await user.click(placeOrderButton);

        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();
        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
    });
});