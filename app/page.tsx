import Image from "next/image";
import { CardHeader, CardFooter } from "@/app/ui/cards";
import { LoginForm } from "@/app/ui/forms";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-20 leading-[1.6]">
      <div className="w-full max-w-100">
        <div className="bg-white border border-solid border-[#f76386] rounded-lg p-8 shadow-[0_1px_3px_0px_#ff0000] hover:shadow-[0_4px_6px_0px_#ff0000]">
          <CardHeader 
            text    = "Sign In"
            subtext = "Enter your credentials to continue"
          />
          <LoginForm />
          <CardFooter 
            text = "Don't have an account? "
          />
        </div>
      </div>
    </main>
  );
}
