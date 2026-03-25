import { useState, useEffect } from 'react';

// Animated SVG stick figures for each exercise
const animations = {
  chinTuck: ({ frame }) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <circle cx="100" cy={50 + (frame % 2 === 0 ? 0 : -5)} r="18" fill="none" stroke="#059669" strokeWidth="3"/>
      <line x1="100" y1="68" x2="100" y2="130" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
      <line x1="100" y1="90" x2="70" y2="115" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
      <line x1="100" y1="90" x2="130" y2="115" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
      <line x1="100" y1="130" x2="80" y2="175" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
      <line x1="100" y1="130" x2="120" y2="175" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
      {/* Arrow showing chin movement */}
      <path d={`M${115 + (frame % 2 === 0 ? 0 : -8)} ${55} L${107 + (frame % 2 === 0 ? 0 : -8)} ${55}`}
        stroke="#D97706" strokeWidth="2" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="#D97706"/>
        </marker>
      </defs>
    </svg>
  ),
  neckStretch: ({ frame }) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <circle cx={100 + (frame % 2 === 0 ? 0 : 12)} cy={50 + (frame % 2 === 0 ? 0 : 8)} r="18" fill="none" stroke="#059669" strokeWidth="3"/>
      <line x1="100" y1="68" x2="100" y2="130" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
      <line x1="100" y1="90" x2="70" y2="115" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
      <line x1="100" y1="90" x2="130" y2="115" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
      <line x1="100" y1="130" x2="80" y2="175" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
      <line x1="100" y1="130" x2="120" y2="175" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
      {frame % 2 !== 0 && (
        <line x1="130" y1="105" x2="118" y2="60" stroke="#D97706" strokeWidth="2" strokeDasharray="4,4" opacity="0.6"/>
      )}
    </svg>
  ),
  scapularSqueeze: ({ frame }) => {
    const offset = frame % 2 === 0 ? 0 : 8;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Back view */}
        <circle cx="100" cy="45" r="18" fill="none" stroke="#059669" strokeWidth="3"/>
        <line x1="100" y1="63" x2="100" y2="130" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="100" y1="85" x2={70 + offset} y2="110" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="100" y1="85" x2={130 - offset} y2="110" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Shoulder blades */}
        <ellipse cx={85 + offset} cy="90" rx="8" ry="15" fill="none" stroke="#D97706" strokeWidth="2" opacity="0.6"/>
        <ellipse cx={115 - offset} cy="90" rx="8" ry="15" fill="none" stroke="#D97706" strokeWidth="2" opacity="0.6"/>
        {/* Arrows */}
        {frame % 2 !== 0 && <>
          <path d="M78,90 L88,90" stroke="#D97706" strokeWidth="2" markerEnd="url(#arr)"/>
          <path d="M122,90 L112,90" stroke="#D97706" strokeWidth="2" markerEnd="url(#arr)"/>
        </>}
        <line x1="100" y1="130" x2="80" y2="175" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="100" y1="130" x2="120" y2="175" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#D97706"/></marker></defs>
      </svg>
    );
  },
  pecStretch: ({ frame }) => {
    const armAngle = frame % 2 === 0 ? 0 : 20;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Doorway */}
        <rect x="35" y="20" width="6" height="170" fill="#E5E7EB" rx="2"/>
        {/* Person */}
        <circle cx={100 + (frame % 2 === 0 ? 0 : 10)} cy="55" r="16" fill="none" stroke="#059669" strokeWidth="3"/>
        <line x1={100 + (frame % 2 === 0 ? 0 : 10)} y1="71" x2={100 + (frame % 2 === 0 ? 0 : 10)} y2="130" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Arm on doorframe */}
        <line x1={100 + (frame % 2 === 0 ? 0 : 10)} y1="85" x2="41" y2={75 - armAngle} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1={100 + (frame % 2 === 0 ? 0 : 10)} y1="85" x2="145" y2="110" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1={100 + (frame % 2 === 0 ? 0 : 10)} y1="130" x2={85 + (frame % 2 === 0 ? 0 : 15)} y2="175" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1={100 + (frame % 2 === 0 ? 0 : 10)} y1="130" x2={115 + (frame % 2 === 0 ? 0 : 5)} y2="175" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Stretch indicator */}
        {frame % 2 !== 0 && <path d="M65,70 Q80,55 95,70" fill="none" stroke="#D97706" strokeWidth="2" strokeDasharray="3,3"/>}
      </svg>
    );
  },
  wallAngel: ({ frame }) => {
    const armY = frame % 2 === 0 ? 75 : 40;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Wall */}
        <rect x="145" y="20" width="6" height="170" fill="#E5E7EB" rx="2"/>
        {/* Person against wall */}
        <circle cx="130" cy="50" r="16" fill="none" stroke="#059669" strokeWidth="3"/>
        <line x1="130" y1="66" x2="130" y2="130" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Arms sliding up */}
        <line x1="130" y1="85" x2="145" y2={armY} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="130" y1="85" x2="105" y2="110" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="130" y1="130" x2="115" y2="175" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="130" y1="130" x2="145" y2="175" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Direction arrow */}
        <path d={`M155 ${armY + 10} L155 ${armY - 5}`} stroke="#D97706" strokeWidth="2" markerEnd="url(#arr2)"/>
        <defs><marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto"><path d="M0,6 L3,0 L6,6" fill="#D97706"/></marker></defs>
      </svg>
    );
  },
  catCow: ({ frame }) => {
    const isCat = frame % 2 === 0;
    const spineY = isCat ? -12 : 12;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* On all fours */}
        <circle cx="145" cy={85 + (isCat ? -5 : 5)} r="14" fill="none" stroke="#059669" strokeWidth="3"/>
        <path d={`M130 ${90 + (isCat ? -5 : 5)} Q100 ${90 + spineY} 70 ${95}`} fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Arms */}
        <line x1="120" y1={95 + (isCat ? -3 : 3)} x2="120" y2="145" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Legs */}
        <line x1="75" y1="95" x2="75" y2="145" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Floor */}
        <line x1="40" y1="145" x2="160" y2="145" stroke="#E5E7EB" strokeWidth="2"/>
        {/* Label */}
        <text x="100" y="175" textAnchor="middle" fill="#D97706" fontSize="14" fontWeight="bold">
          {isCat ? "Cat (Round)" : "Cow (Arch)"}
        </text>
      </svg>
    );
  },
  pronePress: ({ frame }) => {
    const pressUp = frame % 2 !== 0;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Floor */}
        <line x1="20" y1="145" x2="180" y2="145" stroke="#E5E7EB" strokeWidth="2"/>
        {/* Body on floor */}
        <circle cx={60} cy={pressUp ? 85 : 130} r="14" fill="none" stroke="#059669" strokeWidth="3"/>
        <line x1={70} y1={pressUp ? 95 : 138} x2="150" y2="140" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Arms pressing up */}
        <line x1="80" y1={pressUp ? 105 : 138} x2="75" y2="145" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Legs */}
        <line x1="150" y1="140" x2="175" y2="145" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {pressUp && <path d="M50,75 L50,65" stroke="#D97706" strokeWidth="2" markerEnd="url(#arr3)"/>}
        <defs><marker id="arr3" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto"><path d="M0,6 L3,0 L6,6" fill="#D97706"/></marker></defs>
      </svg>
    );
  },
  birdDog: ({ frame }) => {
    const extend = frame % 2 !== 0;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <line x1="40" y1="145" x2="180" y2="145" stroke="#E5E7EB" strokeWidth="2"/>
        <circle cx="130" cy="80" r="14" fill="none" stroke="#059669" strokeWidth="3"/>
        <line x1="120" y1="90" x2="80" y2="95" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Support arm */}
        <line x1="110" y1="93" x2="110" y2="145" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Extended arm */}
        <line x1="120" y1="88" x2={extend ? "165" : "130"} y2={extend ? "70" : "110"} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Support leg */}
        <line x1="85" y1="97" x2="85" y2="145" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Extended leg */}
        <line x1="80" y1="95" x2={extend ? "40" : "70"} y2={extend ? "85" : "145"} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {extend && <>
          <circle cx="165" cy="70" r="3" fill="#D97706"/>
          <circle cx="40" cy="85" r="3" fill="#D97706"/>
        </>}
      </svg>
    );
  },
  deadBug: ({ frame }) => {
    const extend = frame % 2 !== 0;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <line x1="20" y1="130" x2="180" y2="130" stroke="#E5E7EB" strokeWidth="2"/>
        {/* Lying on back */}
        <circle cx="55" cy="118" r="14" fill="none" stroke="#059669" strokeWidth="3"/>
        <line x1="69" y1="120" x2="140" y2="120" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Arms up */}
        <line x1="85" y1="118" x2={extend ? "60" : "85"} y2={extend ? "75" : "85"} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="100" y1="118" x2="100" y2="85" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Legs */}
        <line x1="135" y1="122" x2={extend ? "170" : "145"} y2={extend ? "130" : "90"} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="140" y1="122" x2="150" y2="90" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    );
  },
  gluteBridge: ({ frame }) => {
    const up = frame % 2 !== 0;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <line x1="20" y1="145" x2="180" y2="145" stroke="#E5E7EB" strokeWidth="2"/>
        <circle cx="45" cy="130" r="14" fill="none" stroke="#059669" strokeWidth="3"/>
        {/* Torso - rises up */}
        <line x1="59" y1="128" x2="120" y2={up ? 110 : 135} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Bent knees */}
        <line x1="120" y1={up ? 110 : 135} x2="145" y2={up ? 95 : 115} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="145" y1={up ? 95 : 115} x2="150" y2="145" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Arms on ground */}
        <line x1="60" y1="130" x2="50" y2="145" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {up && <path d="M110,100 L110,90" stroke="#D97706" strokeWidth="2" markerEnd="url(#arr4)"/>}
        <defs><marker id="arr4" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto"><path d="M0,6 L3,0 L6,6" fill="#D97706"/></marker></defs>
      </svg>
    );
  },
  clamshell: ({ frame }) => {
    const open = frame % 2 !== 0;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <line x1="20" y1="155" x2="180" y2="155" stroke="#E5E7EB" strokeWidth="2"/>
        <circle cx="50" cy="120" r="14" fill="none" stroke="#059669" strokeWidth="3"/>
        {/* Side-lying body */}
        <line x1="64" y1="123" x2="100" y2="130" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Bottom leg bent */}
        <line x1="100" y1="130" x2="130" y2="150" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="130" y1="150" x2="155" y2="155" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Top leg - opens up */}
        <line x1="100" y1="130" x2="130" y2={open ? 115 : 145} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="130" y1={open ? 115 : 145} x2="155" y2={open ? 120 : 150} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {open && <path d="M125 118 Q135 105 140 115" fill="none" stroke="#D97706" strokeWidth="2"/>}
      </svg>
    );
  },
  straightLegRaise: ({ frame }) => {
    const up = frame % 2 !== 0;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <line x1="20" y1="140" x2="180" y2="140" stroke="#E5E7EB" strokeWidth="2"/>
        <circle cx="40" cy="125" r="14" fill="none" stroke="#059669" strokeWidth="3"/>
        <line x1="54" y1="128" x2="110" y2="132" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Bent leg */}
        <line x1="110" y1="132" x2="125" y2="110" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="125" y1="110" x2="125" y2="140" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Straight leg - raises */}
        <line x1="105" y1="135" x2="165" y2={up ? 100 : 140} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {up && <circle cx="165" cy="100" r="3" fill="#D97706"/>}
      </svg>
    );
  },
  calfRaise: ({ frame }) => {
    const up = frame % 2 !== 0;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Wall */}
        <rect x="45" y="20" width="5" height="170" fill="#E5E7EB" rx="2"/>
        {/* Person */}
        <circle cx="85" cy={45 + (up ? -8 : 0)} r="16" fill="none" stroke="#059669" strokeWidth="3"/>
        <line x1="85" y1={61 + (up ? -8 : 0)} x2="85" y2={125 + (up ? -8 : 0)} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="85" y1="85" x2="50" y2="75" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="85" y1="85" x2="120" y2="100" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Legs */}
        <line x1="85" y1={125 + (up ? -8 : 0)} x2="75" y2={up ? 162 : 175} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="85" y1={125 + (up ? -8 : 0)} x2="95" y2={up ? 162 : 175} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Feet / toes */}
        {up ? (
          <>
            <circle cx="75" cy="162" r="4" fill="none" stroke="#D97706" strokeWidth="2"/>
            <circle cx="95" cy="162" r="4" fill="none" stroke="#D97706" strokeWidth="2"/>
          </>
        ) : (
          <>
            <line x1="65" y1="175" x2="85" y2="175" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
            <line x1="85" y1="175" x2="105" y2="175" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
          </>
        )}
        <line x1="40" y1="178" x2="160" y2="178" stroke="#E5E7EB" strokeWidth="2"/>
      </svg>
    );
  },
  singleLegBalance: ({ frame }) => {
    const wobble = frame % 2 === 0 ? 0 : 3;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <line x1="30" y1="178" x2="170" y2="178" stroke="#E5E7EB" strokeWidth="2"/>
        <circle cx={100 + wobble} cy="40" r="16" fill="none" stroke="#059669" strokeWidth="3"/>
        <line x1={100 + wobble} y1="56" x2={100 + wobble} y2="120" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1={100 + wobble} y1="80" x2={70 + wobble} y2="100" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1={100 + wobble} y1="80" x2={130 + wobble} y2="100" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Standing leg */}
        <line x1={100 + wobble} y1="120" x2={95 + wobble} y2="178" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Raised leg */}
        <line x1={100 + wobble} y1="120" x2={130 + wobble} y2="145" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Balance indicator */}
        <ellipse cx={95 + wobble} cy="178" rx="10" ry="3" fill="none" stroke="#D97706" strokeWidth="1.5" opacity="0.5"/>
      </svg>
    );
  },
  ankleAlphabet: ({ frame }) => {
    const letters = ['A', 'B', 'C', 'D'];
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Seated */}
        <rect x="30" y="100" width="60" height="50" rx="5" fill="none" stroke="#E5E7EB" strokeWidth="2"/>
        <circle cx="70" cy="60" r="14" fill="none" stroke="#059669" strokeWidth="3"/>
        <line x1="70" y1="74" x2="70" y2="110" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Extended leg */}
        <line x1="70" y1="110" x2="70" y2="150" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        <line x1="70" y1="150" x2="150" y2="150" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Foot with toe pointer */}
        <circle cx="155" cy="150" r="5" fill="#D97706" opacity="0.8"/>
        {/* Letter being drawn */}
        <text x="155" y="130" textAnchor="middle" fill="#D97706" fontSize="24" fontWeight="bold" fontFamily="var(--font-display)">
          {letters[frame % letters.length]}
        </text>
        {/* Trace circle */}
        <circle cx="155" cy="150" r="20" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="3,3" opacity="0.3"/>
      </svg>
    );
  },
  threadNeedle: ({ frame }) => {
    const thread = frame % 2 !== 0;
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <line x1="20" y1="150" x2="180" y2="150" stroke="#E5E7EB" strokeWidth="2"/>
        <circle cx={thread ? 85 : 120} cy={thread ? 115 : 80} r="14" fill="none" stroke="#059669" strokeWidth="3"/>
        <line x1={thread ? 95 : 115} y1={thread ? 120 : 90} x2="90" y2="110" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Support arm */}
        <line x1="100" y1="105" x2="110" y2="150" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Threading arm */}
        <line x1="90" y1="105" x2={thread ? "55" : "130"} y2={thread ? "125" : "65"} stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {/* Knees */}
        <line x1="85" y1="115" x2="75" y2="150" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
        {thread && <path d="M60,120 Q50,130 55,125" fill="none" stroke="#D97706" strokeWidth="2" strokeDasharray="3,3"/>}
      </svg>
    );
  },
};

export default function ExerciseAnimation({ type }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => f + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const AnimComponent = animations[type] || animations.chinTuck;

  return (
    <div className="w-full aspect-square max-w-[280px] mx-auto bg-white rounded-2xl border border-[var(--color-border)] p-4 flex items-center justify-center">
      <AnimComponent frame={frame} />
    </div>
  );
}
