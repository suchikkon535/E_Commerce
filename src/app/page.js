import Image from "next/image";
import Link from "next/link"; // Import Link

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-5xl text-black font-bold mb-4">Welcome to My App</h1>
      <p className="text-lg text-gray-700 mb-8">
        This is the landing page. Add your marketing content here.
      </p>

      {/* Link wraps the button */}
      <Link href="/products">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Get Started
        </button>
      </Link>

      <div className="mt-12 w-full max-w-4xl">
        <Image
          src="/globe.svg"
          alt="Landing illustration"
          width={800}
          height={600}
          className="rounded-lg"
        />
      </div>
    </main>
  );
}
