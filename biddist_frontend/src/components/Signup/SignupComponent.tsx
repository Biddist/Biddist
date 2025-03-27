import {
    Fieldset,
    PasswordInput,
    TextInput,
    Stack,
    PinInput,
    Button,
    Blockquote,
    Alert
} from '@mantine/core'
import React, {useEffect, useState} from 'react'
import {useForm} from "@mantine/form"
import {AuthAPIService} from '../../AuthAPIService.js'

const SignupComponent: React.FC = ()=>{
    const [sent, setSent] = useState<boolean>(false);
    const [alertText, setAlertText] = useState<string>("Standby");
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
    const pinForm = useForm({
        mode: 'controlled',
        initialValues: {
            pin: ''
        }
    });
    useEffect(() => {

    }, [sent, alertText]);
    const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);
    const [pin, setPin] = useState<typeof pinForm.values | null>(null);
    return(

        <Stack>
            <Alert>{alertText}</Alert>
            <Blockquote>By Signing up, you consent to be emailed for authentication purposes.</Blockquote>
            <form onSubmit = {async(event)=>{
                event.preventDefault();
                form.onSubmit(setSubmittedValues);
                const responseCode = await AuthAPIService.postInitSignup(form.values.username,form.values.password,form.values.email,form.values.shipping_address);
                if(responseCode==201){
                    const otpResponseCode = await AuthAPIService.postSignupOTP(form.values.email,form.values.password);
                    console.log("otp response:" + otpResponseCode);
                    if(otpResponseCode==201){
                        setSent(true);
                        setAlertText("Started Signup Process. Check your email for a One Time Password.");
                    }
                    else{
                        setAlertText("Server Error Fetching OTP.");
                    }
                }
                else {
                    setSent(false);
                    if (responseCode == 409) {
                        setAlertText("Email or username Already in Use");
                    }
                    else {
                        setAlertText("Unknown Server Side Error.");
                    }
                }
            }}>
            <Fieldset legend="Profile Info">
            <TextInput disabled={sent} placeholder={"Enter your Email"} label={"Email"} {...form.getInputProps('email')} required={true}/>
            <TextInput disabled={sent} placeholder={"Enter your Username"} label="Username" {...form.getInputProps('username')} required={true}/>
            <PasswordInput  disabled={sent} placeholder={"Enter a strong password"} label="Password" {...form.getInputProps('password')} required={true}/>
            <PasswordInput disabled={sent} placeholder={"Re-enter password"} label="Confirm password" {...form.getInputProps('password_confirmation')} required={true}/>
            <TextInput disabled={sent} placeholder={"Enter Shipping Address"} label={"Shipping Address"} {...form.getInputProps('shipping_address')} required={true}/>
            <Button disabled={sent} type="submit">Signup</Button>
        </Fieldset>
            </form>
            <form onSubmit = {async(event)=>{
                event.preventDefault();
                pinForm.onSubmit(setPin);
                const responseCode =  await AuthAPIService.postFinishSignup(form.values.username,pinForm.values.pin);
                if(responseCode==201){
                    setAlertText("Account Created and Activated!");
                }
            }}>
            <Fieldset legend = "confirmation">
                <PinInput  length={6} type="alphanumeric" disabled={!sent} {...pinForm.getInputProps('pin')} required={true}/>
                <Button disabled={!sent} type="submit">Signup</Button>
            </Fieldset>
        </form>
        </Stack>

    )
}
export default SignupComponent