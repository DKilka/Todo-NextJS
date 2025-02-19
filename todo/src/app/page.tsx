"use client";

import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/localStorage/localStorage";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const Home = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    setToken(getFromLocalStorage("token") ?? "");
  }, []);

  useEffect(() => {
    if (token && token !== "") {
      redirect("/todoList");
    }
  }, [token]);

  const autentification = () => {
    const token = crypto.randomUUID();
    saveToLocalStorage(token, "token");
    setToken(token);
  };

  return (
    <main className="flex flex-col border h-screen justify-center items-center">
      <FormControl className="w-1/4 ">
        <InputLabel>Username</InputLabel>
        <Input
          error={!username.length}
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          aria-describedby="username-error-text"
        />
        <FormHelperText id="username-error-text">
          {username.length ? "" : "Username can't be empty"}
        </FormHelperText>
      </FormControl>
      <FormControl className="w-1/4 mt-6">
        <InputLabel>Password</InputLabel>
        <Input
          error={!password.length}
          value={password}
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          aria-describedby="password-error-text"
        />
        <FormHelperText id="password-error-text">
          {password.length ? "" : "Password can't be empty"}
        </FormHelperText>
      </FormControl>
      <Button
        variant="outlined"
        type="submit"
        className="mt-6"
        disabled={!username.length || !password.length}
        onClick={autentification}
      >
        Autentefication
      </Button>
    </main>
  );
};

export default Home;
