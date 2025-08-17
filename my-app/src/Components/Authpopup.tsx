import React, { useState } from "react";
import loginLogout from "../assets/loginlogout.svg"
interface User {
  name: string;
  email: string;
  password: string;
}
interface AuthPopConfig {
  onSuccess: (user: User) => void;
  onClose: () => void
  toShowCrossIcon?: boolean
}

export default function AuthPopup({ onSuccess, onClose, toShowCrossIcon = true }: AuthPopConfig) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    // Get existing users
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email already exists
    const existingUser = users.find((u) => u.email === form.email);
    if (existingUser) {
      setError("User with this email already exists");
      return;
    }

    // Add new user
    const newUser = { ...form };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Set logged-in user
    localStorage.setItem("user", JSON.stringify(newUser));

    setError("");
    alert("Sign up successful ✅");

    onSuccess(newUser);
    setIsSignUp(false);
    onClose();
  };

  const handleSignIn = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.length === 0) {
      setError("No users found. Please sign up first.");
      return;
    }

    const foundUser = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (foundUser) {
      setError("");
      alert(`Welcome back, ${foundUser.name}! 🎉`);

      // Save current session
      localStorage.setItem("user", JSON.stringify(foundUser));

      onSuccess(foundUser);
      onClose();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      { (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="rounded-[21px] border border-[rgba(0,0,0,0.03)] p-2 bg-[#00000008]">
                <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
                    {/* Close Button */}
                    { toShowCrossIcon && <button
                    onClick={() => onClose()}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    >
                    ✖
                    </button>}
                    <div className="flex justify-center mb-2">
                        <div className="p-2 bg-gray-200 rounded-full flex items-center justify-center">
                            <img width={40} height={40} src={loginLogout} alt="profile" className="object-scale-down rounded-full" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-1 text-center">
                    {isSignUp ? <div>
                        <p>Create an account to continue</p>
                    </div> : <div>
                        <p>Sign in to continue</p>
                    </div>
        }
                    </h2>
                    <p className="mb-2 text-gray-500">Create an account to access all the features on this app</p>

                    {/* Form */}
                    <div className="flex flex-col space-y-4">
                    {isSignUp && (
                        <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        onClick={isSignUp ? handleSignUp : handleSignIn}
                        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </button>
                    </div>

                    {/* Toggle */}
                    <p className="mt-4 text-center text-sm text-gray-600">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                        setIsSignUp(!isSignUp);
                        setError("");
                        }}
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                    </p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
