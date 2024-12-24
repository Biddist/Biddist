import {Fieldset,PasswordInput,TextInput,Stack, PinInput,Group,Button} from '@mantine/core'
import { useState } from 'react'
import React from 'react'
const LoginComponent:React.FC = ()=>{
    const [password,setPassword] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [name,setName] = useState<string>("");
    const [sent,setSent] = useState<boolean>(false);
    return(
        <Stack>
        <Fieldset legend="Login">
            <TextInput label="Email" onChange={(event) => setEmail(event.currentTarget.value)} required={true}/>
            <PasswordInput label="Password" onChange={(event) => setPassword(event.currentTarget.value)} required={true}/>
            <PinInput inputMode="numeric" disabled={!sent}/>
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