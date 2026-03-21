import Link from "next/link";

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

export function CardFooter({
    text
}: {
    text: string;
}) {
    return (
        <div className="text-center">
            <p className="text-[#718096] text-sm">{ text }
            <Link
                href=""
                className="text-[#3b82f6] no-underline font-medium"
            >
                Create one
            </Link>
            </p>
        </div>
    );
}