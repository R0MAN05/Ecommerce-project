/**
 * @vitest-environment jsdom
 */

import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react'; //Renders a component in a fake webpage (especially useful for testing). screen lets us check the fake webpage to see if certain elements were rendered properly.
import userEvent from '@testing-library/user-event'; // simulates user interactions like clicks, typing, etc.   
import axios from 'axios'; //importing axios to mock its methods.
import { Product } from './Product';

vi.mock('axios'); //mocking axios to prevent actual HTTP requests during testing.

describe('Product Component', () => {
    it('renders product details correctly', () => {
        const product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",  
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        };

        const loadCart = vi.fn(); //mock function ( a fake function used for testing purposes).
        //  we used it because the original loadCart function which is in App.jsx contacts the backend for the data and while testing we don't want to contact the backend.

        render(<Product product={product} loadCart={loadCart} />);

        expect(
            screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
        ).toBeInTheDocument();

        expect(
            screen.getByText('$10.90')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg')
  
        expect(
            screen.getByTestId('product-rating-stars-image')
        ).toHaveAttribute('src', 'images/ratings/rating-45.png')
  
        expect(
            screen.getByText('87')
        ).toBeInTheDocument();

    });

    it('adds a product to the cart)', async () => {
        const product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",  
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        };

        const loadCart = vi.fn(); //mock function ( a fake function used for testing purposes).
        //  we used it because the original loadCart function which is in App.jsx contacts the backend for the data and while testing we don't want to contact the backend.

        render(<Product product={product} loadCart={loadCart} />);

        const user = userEvent.setup();
        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1
            }
        );

        expect(loadCart).toHaveBeenCalled();    

    });
});
