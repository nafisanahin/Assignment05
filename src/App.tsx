import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [stack, setStack] = useState<Technology[]>([]);

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

  // Add technology
  const addToStack = (technology: Technology) => {
    const alreadyAdded = stack.some((item) => item.id === technology.id);

    if (alreadyAdded) {
      toast.warning("Technology already added!");
      return;
    }

    setStack((prevStack) => [...prevStack, technology]);

    toast.success(`${technology.name} added to your stack!`);
  };

  const removeFromStack = (id: string) => {
    setStack((prevStack) => prevStack.filter((item) => item.id !== id));

    toast.info("Technology removed!");
  };

  const removeAll = () => {
    setStack([]);

    toast.info("Your stack has been cleared!");
  };

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

      {/* Technology section*/}
      <section
        id="technologies"
        className="mx-auto max-w-[1400px] bg-white px-6 py-6 lg:px-16"
      >
        {/* Heading */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold tracking-tight text-[#172033] sm:text-3xl">
            Explore the{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #ff6b35, #e91e8c, #9c27b0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Technologies
            </span>
          </h2>

          <p className="mt-1 text-[11px] text-gray-400">
            Pick one technology per category to build your ideal stack.
          </p>
        </div>

        {/* Main Layout */}
        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-pink-500" />

              <p className="text-sm text-gray-400">Loading technologies...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(135px,1fr)]">
            {/* LEFT SIDE - TECHNOLOGY CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {technologies.map((technology) => (
                <div
                  key={technology.id}
                  className="flex min-w-0 flex-col rounded-lg border border-gray-100 bg-white p-2.5 shadow-sm transition hover:shadow-md"
                >
                  {/* Icon and Badge */}
                  {/* Icon and Badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-7 w-7 items-center justify-center">
                      <img
                        src={technology.icon}
                        alt={technology.name}
                        className="h-6 w-6 object-contain"
                      />
                    </div>

                    <span className="rounded-full bg-blue-50 px-2 py-1 text-[8px] font-medium text-blue-500">
                      {technology.badge}
                    </span>
                  </div>

                  {/* Technology Name */}
                  <h3 className="mt-2 text-sm font-bold leading-5 text-[#172033]">
                    {technology.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 min-h-[40px] text-[10px] leading-[15px] text-gray-400">
                    {technology.description}
                  </p>

                  {/* Category, Difficulty, Rating */}
                  <div className="mt-2 flex items-center justify-between gap-1">
                    <span className="rounded-sm bg-gray-100 px-1.5 py-1 text-[8px] text-gray-500">
                      {technology.category}
                    </span>

                    <span className="text-[8px] text-gray-500">
                      {technology.difficulty}
                    </span>

                    <span className="whitespace-nowrap text-[9px] text-gray-600">
                      <span className="text-yellow-500">★</span>{" "}
                      {technology.rating}
                    </span>
                  </div>

                  {/* Add to Stack */}
                  <button
                    onClick={() => addToStack(technology)}
                    className="mt-2 w-full rounded-md bg-[#080d1c] py-2 text-[9px] font-medium text-white transition hover:bg-[#20283b]"
                  >
                    Add to Stack
                  </button>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE - YOUR STACK */}
            <aside className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
              <h3 className="text-xs font-bold text-[#172033]">Your Stack</h3>

              <p className="mt-1 text-[9px] text-gray-400">
                {stack.length} Technology
                {stack.length === 1 ? "" : "ies"} Selected
              </p>

              {/* Selected Items */}
              <div className="mt-2 flex flex-col gap-2">
                {stack.length === 0 ? (
                  <p className="rounded-md border border-gray-100 p-3 text-center text-[9px] text-gray-400">
                    No technologies selected.
                  </p>
                ) : (
                  stack.map((technology) => (
                    <div
                      key={technology.id}
                      className="flex items-center justify-between gap-2 rounded-md border border-gray-100 p-2"
                    >
                      <div className="flex min-w-0 items-center gap-1.5">
                        <img
                          src={technology.icon}
                          alt={technology.name}
                          className="h-5 w-5 shrink-0 object-contain"
                        />

                        <span className="truncate text-[9px] font-medium text-gray-700">
                          {technology.name}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromStack(technology.id)}
                        aria-label={`Remove ${technology.name}`}
                        className="shrink-0 text-xs text-gray-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Remove All */}
              <button
                onClick={removeAll}
                disabled={stack.length === 0}
                className="mt-5 w-full rounded-md border border-red-200 py-2 text-[9px] font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Remove All
              </button>
            </aside>
          </div>
        )}
      </section>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
