import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import type { FormValues } from "../type";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = handleSubmit((data) => console.log(data));

    return (
        <Fieldset.Root size="lg" maxW="md">
            <Stack>
                <Fieldset.Legend>Login</Fieldset.Legend>
                <Fieldset.HelperText>
                    Login to your account to continue.
                </Fieldset.HelperText>
            </Stack>
            <form onSubmit={onSubmit}>
                <Field.Root invalid={!!errors.name}>
                    <Field.Label>Username</Field.Label>
                    <Input {...register("name")} required />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password} mt={4}>
                    <Field.Label>Password</Field.Label>
                    <PasswordInput {...register("password")} required/>
                    <Field.ErrorText>
                        {errors.password?.message}
                    </Field.ErrorText>
                </Field.Root>

                <Button type="submit" mt={4}>Submit</Button>
            </form>
        </Fieldset.Root>
    );
};

export default Login;
