import {Fieldset,PasswordInput,TextInput,Stack, PinInput,Group,Button} from '@mantine/core'
import { useState } from 'react'
import React from 'react'
import {useForm} from "@mantine/form";
import {AuthAPIService} from "../../AuthAPIService.js";
const LoginComponent:React.FC = ()=>{
    const [sent, setSent] = useState(false)
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            email_or_username: '',
            password: '',
            password_confirmation: '',
        }
    });
    const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);
    const [alertText, setAlertText] = useState("");
    return(
        <Stack>
            <form onSubmit={async(event)=> {
                event.preventDefault();
                form.onSubmit(setSubmittedValues);
                const responseCode = await AuthAPIService.postInitSignup(form.values.username,form.values.password,form.values.email,form.values.shipping_address);
                if(responseCode==201){
                    setSent(true);
                    setAlertText("");
                }
                else {
                    setSent(false);
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
            <PinInput type="alphanumeric" disabled={!sent}/>
        </Fieldset>
            </form>
        <Group>
            <Button type="button" variant="default">
                Email One Time Code
            </Button>
        </Group>
        </Stack>
    )
}
export default LoginComponent