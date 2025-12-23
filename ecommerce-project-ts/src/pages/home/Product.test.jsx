/**
 * @vitest-environment jsdom
 */

import { it, expect, describe, vi, beforeEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
if (matchers) expect.extend(matchers);
import { render, screen, cleanup } from '@testing-library/react'; //Renders a component in a fake webpage (especially useful for testing). screen lets us check the fake webpage to see if certain elements were rendered properly.
import userEvent from '@testing-library/user-event'; // simulates user interactions like clicks, typing, etc.   
import axios from 'axios'; //importing axios to mock its methods.
import { Product } from './Product';

vi.mock('axios'); //mocking the entire axios to prevent actual HTTP requests during testing.

describe('Product Component', () => {
    let product;

    let loadCart; //mock function ( a fake function used for testing purposes).
    //  we used it because the original loadCart function which is in App.jsx contacts the backend for the data and while testing we don't want to contact the backend.

    let user;

    beforeEach(() => {  //
        cleanup();
        product = {
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

        loadCart = vi.fn();  //mock function ( a fake function used for testing purposes).
        //  we used it because the original loadCart function which is in App.jsx contacts the backend for the data and while testing we don't want to contact the backend.
    
        user = userEvent.setup();
    });

    it('renders product details correctly', () => {
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
        render(<Product product={product} loadCart={loadCart} />);

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

    it('selects a quantity', async () => {   //to test if the quantity selector(radio) of a product is working or not.

        render(<Product product={product} loadCart={loadCart} />);

        const quantitySelector = screen.getByTestId('product-quantity-selector');
        expect(quantitySelector).toHaveValue('1');  //we checked if the quantitySelector of a product is 1 then checked the whole radio is working or not by updating the value to '3' below.

        await user.selectOptions(quantitySelector, '3');  //user has another method called user.selectOptions(element,value) used this to update the quantity selector's value to '3'.
        expect(quantitySelector).toHaveValue('3');

        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 3
            }
        );

        expect(loadCart).toHaveBeenCalled();
    });

});
