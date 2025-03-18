import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return <div className="flex min-h-150 w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
              {/* TODO: add a back button that calls History: back() method  https://developer.mozilla.org/en-US/docs/Web/API/History/back  */}
              <LoginForm />
            </div>
          </div>
}