import Link from "next/link";

/**
 * The `CardHeader` function in TypeScript React renders a card header with a main text and subtext.
 *
 * @param {string} text - Represents the main header text to display in the module.
 * @param {string} subtext - Represents the header's sub text to display in the module.
 *
 * @returns A `CardHeader` component is being returned, which consists of a div element with a title
 * (h2) and a subtext (p) inside it. The title and subtext are passed as props to the component.
 */
export function CardHeader({
    text,
    subtext
}: {
    text: string; 
    subtext:string 
}) {
    return(
        <div className="text-center mb-[32]">
            <h2 className="text-[#1a202c] text-3xl font-semibold mb-[8]">{ text }</h2>
            <p className="text-[#718096] text-sm">{ subtext }</p>
        </div>
    );
}

e/**
 * The CardFooter component in TypeScript React renders a text with a link in a card footer design.
 *
 * @param {string} text - Represents the main footer text to display in the module.
 * @param {string} link - Sets the HREF link of the text.
 * @param {string} linktext - Represents the text of the link to display in the module.
 *
 * @returns A JSX element representing the CardFooter component is being returned. The paragraph
 * element contains the provided text and a Link component with the specified link and link text.
 */
export function CardFooter({
    text,
    link,
    linktext,
}: {
    text: string;
    link: string;
    linktext: string;
}) {
    return (
        <div className="text-center">
            <p className="text-[#718096] text-sm">{ text }
            <Link
                href={ link }
                className="text-[#3b82f6] no-underline font-medium"
            >
                { linktext }
            </Link>
            </p>
        </div>
    );
}