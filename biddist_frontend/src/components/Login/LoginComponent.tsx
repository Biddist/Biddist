import {Fieldset,PasswordInput,TextInput,Stack, PinInput,Group,Button} from '@mantine/core'
import { useState } from 'react'
import React from 'react'
import {useForm} from "@mantine/form";
import {AuthAPIService} from "../../AuthAPIService.js";
type LoginComponentProps = {
    setAccount: React.Dispatch<React.SetStateAction<string | null>>
}
const LoginComponent:React.FC<LoginComponentProps> = (props)=>{
    const [sent, setSent] = useState(false)
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            email_or_username: '',
            password: '',
        }
    });
    const otpForm = useForm({
        mode: 'controlled',
        initialValues: {
            otp: ''
        }
    })
    const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);
    const [alertText, setAlertText] = useState("");
    return(
        <Stack>
            <form onSubmit={async(event)=> {
                event.preventDefault();
                form.onSubmit(setSubmittedValues);
                const responseCode = await AuthAPIService.postLoginOTP(form.values.email_or_username,form.values.password);
                if(responseCode==201){
                    setSent(true);
                    setAlertText("One Time Password Has been sent!");
                }
                else {
                    if (responseCode == 401) {
                        setAlertText("Incorrect credentials.");
                    }
                    else {
                        setAlertText("Unknown Server Side Error.");
                    }
                }
            }}>
        <Fieldset legend="Login">
            <TextInput placeholder={"Enter your email or username."} label={"Email/Username"} {...form.getInputProps('email')} required={true}/>
            <PasswordInput placeholder={"Enter your password"} label="Password" {...form.getInputProps('password')} required={true}/>
        </Fieldset>
                <Group>
                    <Button type="submit" variant="default">
                        Email One Time Code
                    </Button>
                </Group>
            </form>
            <form onSubmit={async(event)=> {}}>
                <Group>
                    <PinInput type="alphanumeric" {...otpForm.getInputProps('otp')} disabled={!sent}/>
                </Group>
            </form>
        </Stack>
    )
}
export default LoginComponent