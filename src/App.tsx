import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";

interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  rating: number;
  difficulty: string;
  badge: string;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/technologies.json")
      .then((res) => res.json())
      .then((data) => {
        setTechnologies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/*NAVBAR*/}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[70px] max-w-[1400px] items-center justify-between px-5 lg:px-10">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-gray-700 md:hidden"
          >
            ☰
          </button>

          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 font-bold text-[#172033]"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-white"
              style={{
                background: "linear-gradient(90deg, #ff6b35, #e91e8c, #9c27b0)",
              }}
            >
              DS
            </span>

            <span className="text-lg">Dev Stack</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
            <a href="#home" className="font-medium text-pink-500">
              Home
            </a>

            <a href="#technologies" className="transition hover:text-pink-500">
              Technologies
            </a>

            <a href="#projects" className="transition hover:text-pink-500">
              Projects
            </a>

            <a href="#about" className="transition hover:text-pink-500">
              About
            </a>

            <a href="#contact" className="transition hover:text-pink-500">
              Contact
            </a>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-3">
            <button className="hidden text-sm text-gray-600 sm:block">
              Sign In
            </button>

            <button
              className="rounded-full px-5 py-2 text-sm font-medium text-white shadow-sm"
              style={{
                background: "linear-gradient(90deg, #ff6b35, #e91e8c, #9c27b0)",
              }}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm text-gray-600">
              <a href="#home" onClick={() => setMenuOpen(false)}>
                Home
              </a>

              <a href="#technologies" onClick={() => setMenuOpen(false)}>
                Technologies
              </a>

              <a href="#projects" onClick={() => setMenuOpen(false)}>
                Projects
              </a>

              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>

              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/*HERO SECTION */}
      <section
        id="home"
        className="mx-auto max-w-[1400px] px-6 py-16 lg:px-16 lg:py-24"
      >
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl font-extrabold leading-tight text-[#111827] sm:text-5xl lg:text-6xl">
              Build Your Ideal
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #ff6b35, #e91e8c, #9c27b0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Development Stack
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
              Explore frontend, backend, database, and tooling options, compare
              them side by side, and put together the stack that fits your next
              project.
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#technologies"
                className="rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(90deg, #ff6b35, #e91e8c, #9c27b0)",
                }}
              >
                Explore Technologies
              </a>

              <a
                href="#about"
                className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition hover:border-pink-300"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center">
            <img
              src={heroImg}
              alt="Development Stack"
              className="w-full max-w-[430px] object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
