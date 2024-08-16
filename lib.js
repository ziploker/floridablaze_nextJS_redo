"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const textEncoder = new TextEncoder();
const key = textEncoder.encode("oooooooo");
//const key = new TextEncoder().encode(secretKey);

console.log("KEEEEEEEEEEEEEEY", key);

export async function encrypt(payload) {
  const alg = "HS256";
  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("2days")
    .sign(key);
}

export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(initialState, formData) {
  // Verify credentials && get the user

  ////const user = { email: formData.get("email"), name: "John" };
  console.log("AuthenticateUser FORM DATA", formData);

  const userEmail = formData.get("email");
  const password = formData.get("password");
  const remember = formData.get("remember");

  console.log(
    "AuthenticateUser  ",
    userEmail + " // " + password + " // " + remember
  );

  const user = await prisma.users.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (user) {
    console.log("Login User Found in DB", user);

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_digest
    );

    if (passwordMatches) {
      console.log("passwords matched");
      // Create the session
      const expires = new Date(Date.now() + 10 * 1000);
      //console.log("PREEEEEEEEEEEE", user);
      user.id = user.id.toString();
      //console.log("PREEEEEEEEEEEE2", user);
      const session = await encrypt({ user, expires });

      console.log("sesh", session);

      // Save the session in a cookie
      cookies().set("session", session, { expires, httpOnly: true });
      return {
        success: true,
        message: " You have been logged in successfully.",
      };
    } else {
      console.log("passwords diddn't match");
      return {
        success: false,
        message: " Email Password combination incorrect.",
      };
    }
  } else {
    console.log("Login User NOTFound in DB");
    return {
      success: false,
      message: " Email Password combination incorrect.",
    };
  }
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
