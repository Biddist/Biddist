import { render } from '../../render';
import {screen} from '@testing-library/react';
import LoginComponent from "./LoginComponent";
describe('LoginComponent', () => {
    render(<LoginComponent/>);
    it('Has OTP button', () => {
        expect(screen.getByText('Email One Time Code')).toBeDefined();
    });
});