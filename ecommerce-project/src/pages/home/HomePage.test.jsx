/**
 * @vitest-environment jsdom
 */

import { it, expect, describe, vi, beforeEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
if (matchers) expect.extend(matchers);
import { render, screen, within } from '@testing-library/react'; //Renders a component in a fake webpage (especially useful for testing). screen lets us check the fake webpage to see if certain elements were rendered properly.
import { MemoryRouter } from 'react-router'; 
import axios from 'axios'; //importing axios to mock its methods.
import { HomePage } from './HomePage';

vi.mock('axios'); //mocking the entire axios to prevent actual HTTP requests during testing.

describe('HomePage Component', () => {
    let loadCart; //mock function ( a fake function used for testing purposes).
    //  we used it because the original loadCart function which is in App.jsx contacts the backend for the data and while testing we don't want to contact the backend.

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
});
