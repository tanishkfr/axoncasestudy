import React, { useEffect, useRef, useState } from 'react';

// Your actual YouTube Video IDs
const videos = [
  "8cIf_IPIbFs",
  "e6HvIpfb3k4",
  "hzWIQmBy7hc"
];

const commits = [
  {
    id: 1,
    title: "Commit 1: Project Initialization & Thematic Base",
    hash: "v0.1.0-alpha",
    progress: "Initialized the React environment using Vite, configured Tailwind CSS, and set up the routing structure. Defined the global deep-tech color palette in the CSS configuration, specifically establishing the \"Onyx\" (deepest black) background and \"Cobalt\" accent colors.",
    thinking: "My primary goal here was managing cognitive load. A site dealing with angstrom-scale semiconductor physics is inherently dense. I leveraged the \"Aesthetic-Usability Effect\"—the idea that users perceive attractive interfaces as more usable. By establishing a rigid design system early on in the Tailwind config, I ensured consistency. I chose a dark theme (\"Onyx\") not just for aesthetics, but because it creates a high-contrast environment necessary for legible data visualization while drastically reducing eye strain. The \"Cobalt\" blue accent was chosen for its psychological associations with trust, precision, and enterprise technology.",
    videoIndexToShowAfter: 0 
  },
  {
    id: 2,
    title: "Commit 2: Information Architecture & Navigation",
    hash: "v0.3.0-beta",
    progress: "Built out the global Layout, Navbar, and the massive, data-heavy Footer component. Implemented a scrolling marquee ticker tape in the navbar to display live \"Fab 4.2\" status updates.",
    thinking: "Strong information architecture must precede flashy visuals. I applied \"Hick's Law\" (the time it takes to make a decision increases with the number and complexity of choices) to the navigation. Instead of cluttering the top Navbar, I kept it strictly to the four primary user journeys. I built a \"mega-footer\" to act as a catch-all safety net for secondary links (Legal, Documentation, API Status), allowing users to build a clear mental map of the site. The ticker tape was a deliberate branding choice; it shifts the UI from feeling like a static brochure to feeling like a live, operational command center.",
  },
  {
    id: 3,
    title: "Commit 3: Data Visualization Draft",
    hash: "v0.5.0-beta",
    progress: "Drafted the TechSpecs page, focusing on the \"Real-Time Diagnostics\" interactive visualizer. Built the toggle states to allow users to switch between Logic Topology, Thermal Maps, and Power Grid views using React state.",
    thinking: "When presenting complex datasets, you have to avoid the \"wall of text\" effect which causes immediate user bounce. I used a UX principle called \"Progressive Disclosure\"—hiding deep technical information behind stateful toggles until the user explicitly asks for it. By forcing the user to click between Logic, Thermal, and Power states, I changed the learning process from passive reading to active, tactile exploration. This helps the user build a better mental model of the chip's architecture because they are physically controlling the data flow on the screen.",
  },
  {
    id: 4,
    title: "Commit 4: Interaction Design & Micro-animations",
    hash: "v0.8.0-rc",
    progress: "Integrated framer-motion to handle page transitions and element reveals. Built the CustomCursor component to replace the default mouse with a precision crosshair. Added the GenerativeBackground canvas to render subtle moving dots in the background.",
    thinking: "I wanted to bridge the gap between a standard website and a native engineering application. This required a form of digital \"skeuomorphism\"—not making things look like physical objects, but making them behave with physical weight and precision. Replacing the standard cursor with a highly responsive, spring-physics-driven crosshair fundamentally changes the user's relationship with the interface; it demands precision. The generative canvas was added to solve the \"dead void\" problem of dark mode. Using a <canvas> element allowed me to render an ambient, moving texture that feels alive but operates at a low enough opacity that it doesn't distract from the core typography.",
    videoIndexToShowAfter: 1 
  },
  {
    id: 5,
    title: "Commit 5: Initial Content Integration & Boot Sequence",
    hash: "Axon-803d025",
    progress: "Populated the site with the initial \"Backside Power Delivery\" (BSPDN) narrative. Created the first dark-themed SplashScreen featuring a floating \"System_Boot\" text above an animated SVG logo. Added a simple reading progress bar to the top of the layout.",
    thinking: "The psychology of loading screens is fascinating; if a site flashes instantly to a heavy dashboard, the user feels disoriented. I designed the splash screen to act as a cinematic threshold. It delays gratification for just a second, resetting the user's context and setting a serious, secure tone. Concurrently, I noticed that the depth of the technical content was creating \"scroll fatigue.\" The horizontal progress bar at the top of the screen was my first attempt at providing a persistent anchor, giving users constant, subconscious feedback about how deep they were into the document.",
  },
  {
    id: 6,
    title: "Commit 6: The Core Technology Pivot",
    hash: "v1.1.0-refactor",
    progress: "Executed a massive content pivot, replacing all mentions of \"Backside Power\" with \"Silicon Photonics\" (SiPh). Updated the deployment scenario charts to measure \"Energy Efficiency\" instead of thermal drops, shifting the data display from 15 pJ/b to 2 pJ/b.",
    thinking: "This commit was a masterclass in the tight coupling of UX copy and UI design. When the core technology narrative shifted to optics, I couldn't just do a \"find and replace\" on the text. Good data visualization requires context. I had to completely rethink the metrics being displayed to ensure they logically supported the new narrative. Transitioning the charts to show extreme drops in picojoules per bit (pJ/b) rather than degrees Celsius ensured the UI maintained its technical integrity. If the visuals and the copy don't perfectly align, expert users will immediately spot the disconnect and lose trust in the interface.",
  },
  {
    id: 7,
    title: "Commit 7: Usability Polish & Friction Removal (Final)",
    hash: "Axon-6779fdc",
    progress: "Completely overhauled the SplashScreen to use a bright background, moving the scrolling terminal text strictly below a massive AXON logo. Upgraded the Home page hero text with a new @keyframes text-shine CSS animation for a liquid-chrome effect. Replaced the subtle top progress bar with a highly visible ScrollProgress circular glassmorphism widget in the bottom-right corner.",
    thinking: "This final phase focused on resolving visual hierarchy flaws and removing UX friction. On the original splash screen, the user's eye was torn between the logo and the floating text. By moving the terminal text below the logo, I aligned the design with natural top-to-bottom reading patterns, establishing that the brand (AXON) is paramount, while the loading text is secondary. Furthermore, I realized the top scroll bar was too subtle on large monitors. Replacing it with a Floating Action Button (FAB) that doubles as an SVG progress gauge was a massive functional upgrade. It provides clear, continuous feedback on scroll depth while offering a physical affordance (a one-click \"scroll-to-top\" action) right where the user's mouse or thumb naturally rests, dramatically smoothing out navigation on long pages.",
    videoIndexToShowAfter: 2 
  }
];

export default function App() {
  const [activeHash, setActiveHash] = useState(commits[0].hash);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const hash = entry.target.getAttribute('data-hash');
            if (hash) setActiveHash(hash);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="bg-[#0D0D12] text-[#EDEDED] font-sans min-h-screen selection:bg-[#008080] selection:text-white pb-32">
      
      {/* Background Mesh */}
      <div className="fixed inset-0 z-0 bg-[#0D0D12]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,71,255,0.08),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(0,128,128,0.08),transparent_50%)]"></div>
      </div>

      {/* Upgraded Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center relative flex flex-col items-center">
          
          {/* Status Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#00F0FF] font-mono font-semibold">System Status: Operational</span>
          </div>

          {/* Glowing Main Title */}
          <div className="relative">
            <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(0,71,255,0.15),transparent_60%)] blur-2xl pointer-events-none"></div>
            <h1 className="relative font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 drop-shadow-sm">
              Axon Semiconductors:<br />The Architecture of Vibe Coding
            </h1>
          </div>
          
          <p className="text-lg md:text-xl font-light text-white/60 max-w-2xl mx-auto leading-relaxed">
            A deep dive into the iterative design process, balancing angstrom-scale technical density with luxury minimalism.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">Scroll to explore</span>
          <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#00F0FF] to-transparent animate-scroll-line"></div>
          </div>
        </div>
      </section>

      {/* Main Feed */}
      <main className="relative z-10 max-w-4xl mx-auto px-6">
        {commits.map((commit, index) => (
          <div key={commit.id} className="mb-32">
            
            <article 
              ref={(el) => (sectionRefs.current[index] = el)}
              data-hash={commit.hash}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group mb-16"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="mb-8 border-b border-white/10 pb-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[#00F0FF] font-mono text-sm tracking-widest uppercase font-semibold">
                    {commit.hash}
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-white/90 leading-tight">
                  {commit.title}
                </h3>
              </div>
              
              <div className="space-y-8">
                <p className="text-lg font-light leading-relaxed text-white/80">
                  <strong className="font-medium text-white block mb-2">The Progress:</strong> 
                  {commit.progress}
                </p>
                
                <div className="bg-black/20 rounded-2xl p-6 md:p-8 border border-white/5 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0047FF] to-[#008080] rounded-l-2xl"></div>
                  <h4 className="font-display text-lg font-medium mb-3 text-white/90 flex items-center gap-3">
                    What I was thinking
                  </h4>
                  <p className="text-base font-light leading-relaxed text-white/60">
                    {commit.thinking}
                  </p>
                </div>
              </div>
            </article>

            {/* YouTube Iframe Rendering */}
            {commit.videoIndexToShowAfter !== undefined && (
              <div className="w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,128,128,0.1)] relative group bg-black">
                <iframe 
                  className="w-full h-full object-cover pointer-events-none opacity-90 scale-105"
                  src={`https://www.youtube.com/embed/${videos[commit.videoIndexToShowAfter]}?autoplay=1&mute=1&loop=1&playlist=${videos[commit.videoIndexToShowAfter]}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                  title={`Axon Phase ${commit.videoIndexToShowAfter + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none"></div>
              </div>
            )}
          </div>
        ))}
      </main>

      {/* Upgraded Tactical HUD Dial */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="w-28 h-28 rounded-full bg-[#0D0D12]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,71,255,0.3)] flex items-center justify-center relative group">
          
          {/* Animated SVG Rings */}
          <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
            {/* Inner Ring - Spins Clockwise */}
            <svg className="absolute w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="44" stroke="rgba(0,240,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
            </svg>
            
            {/* Outer Ring - Spins Counter-Clockwise */}
            <svg className="absolute w-full h-full animate-[spin_15s_linear_infinite_reverse]" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="50" stroke="#0047FF" strokeWidth="2" fill="none" strokeDasharray="30 40 10 20" className="opacity-60" />
            </svg>
            
            {/* Static Reticle Frame */}
            <svg className="absolute w-full h-full" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="54" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
            </svg>
          </div>

          {/* Inner Data */}
          <div className="flex flex-col items-center justify-center text-center relative z-10">
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1 font-sans">Active</span>
            <span className="text-xs font-mono font-bold text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300">
              {activeHash.substring(0, 10)}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}