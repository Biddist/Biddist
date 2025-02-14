import {Fieldset, PasswordInput, TextInput, Stack, PinInput, Group, Button, Menu, Blockquote} from '@mantine/core'
import React, { useState } from 'react'
import {PaymentElement, useStripe} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {Elements,useElements} from '@stripe/react-stripe-js';
import {useForm} from "@mantine/form"
import Label = Menu.Label;

const SignupComponent: React.FC = ()=>{
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            email: '',
            password: '',
            password_confirmation: '',
            username: '',
            shipping_address: ''
        }
    });
    const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);
    return(
            <form onSubmit = {async(event)=>{
                event.preventDefault();
                form.onSubmit(setSubmittedValues);
            }}>
        <Stack>
            <Blockquote>By Signing up, you consent to be emailed for authentication purposes.</Blockquote>
        <Fieldset legend="Profile Info">
            <TextInput placeholder={"Enter your Email"} label={"Email"} {...form.getInputProps('email')} required={true}/>
            <TextInput  placeholder={"Enter your Username"} label="Username" {...form.getInputProps('username')} required={true}/>
            <PasswordInput placeholder={"Enter a strong password"} label="Password" {...form.getInputProps('password')} required={true}/>
            <PasswordInput placeholder={"Re-enter password"} label="Confirm password" {...form.getInputProps('password_confirmation')} required={true}/>
            <TextInput placeholder={"Enter Shipping Address"} label={"Shipping Address"} {...form.getInputProps('shipping_address')} required={true}/>
            <Button type="submit">Signup</Button>
        </Fieldset>
        </Stack>
            </form>
    )
}
export default SignupComponent