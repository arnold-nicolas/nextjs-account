import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-20 leading-[1.6]">
      <div className="w-full max-w-100">
        <div className="bg-white border border-solid border-[#e2e8f0] rounded-lg p-22 shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
          <div className="text-center mb-[32]">
            <h2 className="text-[#1a202c] text-3xl font-semibold mb-[8]">Sign In</h2>
            <p className="text-[#718096] text-sm">Enter your credentials to continue</p>
          </div>

          <div className="text-center">
              <p className="text-[#718096] text-sm">Don't have an account? <a className="text-[#3b82f6] no-underline font-medium" href="#">Create one</a></p>
          </div>
        </div>
      </div>
    </main>
  );
}
