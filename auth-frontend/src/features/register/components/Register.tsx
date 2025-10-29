import { Button, Field, Fieldset, Input, Link, Stack } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaArrowLeftLong } from "react-icons/fa6";
import { registerUser } from "../service/registerService";
import AlertMessage from "../../../components/commons/AlertMessage";

const Register = () => {
    const id = uuidv4();
    const [form, setForm] = useState({
        id: id,
        name: "",
        email: "",
        role: "user",
    });
    const [password, setPassword] = useState("");
    const [isRegister, setisRegister] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser({ ...form, password });
            setisRegister(true);
            setTimeout(() => {
                setisRegister(false);
            }, 3000);
        } catch (error) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
            console.log("error during saving user", error);
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
                <Button type="submit" alignSelf="flex-start" mt={4}>
                    Submit
                </Button>
            </form>
            <p className="flex gap-2">
                <span>Already have account</span>
                <Link href="/login" color="blue.400">
                    login'
                </Link>
            </p>
            <div className="w-full my-2">
                {isRegister && (
                    <AlertMessage
                        status="success"
                        message="User save successfuly !"
                    />
                )}
                {error && (
                    <AlertMessage
                        status="error"
                        message="error trying to save user!"
                    />
                )}
            </div>
        </Fieldset.Root>
    );
};

export default Register;
