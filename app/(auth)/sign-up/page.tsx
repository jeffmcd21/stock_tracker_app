'use client';

import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: '',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology'
    },
    mode: 'onBlur'
}, );

  const onSubmit = async (data: SignUpFormData) => {
    try {
        console.log("Sign-up data:", data);
        // Add your sign-up logic here (e.g., API call)
    } catch (error) {
        console.error("Sign-up error:", error);
    }
  }

  return (
    <>
        <h1 className="form-title">Sign Up & Personalize</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputField 
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                register={register}
                error={errors.fullName}
                validation={{ required: 'Full name is required', minLength: 2 }}
            />

            <InputField
                    name="email"
                    label="Email"
                    placeholder="enter your email address: abc@example.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email name is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />

            <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
        </form>
    </>
  )
}

export default SignUp;