import { render } from '../../render';
import {screen} from '@testing-library/react';
import SignupComponent from "./SignupComponent";
describe('SignupComponent', () => {
    render(<SignupComponent/>);
    it('Has warning', () => {
        expect(screen.getByText('By Signing up, you consent to be emailed for authentication purposes.')).toBeDefined();
    });
});