import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^\S+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*@%$#]).{8,}$/;

    const validate = (data) => {
        const newErrors = {};

        if (!data.name.trim()) newErrors.name = "Name is required";

        if (!data.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(data.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!data.username.trim()) {
            newErrors.username = "Username is required";
        } else if (!usernameRegex.test(data.username)) {
            newErrors.username = "Username must not contain spaces";
        }

        if (!data.password) {
            newErrors.password = "Password is required";
        } else if (!passwordRegex.test(data.password)) {
            newErrors.password = "Min 8 chars, uppercase, lowercase, digit, special char (*@%$#)";
        }

        if (!data.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (data.confirmPassword !== data.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };
        setFormData(updatedData);
        if (submitted) setErrors(validate(updatedData));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const validationErrors = validate(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        alert(JSON.stringify(formData, null, 2));
        navigate("/");
    };

    return (
        <div className="max-w-md mx-auto mt-16">
            <h2 className="text-2xl font-semibold tracking-wide mb-8 text-card-foreground">
                Create Account
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Label className="text-muted-foreground text-xs tracking-widest uppercase">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-border focus-visible:ring-0 focus-visible:border-muted-foreground transition-colors"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="text-muted-foreground text-xs tracking-widest uppercase">Email</Label>
                    <Input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-border focus-visible:ring-0 focus-visible:border-muted-foreground transition-colors"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="text-muted-foreground text-xs tracking-widest uppercase">Username</Label>
                    <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="border-border focus-visible:ring-0 focus-visible:border-muted-foreground transition-colors"
                    />
                    {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="text-muted-foreground text-xs tracking-widest uppercase">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border-border focus-visible:ring-0 focus-visible:border-muted-foreground transition-colors"
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="text-muted-foreground text-xs tracking-widest uppercase">Confirm Password</Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="border-border focus-visible:ring-0 focus-visible:border-muted-foreground transition-colors"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                </div>

                <Button
                    type="submit"
                    className="w-full mt-4 bg-yellow-600 hover:bg-yellow-500 text-black tracking-widest uppercase text-xs font-semibold rounded-none"
                >
                    Register
                </Button>
            </form>
        </div>
    );
}

export default RegisterPage;