import { Button, HStack, Icon } from "@chakra-ui/react";
import type { ButtonType } from "../../types/ButtonType";

export const IconButton = ({
    colorPalette,
    variant,
    size,
    icon,
    value,
}: ButtonType) => {
    return (
        <HStack>
            <Button
                colorPalette={colorPalette}
                variant={variant}
          size={size}
          rounded="lg"
            >
                <span>{value}</span>
                <span>{icon && <Icon as={icon} />}</span>
            </Button>
        </HStack>
    );
};
