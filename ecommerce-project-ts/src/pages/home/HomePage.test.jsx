/**
 * @vitest-environment jsdom
 */

import { it, expect, describe, vi, beforeEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
if (matchers) expect.extend(matchers);
import userEvent from '@testing-library/user-event';
import { render, screen, within, waitFor } from '@testing-library/react'; //Renders a component in a fake webpage (especially useful for testing). screen lets us check the fake webpage to see if certain elements were rendered properly.
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios'; //importing axios to mock its methods.
import { HomePage } from './HomePage';

vi.mock('axios'); //mocking the entire axios to prevent actual HTTP requests during testing.

describe('HomePage Component', () => {
    let loadCart; //mock function ( a fake function used for testing purposes).
    //  we used it because the original loadCart function which is in App.jsx contacts the backend for the data and while testing we don't want to contact the backend.

    let user;

    beforeEach(() => {
        loadCart = vi.fn();  //mock function ( a fake function used for testing purposes).
        //  we used it because the original loadCart function which is in App.jsx contacts the backend for the data and while testing we don't want to contact the backend.

        axios.get.mockImplementation(async (urlPath) => {   // Mock implementation of axios.get to return predefined data based on the URL path.
            if (urlPath === '/api/products') {
                return {
                    data: [{
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                        rating: {
                            stars: 4.5,
                            count: 87
                        },
                        priceCents: 1090,
                        keywords: ["socks", "sports", "apparel"]
                    },
                    {
                        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        image: "images/products/intermediate-composite-basketball.jpg",
                        name: "Intermediate Size Basketball",
                        rating: {
                            stars: 4,
                            count: 127
                        },
                        priceCents: 2095,
                        keywords: ["sports", "basketballs"]
                    }]
                };
            }
        });

        // Ensure axios.post resolves so addToCart can call loadCart()
        axios.post = vi.fn().mockResolvedValue({});

        user = userEvent.setup();
    });

    it('displays the products correct', async () => {
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />
            </MemoryRouter>
        );
        const productContainers = await screen.findAllByTestId('product-container'); // waits for all elements with the test ID 'product-container' to appear in the DOM. since the products are loaded asynchronously, we need to wait for them to be rendered before making assertions.

        expect(productContainers.length).toBe(2); // Assert that exactly 2 product containers are rendered, matching the mocked data.

        expect(
            within(productContainers[0])     //expect something inside the first product container.
                .getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
        ).toBeInTheDocument();  //checked if the name is in the first productContainer or not.


    });

    it('Add to Cart button adds a product to the cart', async () => {
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />
            </MemoryRouter>
        );
        const productContainers = await screen.findAllByTestId('product-container');

        const quantitySelector1 = within(productContainers[0])
            .getByTestId('product-quantity-selector');
        await user.selectOptions(quantitySelector1, '2');

        const addToCartButton1 = within(productContainers[0])
            .getByTestId('add-to-cart-button');
        await user.click(addToCartButton1);

        
        const quantitySelector2 = within(productContainers[1])
            .getByTestId('product-quantity-selector');
        await user.selectOptions(quantitySelector2, '3');

        const addToCartButton2 = within(productContainers[1])
            .getByTestId('add-to-cart-button');
        await user.click(addToCartButton2);

        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(2));

        expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2
        });

        expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 3
        });
    });
});
