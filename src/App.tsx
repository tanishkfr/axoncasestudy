import React, { useEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';

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
    thinking: "My primary goal here was managing cognitive load. A site dealing with angstrom-scale semiconductor physics is inherently dense. I leveraged the \"Aesthetic-Usability Effect\"—the idea that users perceive attractive interfaces as more usable. By establishing a rigid design system early on in the Tailwind config, I ensured consistency. I chose a dark theme (\"Onyx\") not just for aesthetics, but because it creates a high-contrast environment necessary for legible data visualization while drastically reducing eye strain. The \"Cobalt\" blue accent was chosen for its psychological associations with trust, precision, and enterprise technology.",
    videoIndex: 0
  },
  {
    id: 2,
    title: "Commit 2: Information Architecture & Navigation",
    hash: "v0.3.0-beta",
    progress: "Built out the global Layout, Navbar, and the massive, data-heavy Footer component. Implemented a scrolling marquee ticker tape in the navbar to display live \"Fab 4.2\" status updates.",
    thinking: "Strong information architecture must precede flashy visuals. I applied \"Hick's Law\" (the time it takes to make a decision increases with the number and complexity of choices) to the navigation. Instead of cluttering the top Navbar, I kept it strictly to the four primary user journeys. I built a \"mega-footer\" to act as a catch-all safety net for secondary links (Legal, Documentation, API Status), allowing users to build a clear mental map of the site. The ticker tape was a deliberate branding choice; it shifts the UI from feeling like a static brochure to feeling like a live, operational command center.",
    videoIndex: 0
  },
  {
    id: 3,
    title: "Commit 3: Data Visualization Draft",
    hash: "v0.5.0-beta",
    progress: "Drafted the TechSpecs page, focusing on the \"Real-Time Diagnostics\" interactive visualizer. Built the toggle states to allow users to switch between Logic Topology, Thermal Maps, and Power Grid views using React state.",
    thinking: "When presenting complex datasets, you have to avoid the \"wall of text\" effect which causes immediate user bounce. I used a UX principle called \"Progressive Disclosure\"—hiding deep technical information behind stateful toggles until the user explicitly asks for it. By forcing the user to click between Logic, Thermal, and Power states, I changed the learning process from passive reading to active, tactile exploration. This helps the user build a better mental model of the chip's architecture because they are physically controlling the data flow on the screen.",
    videoIndex: 1
  },
  {
    id: 4,
    title: "Commit 4: Interaction Design & Micro-animations",
    hash: "v0.8.0-rc",
    progress: "Integrated framer-motion to handle page transitions and element reveals. Built the CustomCursor component to replace the default mouse with a precision crosshair. Added the GenerativeBackground canvas to render subtle moving dots in the background.",
    thinking: "I wanted to bridge the gap between a standard website and a native engineering application. This required a form of digital \"skeuomorphism\"—not making things look like physical objects, but making them behave with physical weight and precision. Replacing the standard cursor with a highly responsive, spring-physics-driven crosshair fundamentally changes the user's relationship with the interface; it demands precision. The generative canvas was added to solve the \"dead void\" problem of dark mode. Using a <canvas> element allowed me to render an ambient, moving texture that feels alive but operates at a low enough opacity that it doesn't distract from the core typography.",
    videoIndex: 1
  },
  {
    id: 5,
    title: "Commit 5: Initial Content Integration & Boot Sequence",
    hash: "Axon-803d025",
    progress: "Populated the site with the initial \"Backside Power Delivery\" (BSPDN) narrative. Created the first dark-themed SplashScreen featuring a floating \"System_Boot\" text above an animated SVG logo. Added a simple reading progress bar to the top of the layout.",
    thinking: "The psychology of loading screens is fascinating; if a site flashes instantly to a heavy dashboard, the user feels disoriented. I designed the splash screen to act as a cinematic threshold. It delays gratification for just a second, resetting the user's context and setting a serious, secure tone. Concurrently, I noticed that the depth of the technical content was creating \"scroll fatigue.\" The horizontal progress bar at the top of the screen was my first attempt at providing a persistent anchor, giving users constant, subconscious feedback about how deep they were into the document.",
    videoIndex: 1
  },
  {
    id: 6,
    title: "Commit 6: The Core Technology Pivot",
    hash: "v1.1.0-refactor",
    progress: "Executed a massive content pivot, replacing all mentions of \"Backside Power\" with \"Silicon Photonics\" (SiPh). Updated the deployment scenario charts to measure \"Energy Efficiency\" instead of thermal drops, shifting the data display from 15 pJ/b to 2 pJ/b.",
    thinking: "This commit was a masterclass in the tight coupling of UX copy and UI design. When the core technology narrative shifted to optics, I couldn't just do a \"find and replace\" on the text. Good data visualization requires context. I had to completely rethink the metrics being displayed to ensure they logically supported the new narrative. Transitioning the charts to show extreme drops in picojoules per bit (pJ/b) rather than degrees Celsius ensured the UI maintained its technical integrity. If the visuals and the copy don't perfectly align, expert users will immediately spot the disconnect and lose trust in the interface.",
    videoIndex: 2
  },
  {
    id: 7,
    title: "Commit 7: Usability Polish & Friction Removal (Final)",
    hash: "Axon-6779fdc",
    progress: "Completely overhauled the SplashScreen to use a bright background, moving the scrolling terminal text strictly below a massive AXON logo. Upgraded the Home page hero text with a new @keyframes text-shine CSS animation for a liquid-chrome effect. Replaced the subtle top progress bar with a highly visible ScrollProgress circular glassmorphism widget in the bottom-right corner.",
    thinking: "This final phase focused on resolving visual hierarchy flaws and removing UX friction. On the original splash screen, the user's eye was torn between the logo and the floating text. By moving the terminal text below the logo, I aligned the design with natural top-to-bottom reading patterns, establishing that the brand (AXON) is paramount, while the loading text is secondary. Furthermore, I realized the top scroll bar was too subtle on large monitors. Replacing it with a Floating Action Button (FAB) that doubles as an SVG progress gauge was a massive functional upgrade. It provides clear, continuous feedback on scroll depth while offering a physical affordance (a one-click \"scroll-to-top\" action) right where the user's mouse or thumb naturally rests, dramatically smoothing out navigation on long pages.",
    videoIndex: 2
  }
];

export default function App() {
  const [activeCommit, setActiveCommit] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActiveCommit(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px", // Trigger when the section crosses the middle of the screen
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

  const activeVideoIndex = commits[activeCommit]?.videoIndex || 0;

  return (
    <div className="bg-[#0D0D12] text-[#EDEDED] font-sans min-h-screen selection:bg-[#008080] selection:text-white relative overflow-x-hidden">
      {/* Mesh Gradient Background */}
      <div className="mesh-bg"></div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 drop-shadow-sm">
            Axon Semiconductors:<br />The Architecture of Vibe Coding
          </h1>
          <p className="text-lg md:text-xl font-light text-white/60 max-w-2xl mx-auto leading-relaxed">
            A deep dive into the iterative design process, balancing angstrom-scale technical density with luxury minimalism.
          </p>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent animate-scroll-line"></div>
          </div>
        </div>
      </section>

      {/* Sticky Scroll Narrative */}
      <section className="relative max-w-screen-2xl mx-auto z-10">
        <div className="flex flex-col md:flex-row">
          
          {/* Left Column (Content) */}
          <div className="w-full md:w-[45%] px-6 md:px-12 lg:px-20 py-24 md:py-0 relative">
            
            {/* Fixed Progress Line Background */}
            <div className="hidden md:block fixed left-[24px] lg:left-[40px] top-[20vh] bottom-[20vh] w-[1px] bg-white/10 z-10">
              {/* Moving Dot */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#008080] shadow-[0_0_15px_#008080] transition-all duration-700 ease-in-out z-20"
                style={{ 
                  top: `${(activeCommit / (commits.length - 1)) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="absolute inset-0 rounded-full bg-[#008080] animate-ping opacity-40"></div>
              </div>
            </div>

            <div className="relative z-20 md:pl-8 lg:pl-12">
              {commits.map((commit, index) => (
                <article 
                  key={commit.id}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className="commit-block min-h-screen flex flex-col justify-center py-[20vh] mb-[30vh] last:mb-[20vh]"
                >
                  {/* Mobile Video (Visible only on mobile) */}
                  <div className="md:hidden w-full aspect-video mb-12 relative rounded-2xl overflow-hidden glass-panel">
                    <video 
                      src={videos[commit.videoIndex]} 
                      className="w-full h-full object-cover opacity-90 mix-blend-screen"
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                    />
                    <button 
                      onClick={() => {
                        setActiveCommit(index);
                        setIsLightboxOpen(true);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-white shadow-lg">
                        <Play className="w-6 h-6 ml-1" />
                      </div>
                    </button>
                  </div>

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
                    
                    <div className="ux-rationale glass-panel p-8 md:p-10 relative overflow-hidden group">
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
              ))}
            </div>
          </div>

          {/* Right Column (Media - Sticky) */}
          <div className="hidden md:block w-[55%] sticky top-0 h-screen p-8 lg:p-16 z-10">
            <div className="w-full h-full relative rounded-[2rem] overflow-hidden glass-panel shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
              {videos.map((video, index) => (
                <video
                  key={index}
                  src={video}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out mix-blend-screen ${
                    activeVideoIndex === index ? 'opacity-80 z-10' : 'opacity-0 z-0'
                  }`}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ))}
              
              {/* Overlay Gradient for Luxury Feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12]/80 via-transparent to-transparent z-15 pointer-events-none"></div>
              
              {/* Inspect Button Overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[#0D0D12]/20 backdrop-blur-sm">
                <button 
                  onClick={() => setIsLightboxOpen(true)}
                  className="group flex items-center gap-3 glass-panel px-8 py-4 rounded-full text-white font-mono text-sm tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
                >
                  <Play className="w-4 h-4" />
                  <span>Inspect Sequence</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-48 px-6 flex flex-col items-center justify-center text-center border-t border-white/5 relative z-10 bg-gradient-to-b from-transparent to-[#0D0D12]">
        <a 
          href="#" 
          className="group relative inline-flex items-center justify-center px-12 py-6 font-display font-medium text-lg md:text-xl tracking-wide text-white glass-panel overflow-hidden transition-all duration-500 hover:bg-white/5 hover:border-white/20"
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

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-[#0D0D12]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500">
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 md:top-12 md:right-12 text-white/50 hover:text-white transition-colors z-50"
          >
            <X className="w-10 h-10" />
          </button>
          
          <div className="w-full max-w-7xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,128,128,0.15)] ring-1 ring-white/10 relative">
            <video 
              src={videos[activeVideoIndex]} 
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </div>
  );
}
