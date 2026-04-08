
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * This function is a SubmitButton component in TypeScript React that renders a styled button with
 * dynamic children and props.
 *
 * @param {ReactNode} children - represents the children prop.
 * @param rest - collects all additional arguments into an array.
 *
 * @returns a button element with the following attributes and styles:
 */
export default function SubmitButton({ children, ...rest }: ButtonProps) {
    return (
        <button 
            {...rest}
            className="w-full bg-[#3b82f6] border-none rounded-md py-2 px-12 text-white text-base font-medium cursor-pointer relative mt-4 mb-8 hover:bg-[#2563eb] hover:shadow-[0_4px_6px_0.2px_#3B82F6] hover:-translate-y-1 active:translate-y-0">
            {children}
        </button>
    );
}