import type {
  LoginPayload,
  RegisterPayload,
  User,
} from "../types/user";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(status: number, details: unknown) {
    super("The API request failed.");
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function readResponse(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return { detail: text };
  }
}

async function getCsrfToken(): Promise<string> {
  const response = await fetch(
    `${API_BASE_URL}/api/accounts/csrf/`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const data = (await readResponse(response)) as {
    csrfToken?: string;
  };

  if (!response.ok || !data?.csrfToken) {
    throw new Error("Unable to obtain a CSRF token.");
  }

  return data.csrfToken;
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase();
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const isUnsafeMethod = !["GET", "HEAD", "OPTIONS"].includes(method);

  if (isUnsafeMethod) {
    const csrfToken = await getCsrfToken();
    headers.set("X-CSRFToken", csrfToken);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const data = await readResponse(response);

  if (!response.ok) {
    throw new ApiError(response.status, data);
  }

  return data as T;
}

function findFirstErrorMessage(value: unknown): string | null {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const message = findFirstErrorMessage(item);

      if (message) {
        return message;
      }
    }
  }

  if (typeof value === "object" && value !== null) {
    for (const item of Object.values(value)) {
      const message = findFirstErrorMessage(item);

      if (message) {
        return message;
      }
    }
  }

  return null;
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return (
      findFirstErrorMessage(error.details) ??
      "The request could not be completed."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

export function registerUser(data: RegisterPayload): Promise<User> {
  return apiRequest<User>("/api/accounts/register/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function loginUser(data: LoginPayload): Promise<User> {
  return apiRequest<User>("/api/accounts/login/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logoutUser(): Promise<void> {
  await apiRequest<null>("/api/accounts/logout/", {
    method: "POST",
  });
}

export function getCurrentUser(): Promise<User> {
  return apiRequest<User>("/api/accounts/me/");
}