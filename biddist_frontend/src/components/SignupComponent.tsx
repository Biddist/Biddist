import * as cardValidator from 'card-validator'
import {Fieldset,PasswordInput,TextInput,Stack, PinInput,Group,Button} from '@mantine/core'
import { useState } from 'react'
import React from 'react'
import { PaymentElement } from '@stripe/react-stripe-js'
import { cardNumber, CardNumberVerification } from 'card-validator/dist/card-number'
import { loadStripe } from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js';
const SignupComponent:React.FC = ()=>{
    const [password,setPassword] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [username,setUsername] = useState<string>("");
    const [sent,setSent] = useState<boolean>(false);
    const [cvc,setCVC] = useState<number>();
    const stripePromise = loadStripe('pk_test_51PvQOaJzCaqZwM4cWS2KppLXPg4CKP4cIEWgI9Zkf7r1ULqCg2zDLuA2w0z6LDZmYWRQvgvuCaxKZK5blJnMyw0e00laqqoh6f');
    return(
        <Elements stripe={stripePromise} options={{
            mode: "setup",
            currency: 'usd'
        }}>
        <Stack>
        <Fieldset legend="Profile Info">
            <TextInput  label="Email" onChange={(event) => setEmail(event.currentTarget.value)} required={true}/>
            <TextInput defaultValue="" label="Username" onChange={(event) => setUsername(event.currentTarget.value)} required={true}/>
            <PasswordInput defaultValue="" label="Password" onChange={(event) => setPassword(event.currentTarget.value)} required={true}/>
            <PinInput inputMode="numeric" disabled={!sent}/>
        </Fieldset>
        <Fieldset legend = "Payment Info">
            <PaymentElement/>
        </Fieldset>
        <Group>
            <Button variant="default" onClick={()=>setSent(true)}>
                Email One Time Code
            </Button>
        </Group>
        </Stack>
        </Elements>
    )
}
export default SignupComponent