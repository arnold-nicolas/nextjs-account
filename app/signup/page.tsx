import Image from "next/image";
import { CardHeader, CardFooter } from "@/app/ui/cards";
import { SignUpForm } from "@/app/ui/forms";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-20 leading-[1.6]">
      <div className="w-full max-w-100">
        <div className="bg-white border border-solid border-[#f76386] rounded-lg p-8 shadow-[0_1px_3px_0px_#ff0000] hover:shadow-[0_4px_6px_0px_#ff0000]">
          <CardHeader 
            text    = "Sign Up"
            subtext = "Fill the form to continue"
          />
          <SignUpForm />
          <CardFooter 
            text = "Already have an account? "
            link = "/"
            linktext = "Sign in"
          />
        </div>
      </div>
    </main>
  );
}