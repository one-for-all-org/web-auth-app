import { Button } from "@chakra-ui/react";
import type { ResetForm } from "../../types";

const ButtonForm = ({ resetForm }: Readonly<ResetForm>) => {
    return (
        <div className="w-full flex justify-between items-center">
            <Button
                type="submit"
                alignSelf="flex-start"
                variant="surface"
                size="sm"
                mt={4}
            >
                Submit
            </Button>
            <Button
                alignSelf="flex-start"
                variant="surface"
                colorPalette="red"
                mt={4}
                size="sm"
                onClick={resetForm}
            >
                Cancel
            </Button>
        </div>
    );
};

export default ButtonForm;
