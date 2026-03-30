export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>
        <header className="bg-white p-2 text-black">Header</header>
        {children}
        <footer className="bg-white p-2 text-black">Footer</footer>
    </>
}