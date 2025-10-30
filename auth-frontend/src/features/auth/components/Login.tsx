import { Field, Fieldset, Input, Link, Stack } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import type { FormValues } from "../type";
import { FaArrowLeftLong } from "react-icons/fa6";
import ButtonForm from "../../../components/commons/ButtonForm";
import { useState } from "react";
import AlertMessage from "../../../components/commons/AlertMessage";
import { useAuth } from "../../../hooks/useAuth";

const Login = () => {
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    const [isAuthentified, setIsAuthentified] = useState(false);
    const [error, setError] = useState(false);

    const onSubmit = handleSubmit((data) => {
        try {
            login(data);
            setIsAuthentified(true);
            setTimeout(() => {
                setIsAuthentified(false);
            }, 3000);
        } catch (error) {
            console.log(error);
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    });

    const resetForm = () => {
        reset();
    };

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
                <Field.Root invalid={!!errors.email}>
                    <Field.Label>Email</Field.Label>
                    <Input
                        {...register("email")}
                        placeholder="exemple@gmail.com"
                        required
                    />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password} mt={4}>
                    <Field.Label>Password</Field.Label>
                    <PasswordInput
                        {...register("password")}
                        placeholder="********"
                        required
                    />
                    <Field.ErrorText>
                        {errors.password?.message}
                    </Field.ErrorText>
                </Field.Root>

                <ButtonForm resetForm={resetForm} />
            </form>
            <div className="w-full my-2">
                {isAuthentified && (
                    <AlertMessage
                        status="success"
                        message="Authentification successfuly !"
                    />
                )}
                {error && (
                    <AlertMessage
                        status="error"
                        message="wrong Email or password, try egain !"
                    />
                )}
            </div>
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
