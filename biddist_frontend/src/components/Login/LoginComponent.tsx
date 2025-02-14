import {Fieldset,PasswordInput,TextInput,Stack, PinInput,Group,Button} from '@mantine/core'
import { useState } from 'react'
import React from 'react'
import {useForm} from "@mantine/form";
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
    return(
        <Stack>
        <Fieldset legend="Login">
            <TextInput placeholder={"Enter your email or username."} label={"Email/Username"} {...form.getInputProps('email')} required={true}/>
            <PasswordInput placeholder={"Enter your password"} label="Password" {...form.getInputProps('password')} required={true}/>
            <PinInput type="alphanumeric" disabled={!sent}/>
        </Fieldset>
        <Group>
            <Button variant="default" onClick={()=>setSent(true)}>
                Email One Time Code
            </Button>
        </Group>
        </Stack>
    )
}
export default LoginComponent