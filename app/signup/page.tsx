import Image from "next/image";
import { CardHeader, CardFooter } from "@/app/ui/cards";
import { SignUpForm } from "@/app/ui/forms";

/**
 * The function `Page` returns a JSX structure for a sign-up page with a header, sign-up form, and a
 * footer with a link to sign in.
 *
 * @returns The `Page` component is being returned, which contains a main section with a card-like
 * structure for a sign-up form. The main section includes a CardHeader component with text and subtext
 * for the sign-up form, a SignUpForm component for the form itself, and a CardFooter component with a
 * link to sign in if the user already has an account.
 */
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