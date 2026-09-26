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
  badgeColor: string;
  badgeTextColor: string;
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
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #D946EF 0%, #E11D8A 100%)",
              }}
            >
              DS
            </span>

            <span className="text-lg font-bold">
              <span className="text-[#172033]">Dev</span>
              <span className="ml-[3px] text-[#E11D8A]">Stack</span>
            </span>
          </a>

          {/* Navigation */}
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
              className="rounded-full px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
              style={{
                background: "linear-gradient(90deg, #E11D8A, #D9167A)",
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
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_284px]">
            {/*left side*/}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {technologies.map((technology) => (
                <div
                  key={technology.id}
                  className="flex min-w-0 flex-col rounded-lg border border-gray-100 bg-white p-2.5 shadow-sm transition hover:shadow-md"
                >
                  {/* Icon and Badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-7 w-7 items-center justify-center">
                      <img
                        src={technology.icon}
                        alt={technology.name}
                        className="h-6 w-6 object-contain"
                      />
                    </div>

                    <span
                      style={{
                        backgroundColor: technology.badgeColor,
                        color: technology.badgeTextColor,
                      }}
                      className="rounded-full px-2 py-1 text-[8px] font-medium"
                    >
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

                  {/* Category*/}
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

            {/* RIGHT SIDE */}
            {/* RIGHT SIDE - YOUR STACK */}
            <div className="flex justify-center lg:justify-end">
              <aside className="box-border flex h-[297px] w-[280px] flex-col rounded-[15px] border border-[#E5E7EB] bg-white px-[16px] pt-[25px] pb-[10px]">
                {/* Heading */}
                <div className="px-[5px]">
                  <h3 className="text-[16px] font-bold leading-[20px] text-[#172033]">
                    Your Stack
                  </h3>

                  <p className="mt-[2px] text-[13px] leading-[16px] text-[#94A3B8]">
                    {stack.length === 0
                      ? "No technologies selected yet."
                      : `${stack.length} Technology${stack.length === 1 ? "" : "ies"} Selected`}
                  </p>
                </div>

                {/* Empty State */}
                {stack.length === 0 ? (
                  <div className="mt-[15px] flex h-[67px] w-full items-center justify-center rounded-[10px] border border-dashed border-[#DCE3ED]">
                    <span className="text-[12px] text-[#94A3B8]">
                      Your stack is empty.
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Selected Technologies */}
                    <div className="mt-[15px] flex flex-col gap-[4px] overflow-hidden">
                      {stack.map((technology) => (
                        <div
                          key={technology.id}
                          className="flex h-[50px] shrink-0 items-center justify-between rounded-[9px] border border-[#E2E8F0] bg-white px-[10px]"
                        >
                          {/* Icon + Details */}
                          <div className="flex min-w-0 items-center gap-[10px]">
                            <img
                              src={technology.icon}
                              alt={technology.name}
                              className="h-[28px] w-[28px] shrink-0 object-contain"
                            />

                            <div className="flex min-w-0 flex-col">
                              <span className="truncate text-[12px] font-semibold leading-[15px] text-[#172033]">
                                {technology.name}
                              </span>

                              <span className="text-[8px] leading-[11px] text-[#94A3B8]">
                                {technology.category}
                              </span>
                            </div>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeFromStack(technology.id)}
                            aria-label={`Remove ${technology.name}`}
                            className="flex h-[28px] w-[28px] shrink-0 items-center justify-center text-[25px] font-light leading-none text-[#94A3B8] transition hover:text-red-500"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Remove All */}
                    <button
                      onClick={removeAll}
                      className="mt-auto h-[30px] w-full shrink-0 rounded-[8px] border border-[#FECACA] bg-white text-[14px] font-bold text-[#DC2626] transition hover:bg-[#FFF5F5]"
                    >
                      Remove All
                    </button>
                  </>
                )}
              </aside>
            </div>
          </div>
        )}
      </section>
      {/* FOOTER */}
      <footer className="mt-16 border-t border-[#F1F5F9] bg-white">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          {/* Main Footer */}
          <div className="flex items-start py-12">
            {/* Brand Section */}
            <div className="w-[397px] shrink-0">
              {/* Logo */}
              <a
                href="#home"
                className="flex items-center gap-2 font-bold text-[#172033]"
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #D946EF 0%, #E11D8A 100%)",
                  }}
                >
                  DS
                </span>

                <span className="text-lg font-bold">
                  <span className="text-[#172033]">Dev</span>
                  <span className="ml-[3px] text-[#E11D8A]">Stack</span>
                </span>
              </a>

              {/* Description */}
              <p className="mt-3 max-w-[310px] text-[11px] leading-[16px] text-[#94A3B8]">
                Curated tools, technologies, and resources for developers
                building modern software.
              </p>

              {/* Social Links */}
              <div className="mt-4 flex gap-4 text-[10px] font-bold text-[#475569]">
                <a href="#" className="transition hover:text-pink-500">
                  GitHub
                </a>

                <a href="#" className="transition hover:text-pink-500">
                  Twitter
                </a>

                <a href="#" className="transition hover:text-pink-500">
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Product */}
            <div className="w-[120px] shrink-0">
              <h4 className="text-[10px] font-bold uppercase tracking-wide text-[#172033]">
                Product
              </h4>

              <div className="mt-3 flex flex-col gap-2 text-[10px] text-[#94A3B8]">
                <a href="#home" className="transition hover:text-pink-500">
                  Home
                </a>

                <a
                  href="#technologies"
                  className="transition hover:text-pink-500"
                >
                  Technologies
                </a>

                <a href="#projects" className="transition hover:text-pink-500">
                  Projects
                </a>
              </div>
            </div>

            {/* Space between Product and Company */}
            <div className="w-[79px] shrink-0" />

            {/* Company */}
            <div className="w-[120px] shrink-0">
              <h4 className="text-[10px] font-bold uppercase tracking-wide text-[#172033]">
                Company
              </h4>

              <div className="mt-3 flex flex-col gap-2 text-[10px] text-[#94A3B8]">
                <a href="#about" className="transition hover:text-pink-500">
                  About
                </a>

                <a href="#contact" className="transition hover:text-pink-500">
                  Contact
                </a>

                <a href="#" className="transition hover:text-pink-500">
                  Careers
                </a>
              </div>
            </div>

            {/* Space between Company and Legal */}
            <div className="w-[78px] shrink-0" />

            {/* Legal */}
            <div className="w-[120px] shrink-0">
              <h4 className="text-[10px] font-bold uppercase tracking-wide text-[#172033]">
                Legal
              </h4>

              <div className="mt-3 flex flex-col gap-2 text-[10px] text-[#94A3B8]">
                <a href="#" className="transition hover:text-pink-500">
                  Privacy Policy
                </a>

                <a href="#" className="transition hover:text-pink-500">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex items-center justify-between border-t border-[#F1F5F9] py-6 text-[10px] text-[#94A3B8]">
            {/* Copyright */}
            <p>© 2026 Dev Stack. All rights reserved.</p>

            {/* Bottom Links */}
            <div className="flex gap-5">
              <a href="#" className="transition hover:text-pink-500">
                Privacy
              </a>

              <a href="#" className="transition hover:text-pink-500">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
