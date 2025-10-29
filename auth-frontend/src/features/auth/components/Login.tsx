import { Button, Field, Fieldset, Input, Link, Stack } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import type { FormValues } from "../type";
import { FaArrowLeftLong } from "react-icons/fa6";

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
                <Fieldset.Legend className="flex items-center gap-2">
                    <Link href="/" color="gray">
                        <FaArrowLeftLong />
                    </Link>
                    <span>Log in</span>
                </Fieldset.Legend>
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
                    <PasswordInput {...register("password")} required />
                    <Field.ErrorText>
                        {errors.password?.message}
                    </Field.ErrorText>
                </Field.Root>

                <Button type="submit" mt={4}>
                    Submit
                </Button>
            </form>
            <p className="flex gap-2">
                <span>Don't have account</span>
                <Link href="/register" color="blue.400">
                    register'
                </Link>
            </p>
        </Fieldset.Root>
    );
};

export default Login;
