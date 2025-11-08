// src/lib/auth.ts
"use client";

export function login(role: string) {
  document.cookie = `auth_token=dummy_token; path=/`;
  document.cookie = `auth_role=${role}; path=/`;
}

export function logout() {
  document.cookie = `auth_token=; Max-Age=0; path=/`;
  document.cookie = `auth_role=; Max-Age=0; path=/`;
}

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export function isLoggedIn(): boolean {
  return !!getCookie("auth_token");
}

export function getRole(): string | null {
  return getCookie("auth_role");
}
