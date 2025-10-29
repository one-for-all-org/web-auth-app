import { Alert, Stack } from "@chakra-ui/react";
import type { AlertType } from "../../types";

const AlertMessage = ({status, message}: AlertType) => {
    return (
        <Stack gap="4" width="full">
            <Alert.Root status={status}>
                <Alert.Indicator />
                <Alert.Title>
                    {message}
                </Alert.Title>
            </Alert.Root>
        </Stack>
    );
};

export default AlertMessage;
