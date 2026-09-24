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

      {/* TECHNOLOGIES SECTION  */}
      <section id="technologies" className="bg-[#fafbfc] px-5 py-16 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          {/* Section Heading */}
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-pink-500">
              Explore Your Options
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#172033] sm:text-4xl">
              Choose Your Technologies
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-gray-500">
              Discover the tools and technologies that can power your next great
              project.
            </p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[250px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-pink-500"></div>

                <p className="text-gray-500">Loading technologies...</p>
              </div>
            </div>
          ) : (
            /* Cards */
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {technologies.map((technology) => (
                <div
                  key={technology.id}
                  className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Icon */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 p-2">
                      <img
                        src={technology.icon}
                        alt={technology.name}
                        className="h-9 w-9 object-contain"
                      />
                    </div>

                    <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-500">
                      {technology.badge}
                    </span>
                  </div>

                  {/* Technology Name */}
                  <h3 className="mt-4 text-lg font-bold text-gray-800">
                    {technology.name}
                  </h3>

                  <p className="mt-2 min-h-[60px] text-sm leading-6 text-gray-500">
                    {technology.description}
                  </p>

                  {/* Category */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-600">
                      {technology.category}
                    </span>

                    <span className="text-xs text-gray-400">
                      {technology.difficulty}
                    </span>
                  </div>

                  {/* Button */}
                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-sm font-semibold text-gray-600">
                      {technology.rating}
                    </span>

                    <button
                      className="rounded-lg px-3 py-2 text-xs font-semibold text-white"
                      style={{
                        background:
                          "linear-gradient(90deg, #ff6b35, #e91e8c, #9c27b0)",
                      }}
                    >
                      Add to Stack
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
