import { Field, Fieldset, Input, Link, Stack } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaArrowLeftLong } from "react-icons/fa6";
import { registerUser } from "../service/registerService";
import AlertMessage from "../../../components/commons/AlertMessage";
import type { User } from "../../../types";
import ButtonForm from "../../../components/commons/ButtonForm";
import type { AxiosError } from "axios";

const Register = () => {
    const id = uuidv4();
    const [form, setForm] = useState<User>({
        id: id,
        name: "",
        email: "",
        role: "user",
    });
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [errorSave, setErrorSave] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({
            name: "",
            email: "",
        });
        setPassword("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser({ ...form, password });
            setIsRegister(true);
            setMessage("User save successful!");
            setTimeout(() => {
                setIsRegister(false);
            }, 3000);
            resetForm();
        } catch (err) {
            const error = err as AxiosError;
            if (error.response) {
                if (error.response.status === 409) {
                    setErrorSave(true);
                    setMessage("Email already used!");
                    setTimeout(() => {
                        setErrorSave(false);
                    }, 3000);
                } else {
                    setMessage("unknoun error!");
                }
            } else {
                setErrorSave(true);
                setMessage("Server error!");
            }
        }
    };

    return (
        <Fieldset.Root size="lg" maxW="md">
            <Stack>
                <Fieldset.Legend className="flex items-center gap-2">
                    <Link href="/" color="gray">
                        <FaArrowLeftLong />
                    </Link>
                    <span>Register</span>
                </Fieldset.Legend>
                <Fieldset.HelperText>
                    Please provide your info details below.
                </Fieldset.HelperText>
            </Stack>
            <form onSubmit={handleSubmit}>
                <Fieldset.Content>
                    <Field.Root>
                        <Field.Label>Name</Field.Label>
                        <Input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Email address</Field.Label>
                        <Input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Your email"
                            required
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Password</Field.Label>
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            required
                        />
                    </Field.Root>
                </Fieldset.Content>
                <ButtonForm resetForm={resetForm} />
            </form>
            <p className="flex gap-2">
                <span>Already have account</span>
                <Link href="/login" color="blue.400">
                    login'
                </Link>
            </p>
            <div className="w-full my-2">
                {isRegister && (
                    <AlertMessage status="success" message={message} />
                )}
                {errorSave && <AlertMessage status="error" message={message} />}
            </div>
        </Fieldset.Root>
    );
};

export default Register;
