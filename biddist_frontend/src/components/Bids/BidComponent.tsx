import {List, Tabs} from "@mantine/core";
import {backendURL} from "../../FetchConfig.js";
import React from "react";
type BidProps = {
    accountId: string | null;
    setAccountId: React.Dispatch<React.SetStateAction<string | null>>;
}
const BidComponent: React.FC<BidProps> = ({accountId, setAccountId}) => {
    const bidStream: EventSource = new EventSource(backendURL + "/auction/" + "")
    return (<List>

    </List>)
}
export default BidComponent