import React, { useEffect, useRef, useState } from 'react';

const videos = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
];

const commits = [
  {
    id: 1,
    title: "Commit 1: Project Initialization & Thematic Base",
    hash: "v0.1.0-alpha",
    progress: "Initialized the React environment using Vite, configured Tailwind CSS, and set up the routing structure. Defined the global deep-tech color palette in the CSS configuration, specifically establishing the \"Onyx\" (deepest black) background and \"Cobalt\" accent colors.",
    thinking: "My primary goal here was managing cognitive load. A site dealing with angstrom-scale semiconductor physics is inherently dense. I leveraged the \"Aesthetic-Usability Effect\"—the idea that users perceive attractive interfaces as more usable. By establishing a rigid design system early on in the Tailwind config, I ensured consistency. I chose a dark theme (\"Onyx\") not just for aesthetics, but because it creates a high-contrast environment necessary for legible data visualization while drastically reducing eye strain. The \"Cobalt\" blue accent was chosen for its psychological associations with trust, precision, and enterprise technology."
  },
  {
    id: 2,
    title: "Commit 2: Information Architecture & Navigation",
    hash: "v0.3.0-beta",
    progress: "Built out the global Layout, Navbar, and the massive, data-heavy Footer component. Implemented a scrolling marquee ticker tape in the navbar to display live \"Fab 4.2\" status updates.",
    thinking: "Strong information architecture must precede flashy visuals. I applied \"Hick's Law\" (the time it takes to make a decision increases with the number and complexity of choices) to the navigation. Instead of cluttering the top Navbar, I kept it strictly to the four primary user journeys. I built a \"mega-footer\" to act as a catch-all safety net for secondary links (Legal, Documentation, API Status), allowing users to build a clear mental map of the site. The ticker tape was a deliberate branding choice; it shifts the UI from feeling like a static brochure to feeling like a live, operational command center."
  },
  {
    id: 3,
    title: "Commit 3: Data Visualization Draft",
    hash: "v0.5.0-beta",
    progress: "Drafted the TechSpecs page, focusing on the \"Real-Time Diagnostics\" interactive visualizer. Built the toggle states to allow users to switch between Logic Topology, Thermal Maps, and Power Grid views using React state.",
    thinking: "When presenting complex datasets, you have to avoid the \"wall of text\" effect which causes immediate user bounce. I used a UX principle called \"Progressive Disclosure\"—hiding deep technical information behind stateful toggles until the user explicitly asks for it. By forcing the user to click between Logic, Thermal, and Power states, I changed the learning process from passive reading to active, tactile exploration. This helps the user build a better mental model of the chip's architecture because they are physically controlling the data flow on the screen."
  },
  {
    id: 4,
    title: "Commit 4: Interaction Design & Micro-animations",
    hash: "v0.8.0-rc",
    progress: "Integrated framer-motion to handle page transitions and element reveals. Built the CustomCursor component to replace the default mouse with a precision crosshair. Added the GenerativeBackground canvas to render subtle moving dots in the background.",
    thinking: "I wanted to bridge the gap between a standard website and a native engineering application. This required a form of digital \"skeuomorphism\"—not making things look like physical objects, but making them behave with physical weight and precision. Replacing the standard cursor with a highly responsive, spring-physics-driven crosshair fundamentally changes the user's relationship with the interface; it demands precision. The generative canvas was added to solve the \"dead void\" problem of dark mode. Using a <canvas> element allowed me to render an ambient, moving texture that feels alive but operates at a low enough opacity that it doesn't distract from the core typography."
  },
  {
    id: 5,
    title: "Commit 5: Initial Content Integration & Boot Sequence",
    hash: "Axon-803d025",
    progress: "Populated the site with the initial \"Backside Power Delivery\" (BSPDN) narrative. Created the first dark-themed SplashScreen featuring a floating \"System_Boot\" text above an animated SVG logo. Added a simple reading progress bar to the top of the layout.",
    thinking: "The psychology of loading screens is fascinating; if a site flashes instantly to a heavy dashboard, the user feels disoriented. I designed the splash screen to act as a cinematic threshold. It delays gratification for just a second, resetting the user's context and setting a serious, secure tone. Concurrently, I noticed that the depth of the technical content was creating \"scroll fatigue.\" The horizontal progress bar at the top of the screen was my first attempt at providing a persistent anchor, giving users constant, subconscious feedback about how deep they were into the document."
  },
  {
    id: 6,
    title: "Commit 6: The Core Technology Pivot",
    hash: "v1.1.0-refactor",
    progress: "Executed a massive content pivot, replacing all mentions of \"Backside Power\" with \"Silicon Photonics\" (SiPh). Updated the deployment scenario charts to measure \"Energy Efficiency\" instead of thermal drops, shifting the data display from 15 pJ/b to 2 pJ/b.",
    thinking: "This commit was a masterclass in the tight coupling of UX copy and UI design. When the core technology narrative shifted to optics, I couldn't just do a \"find and replace\" on the text. Good data visualization requires context. I had to completely rethink the metrics being displayed to ensure they logically supported the new narrative. Transitioning the charts to show extreme drops in picojoules per bit (pJ/b) rather than degrees Celsius ensured the UI maintained its technical integrity. If the visuals and the copy don't perfectly align, expert users will immediately spot the disconnect and lose trust in the interface."
  },
  {
    id: 7,
    title: "Commit 7: Usability Polish & Friction Removal (Final)",
    hash: "Axon-6779fdc",
    progress: "Completely overhauled the SplashScreen to use a bright background, moving the scrolling terminal text strictly below a massive AXON logo. Upgraded the Home page hero text with a new @keyframes text-shine CSS animation for a liquid-chrome effect. Replaced the subtle top progress bar with a highly visible ScrollProgress circular glassmorphism widget in the bottom-right corner.",
    thinking: "This final phase focused on resolving visual hierarchy flaws and removing UX friction. On the original splash screen, the user's eye was torn between the logo and the floating text. By moving the terminal text below the logo, I aligned the design with natural top-to-bottom reading patterns, establishing that the brand (AXON) is paramount, while the loading text is secondary. Furthermore, I realized the top scroll bar was too subtle on large monitors. Replacing it with a Floating Action Button (FAB) that doubles as an SVG progress gauge was a massive functional upgrade. It provides clear, continuous feedback on scroll depth while offering a physical affordance (a one-click \"scroll-to-top\" action) right where the user's mouse or thumb naturally rests, dramatically smoothing out navigation on long pages."
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
            const index = sectionRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActiveHash(commits[index].hash);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px", // Trigger when the section crosses the middle of the screen
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
    <div className="bg-[#0D0D12] text-[#EDEDED] font-sans min-h-screen selection:bg-[#008080] selection:text-white relative overflow-x-hidden">
      {/* Mesh Gradient Background */}
      <div className="mesh-bg"></div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center px-6 relative z-10">
        {/* Glowing radial gradient behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#0047FF]/20 to-[#008080]/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Status Badge */}
          <div className="flex items-center gap-3 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-8 shadow-[0_0_20px_rgba(0,128,128,0.15)]">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#008080] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#008080]"></span>
            </div>
            <span className="font-mono text-[10px] md:text-xs tracking-widest text-white/80 uppercase">System Status: Operational</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 drop-shadow-sm">
            Axon Semiconductors:<br />The Architecture of Vibe Coding
          </h1>
          <p className="text-lg md:text-xl font-light text-white/60 max-w-2xl mx-auto leading-relaxed">
            A deep dive into the iterative design process, translating angstrom-scale technical density into a precise, high-performance interface.
          </p>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-4">Scroll to Explore</span>
          <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#008080] to-transparent animate-scroll-line"></div>
          </div>
        </div>
      </section>

      {/* Single Column Vertical Feed */}
      <section className="relative z-10 max-w-4xl mx-auto py-24 px-6">
        {commits.map((commit, index) => (
          <React.Fragment key={commit.id}>
            <article 
              ref={(el) => (sectionRefs.current[index] = el)}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-32 shadow-2xl"
            >
              <div className="commit-header mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="version-badge gradient-text font-mono text-sm tracking-widest uppercase font-semibold">{commit.hash}</span>
                </div>
                <h3 className="commit-title font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white/90 leading-tight">
                  {commit.title}
                </h3>
              </div>
              
              <div className="commit-body">
                <p className="progress-text text-lg md:text-xl font-light leading-relaxed mb-10 text-white/70">
                  <strong className="font-medium text-white/90">The Progress:</strong> {commit.progress}
                </p>
                
                <div className="ux-rationale bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h4 className="rationale-heading font-display text-lg md:text-xl font-medium mb-4 text-white/90 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008080] shadow-[0_0_8px_#008080]"></span>
                    What I was thinking
                  </h4>
                  <p className="text-base md:text-lg font-light leading-relaxed text-white/60">
                    {commit.thinking}
                  </p>
                </div>
              </div>
            </article>

            {/* Inline Video Injection */}
            {commit.id === 1 && (
              <div className="mb-32">
                <video 
                  src={videos[0]} 
                  className="w-full aspect-video rounded-2xl object-cover border border-white/10 shadow-[0_0_50px_rgba(0,128,128,0.1)]"
                  autoPlay muted loop playsInline
                />
              </div>
            )}
            {commit.id === 4 && (
              <div className="mb-32">
                <video 
                  src={videos[1]} 
                  className="w-full aspect-video rounded-2xl object-cover border border-white/10 shadow-[0_0_50px_rgba(0,128,128,0.1)]"
                  autoPlay muted loop playsInline
                />
              </div>
            )}
            {commit.id === 7 && (
              <div className="mb-32">
                <video 
                  src={videos[2]} 
                  className="w-full aspect-video rounded-2xl object-cover border border-white/10 shadow-[0_0_50px_rgba(0,128,128,0.1)]"
                  autoPlay muted loop playsInline
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 flex flex-col items-center justify-center text-center relative z-10">
        <a 
          href="#" 
          className="group relative inline-flex items-center justify-center px-12 py-6 font-display font-medium text-lg md:text-xl tracking-wide text-white bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/5 hover:border-white/20"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#0047FF]/10 to-[#008080]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          <span className="relative z-10 flex items-center gap-4">
            Launch Axon Deployment
            <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </a>
      </footer>

      {/* The Segmented HUD Dial (Fixed Scroll Indicator) */}
      <div className="fixed bottom-8 right-8 z-50 w-24 h-24 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(0,71,255,0.3)] group cursor-pointer hover:scale-105 transition-transform duration-300">
        {/* SVG Reticle */}
        <svg className="absolute inset-0 w-full h-full text-[#008080]/50 group-hover:text-[#00F0FF]/80 transition-colors duration-500" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_10s_linear_infinite] origin-center" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" className="animate-[spin_15s_linear_infinite_reverse] origin-center opacity-50" />
          {/* 3 Segments */}
          <path d="M 50 2 A 48 48 0 0 1 91.5 26" fill="none" stroke="#0047FF" strokeWidth="2" strokeLinecap="round" />
          <path d="M 91.5 74 A 48 48 0 0 1 8.5 74" fill="none" stroke="#008080" strokeWidth="2" strokeLinecap="round" />
          <path d="M 8.5 26 A 48 48 0 0 1 50 2" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="text-xs font-mono text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] font-semibold tracking-wider z-10 animate-pulse">
          {activeHash.split('-')[0]}
        </span>
      </div>
    </div>
  );
}
