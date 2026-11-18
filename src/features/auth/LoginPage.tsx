import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { useAuth } from "./AuthProvider";

export function LoginPage() {
  const { login, signUp, sendReset } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup" | "reset">("signin");
  const [name, setName] = useState("");
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    try {
      if (mode === "signin") await login(cleanEmail, password);
      else if (mode === "signup") {
        await signUp(cleanEmail, password, name.trim());
        setNotice("Check your email to confirm your account, then sign in.");
        setMode("signin");
      } else {
        await sendReset(cleanEmail);
        setNotice("If that email has an account, a link to set a new password is on its way.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6-6 6 6" />
              <path d="M4 13h16" />
              <path d="M8 17h8" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-semibold text-[var(--foreground)]">
            KukuThrive
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Sign in to manage your farm
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--color-card)] p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                  Your name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-[var(--input)] bg-[var(--color-background)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--ring)] focus:outline-none"
                />
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[var(--input)] bg-[var(--color-background)] px-3 py-2 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--ring)] focus:outline-none"
                placeholder="you@farm.co"
              />
            </div>

            {mode !== "reset" && (<div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  required
                  minLength={mode === "signup" ? 8 : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-[var(--input)] bg-[var(--color-background)] px-3 py-2 pr-10 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--ring)] focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                  onClick={() => setShow(!show)}
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            )}

            {notice && <p className="text-sm text-[var(--success)]">{notice}</p>}
            {error && <p className="text-sm text-[var(--destructive)]">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--secondary)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
            </button>
          </form>
          <div className="mt-4 flex flex-col gap-1 text-center text-sm text-[var(--muted-foreground)]">
            {mode === "signin" ? (
              <>
                <button type="button" onClick={() => setMode("reset")} className="hover:text-[var(--foreground)]">
                  First time here after the move, or forgot your password? Set a new one
                </button>
                <button type="button" onClick={() => setMode("signup")} className="hover:text-[var(--foreground)]">
                  New to KukuThrive? Create an account
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setMode("signin")} className="hover:text-[var(--foreground)]">
                Back to sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
