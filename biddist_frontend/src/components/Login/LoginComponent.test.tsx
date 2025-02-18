import { render } from '../../render.js';
import {screen} from '@testing-library/react';
import LoginComponent from "./LoginComponent.js";
describe('LoginComponent', () => {
    render(<LoginComponent/>);
    it('Has OTP button', () => {
        expect(screen.getByText('Email One Time Code')).toBeDefined();
    });
});