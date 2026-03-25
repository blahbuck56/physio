import { bodyRegionColors } from '../../data/exercises';

/*
 * Parameterized anatomical human figure SVG.
 * Renders a realistic-proportion human body with:
 *   - Named muscle-region paths that can be highlighted
 *   - Multiple base poses (standing, seated, supine, prone, quadruped, sidelying)
 *   - Movement arrows and annotations
 *   - Clean clinical aesthetic
 *
 * Props:
 *   pose: string — base pose key
 *   highlights: string[] — region IDs to highlight
 *   annotation: { label, direction } — movement cue overlay
 *   view: 'anterior' | 'posterior' | 'lateral' — viewing angle
 *   size: 'sm' | 'md' | 'lg' — controls rendered size
 *   className: string
 */

const regionPaths = {
  // Head & neck
  'head': 'M90,28 C90,14 102,4 115,4 C128,4 140,14 140,28 C140,42 128,50 115,50 C102,50 90,42 90,28Z',
  'neck': 'M105,50 L105,62 Q115,65 125,62 L125,50',
  'upper-trapezius': 'M85,62 Q100,55 105,62 L125,62 Q130,55 145,62 L145,72 Q115,68 85,72Z',

  // Shoulders & arms
  'deltoid-l': 'M75,72 Q70,72 65,80 Q62,90 68,100 L85,92 L85,72Z',
  'deltoid-r': 'M155,72 Q160,72 165,80 Q168,90 162,100 L145,92 L145,72Z',
  'upper-arm-l': 'M65,100 Q60,115 62,132 L78,132 Q82,115 78,100Z',
  'upper-arm-r': 'M165,100 Q170,115 168,132 L152,132 Q148,115 152,100Z',
  'forearm-l': 'M62,132 Q58,152 55,170 L72,172 Q75,152 78,132Z',
  'forearm-r': 'M168,132 Q172,152 175,170 L158,172 Q155,152 152,132Z',

  // Torso
  'pectorals': 'M85,72 L85,100 Q100,105 115,100 Q130,105 145,100 L145,72 Q130,68 115,72 Q100,68 85,72Z',
  'core': 'M88,100 L88,145 Q100,148 115,145 Q130,148 142,145 L142,100 Q130,105 115,100 Q100,105 88,100Z',
  'obliques': 'M85,100 L88,100 L88,145 L85,145Z M142,100 L145,100 L145,145 L142,145Z',

  // Back (posterior view)
  'upper-back': 'M88,72 L88,100 Q115,95 142,100 L142,72 Q115,68 88,72Z',
  'lower-back': 'M92,115 L92,145 Q115,148 138,145 L138,115 Q115,112 92,115Z',
  'rhomboids': 'M95,75 L95,95 Q115,90 135,95 L135,75 Q115,72 95,75Z',

  // Hip & glutes
  'gluteus-maximus': 'M88,145 Q85,155 88,168 Q100,175 115,172 Q130,175 142,168 Q145,155 142,145 Q130,148 115,145 Q100,148 88,145Z',
  'hip-flexors': 'M92,140 L92,160 Q100,162 108,160 L108,140Z M122,140 L122,160 Q130,162 138,160 L138,140Z',

  // Legs
  'quadriceps': 'M88,168 Q85,195 88,225 L108,225 Q112,195 108,168Z M122,168 Q118,195 122,225 L142,225 Q145,195 142,168Z',
  'hamstrings': 'M90,168 Q87,195 90,225 L108,225 Q111,195 108,168Z M122,168 Q119,195 122,225 L140,225 Q143,195 140,168Z',
  'calves': 'M90,225 Q88,248 90,272 L106,272 Q108,248 106,225Z M124,225 Q122,248 124,272 L140,272 Q142,248 140,225Z',
  'ankle-stabilizers': 'M90,272 L90,282 L106,282 L106,272Z M124,272 L124,282 L140,282 L140,272Z',

  // Specific muscles
  'deep-cervical-flexors': 'M108,50 L108,62 L122,62 L122,50',
  'suboccipitals': 'M100,28 Q115,35 130,28',
  'levator-scapulae': 'M88,55 Q85,62 88,72 L95,72 Q92,62 95,55Z M135,55 Q138,62 142,72 L135,72 Q132,62 135,55Z',
  'scalenes': 'M102,50 L98,65 L108,65Z M128,50 L132,65 L122,65Z',
  'serratus-anterior': 'M85,85 L82,100 L88,100 L88,85Z M142,85 L145,100 L148,85Z',
  'rotator-cuff': 'M78,75 Q75,82 78,90 L85,88 Q82,82 85,75Z M152,75 Q155,82 152,90 L145,88 Q148,82 145,75Z',
  'erector-spinae': 'M100,72 L100,145 L108,145 L108,72Z M122,72 L122,145 L130,145 L130,72Z',
  'multifidus': 'M108,80 L108,140 L115,140 L115,80Z M115,80 L115,140 L122,140 L122,80Z',
  'transverse-abdominis': 'M88,105 L88,140 Q115,143 142,140 L142,105 Q115,108 88,105Z',
  'rectus-abdominis': 'M100,100 L100,145 Q115,148 130,145 L130,100 Q115,103 100,100Z',
  'gluteus-medius': 'M82,145 Q80,152 82,162 L95,162 Q97,152 95,145Z M135,145 Q133,152 135,162 L148,162 Q150,152 148,145Z',
  'gluteus-minimus': 'M85,148 Q84,155 86,160 L95,160 Q96,155 95,148Z M135,148 Q134,155 136,160 L145,160 Q146,155 145,148Z',
  'tibialis-anterior': 'M92,230 L92,268 L100,268 L100,230Z M130,230 L130,268 L138,268 L138,230Z',
  'peroneals': 'M100,230 L100,268 L106,268 L106,230Z M124,230 L124,268 L130,268 L130,230Z',
  'gastrocnemius': 'M90,225 Q88,242 90,260 L106,260 Q108,242 106,225Z M124,225 Q122,242 124,260 L140,260 Q142,242 140,225Z',
  'soleus': 'M92,255 Q91,262 92,270 L104,270 Q105,262 104,255Z M126,255 Q125,262 126,270 L138,270 Q139,262 138,255Z',
  'diaphragm': 'M92,95 Q115,90 138,95 Q115,100 92,95Z',
  'vmo': 'M98,210 Q95,218 98,225 L108,225 Q110,218 108,210Z M122,210 Q120,218 122,225 L132,225 Q134,218 132,210Z',
};

// Pose transforms — adjust body for different positions
const poseConfigs = {
  standing: { viewBox: '0 0 230 295', transform: '' },
  seated: { viewBox: '0 0 230 240', transform: '' },
  supine: { viewBox: '0 0 320 160', transform: 'rotate(-90 160 160) translate(30, -40)' },
  prone: { viewBox: '0 0 320 160', transform: 'rotate(90 160 80) translate(-30, 30) scale(1, -1) translate(0, -160)' },
  quadruped: { viewBox: '0 0 300 200', transform: '' },
  sidelying: { viewBox: '0 0 320 180', transform: '' },
  lateral: { viewBox: '0 0 230 295', transform: '' },
};

function StandingFigure({ highlights = [], highlightColor = '#059669' }) {
  return (
    <g>
      {/* Base body outline */}
      <g fill="#F5F0EB" stroke="#8B7E74" strokeWidth="1.5" strokeLinejoin="round">
        {/* Head */}
        <ellipse cx="115" cy="26" rx="22" ry="24" />
        {/* Neck */}
        <rect x="106" y="48" width="18" height="16" rx="4" />
        {/* Torso */}
        <path d="M80,64 Q80,62 85,62 L145,62 Q150,62 150,64 L150,72 Q155,72 160,78 Q168,88 162,102 L152,102 Q148,115 152,132 L168,132 Q172,150 175,172 L158,174 Q155,155 152,138 L148,138 Q145,135 142,132 L142,148 Q145,158 142,170 Q140,185 142,225 Q144,248 142,272 L142,285 L90,285 L90,272 Q88,248 90,225 Q92,185 88,170 Q85,158 88,148 L88,132 Q85,135 82,138 L78,138 Q75,155 72,174 L55,172 Q58,150 62,132 L78,132 Q82,115 78,102 L68,102 Q62,88 70,78 Q75,72 80,72Z" />
      </g>

      {/* Muscle region highlights */}
      {highlights.map(regionId => {
        const path = regionPaths[regionId];
        if (!path) return null;
        return (
          <path
            key={regionId}
            d={path}
            fill={highlightColor}
            fillOpacity="0.25"
            stroke={highlightColor}
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
        );
      })}

      {/* Anatomical detail lines */}
      <g fill="none" stroke="#C4B5A5" strokeWidth="0.7" opacity="0.5">
        {/* Chest definition */}
        <path d="M95,75 Q115,82 135,75" />
        {/* Ab lines */}
        <line x1="115" y1="100" x2="115" y2="140" />
        <path d="M98,108 Q115,110 132,108" />
        <path d="M98,120 Q115,122 132,120" />
        <path d="M100,132 Q115,134 130,132" />
        {/* Knee definition */}
        <ellipse cx="98" cy="225" rx="10" ry="6" />
        <ellipse cx="132" cy="225" rx="10" ry="6" />
        {/* Shoulder contour */}
        <path d="M80,72 Q72,75 68,85" />
        <path d="M150,72 Q158,75 162,85" />
      </g>

      {/* Face - minimal, clinical */}
      <g fill="none" stroke="#8B7E74" strokeWidth="1" strokeLinecap="round">
        <circle cx="107" cy="22" r="2.5" fill="#8B7E74" opacity="0.3" />
        <circle cx="123" cy="22" r="2.5" fill="#8B7E74" opacity="0.3" />
        <path d="M110,34 Q115,37 120,34" />
      </g>
    </g>
  );
}

function QuadrupedFigure({ highlights = [], highlightColor = '#059669' }) {
  return (
    <g>
      <g fill="#F5F0EB" stroke="#8B7E74" strokeWidth="1.5" strokeLinejoin="round">
        {/* Head */}
        <ellipse cx="240" cy="55" rx="18" ry="20" />
        {/* Neck angled */}
        <path d="M225,65 L210,80 L220,85 L235,70Z" />
        {/* Torso horizontal */}
        <path d="M80,80 L210,80 Q215,80 215,85 L215,110 Q215,115 210,115 L80,115 Q75,115 75,110 L75,85 Q75,80 80,80Z" />
        {/* Front arms (straight down) */}
        <path d="M195,115 L195,170 L210,170 L210,115Z" />
        <path d="M175,115 L175,170 L190,170 L190,115Z" />
        {/* Back legs (straight down) */}
        <path d="M80,115 L80,170 L95,170 L95,115Z" />
        <path d="M100,115 L100,170 L115,170 L115,115Z" />
      </g>

      {/* Highlights */}
      {highlights.map(regionId => {
        // Map muscle regions to quadruped positions
        const quadMapping = {
          'core': 'M85,85 L205,85 L205,110 L85,110Z',
          'transverse-abdominis': 'M85,88 L205,88 L205,108 L85,108Z',
          'erector-spinae': 'M85,80 L205,80 L205,90 L85,90Z',
          'multifidus': 'M100,80 L190,80 L190,88 L100,88Z',
          'gluteus-maximus': 'M75,100 L120,100 L120,118 L75,118Z',
          'rectus-abdominis': 'M100,90 L190,90 L190,108 L100,108Z',
        };
        const path = quadMapping[regionId];
        if (!path) return null;
        return (
          <path key={regionId} d={path} fill={highlightColor} fillOpacity="0.25"
            stroke={highlightColor} strokeWidth="1.5" strokeOpacity="0.6" />
        );
      })}

      {/* Floor */}
      <line x1="40" y1="172" x2="260" y2="172" stroke="#D4C8BC" strokeWidth="1.5" strokeDasharray="4,4" />

      {/* Face */}
      <g fill="none" stroke="#8B7E74" strokeWidth="1" strokeLinecap="round">
        <circle cx="234" cy="51" r="2" fill="#8B7E74" opacity="0.3" />
        <circle cx="246" cy="51" r="2" fill="#8B7E74" opacity="0.3" />
        <path d="M236,59 Q240,61 244,59" />
      </g>
    </g>
  );
}

function SupineFigure({ highlights = [], highlightColor = '#059669' }) {
  return (
    <g>
      <g fill="#F5F0EB" stroke="#8B7E74" strokeWidth="1.5" strokeLinejoin="round">
        {/* Head */}
        <ellipse cx="48" cy="72" rx="20" ry="22" />
        {/* Neck */}
        <rect x="66" y="64" width="14" height="16" rx="3" />
        {/* Torso lying flat */}
        <path d="M80,55 L220,55 Q225,55 225,60 L225,85 Q225,90 220,90 L80,90 Q75,90 75,85 L75,60 Q75,55 80,55Z" />
        {/* Arms at sides */}
        <path d="M82,50 L220,50 L220,55 L82,55Z" />
        <path d="M82,90 L220,90 L220,95 L82,95Z" />
        {/* Legs */}
        <path d="M220,55 L290,55 L290,72 L220,72Z" />
        <path d="M220,73 L290,73 L290,90 L220,90Z" />
      </g>

      {highlights.map(regionId => {
        const supineMapping = {
          'core': 'M85,58 L215,58 L215,88 L85,88Z',
          'transverse-abdominis': 'M90,60 L210,60 L210,85 L90,85Z',
          'rectus-abdominis': 'M100,60 L190,60 L190,85 L100,85Z',
          'gluteus-maximus': 'M210,58 L230,58 L230,88 L210,88Z',
          'hamstrings': 'M240,55 L285,55 L285,90 L240,90Z',
          'quadriceps': 'M240,55 L285,55 L285,90 L240,90Z',
          'diaphragm': 'M100,65 Q150,60 200,65 Q150,70 100,65Z',
          'hip-flexors': 'M210,60 L230,60 L230,85 L210,85Z',
        };
        const path = supineMapping[regionId];
        if (!path) return null;
        return (
          <path key={regionId} d={path} fill={highlightColor} fillOpacity="0.25"
            stroke={highlightColor} strokeWidth="1.5" strokeOpacity="0.6" />
        );
      })}

      {/* Floor */}
      <line x1="20" y1="97" x2="300" y2="97" stroke="#D4C8BC" strokeWidth="1.5" strokeDasharray="4,4" />
    </g>
  );
}

function SidelyingFigure({ highlights = [], highlightColor = '#059669' }) {
  return (
    <g>
      <g fill="#F5F0EB" stroke="#8B7E74" strokeWidth="1.5" strokeLinejoin="round">
        {/* Head */}
        <ellipse cx="50" cy="65" rx="18" ry="20" />
        {/* Torso on side */}
        <path d="M68,55 L180,52 Q185,52 185,57 L185,82 Q185,87 180,87 L68,84 Q63,84 63,79 L63,60 Q63,55 68,55Z" />
        {/* Top arm */}
        <path d="M85,50 L160,48 L160,52 L85,52Z" />
        {/* Bottom arm */}
        <path d="M85,87 L160,87 L160,92 L85,92Z" />
        {/* Top leg (bent) */}
        <path d="M180,52 L235,50 Q240,55 235,65 L190,68 L180,60Z" />
        {/* Bottom leg */}
        <path d="M180,78 L260,82 L260,90 L180,87Z" />
      </g>

      {highlights.map(regionId => {
        const sideMapping = {
          'gluteus-medius': 'M175,52 L195,52 L195,72 L175,72Z',
          'gluteus-minimus': 'M178,55 L192,55 L192,68 L178,68Z',
          'gluteus-maximus': 'M170,55 L185,55 L185,85 L170,85Z',
          'hip-flexors': 'M165,58 L180,58 L180,80 L165,80Z',
        };
        const path = sideMapping[regionId];
        if (!path) return null;
        return (
          <path key={regionId} d={path} fill={highlightColor} fillOpacity="0.25"
            stroke={highlightColor} strokeWidth="1.5" strokeOpacity="0.6" />
        );
      })}

      {/* Floor */}
      <line x1="20" y1="95" x2="280" y2="95" stroke="#D4C8BC" strokeWidth="1.5" strokeDasharray="4,4" />
    </g>
  );
}

function ProneFigure({ highlights = [], highlightColor = '#059669' }) {
  return (
    <g>
      <g fill="#F5F0EB" stroke="#8B7E74" strokeWidth="1.5" strokeLinejoin="round">
        {/* Head (face down or turned) */}
        <ellipse cx="48" cy="72" rx="18" ry="20" />
        {/* Torso face-down */}
        <path d="M66,55 L230,55 Q235,55 235,60 L235,85 Q235,90 230,90 L66,90 Q61,90 61,85 L61,60 Q61,55 66,55Z" />
        {/* Arms at sides / under shoulders */}
        <path d="M80,90 L100,90 L100,110 L80,110Z" />
        <path d="M110,90 L130,90 L130,110 L110,110Z" />
        {/* Legs */}
        <path d="M230,55 L290,55 L290,72 L230,72Z" />
        <path d="M230,73 L290,73 L290,90 L230,90Z" />
      </g>

      {highlights.map(regionId => {
        const proneMapping = {
          'erector-spinae': 'M100,58 L200,58 L200,68 L100,68Z',
          'lower-back': 'M140,62 L220,62 L220,85 L140,85Z',
          'gluteus-maximus': 'M220,58 L240,58 L240,88 L220,88Z',
        };
        const path = proneMapping[regionId];
        if (!path) return null;
        return (
          <path key={regionId} d={path} fill={highlightColor} fillOpacity="0.25"
            stroke={highlightColor} strokeWidth="1.5" strokeOpacity="0.6" />
        );
      })}

      {/* Floor */}
      <line x1="20" y1="112" x2="300" y2="112" stroke="#D4C8BC" strokeWidth="1.5" strokeDasharray="4,4" />
    </g>
  );
}

export default function AnatomicalFigure({
  pose = 'standing',
  highlights = [],
  bodyRegion,
  className = '',
}) {
  const highlightColor = bodyRegion ? (bodyRegionColors[bodyRegion]?.accent || '#059669') : '#059669';

  const figureMap = {
    standing: { component: StandingFigure, viewBox: '0 0 230 295' },
    lateral: { component: StandingFigure, viewBox: '0 0 230 295' },
    seated: { component: StandingFigure, viewBox: '0 0 230 240' },
    quadruped: { component: QuadrupedFigure, viewBox: '0 0 300 185' },
    supine: { component: SupineFigure, viewBox: '0 0 310 110' },
    prone: { component: ProneFigure, viewBox: '0 0 310 125' },
    sidelying: { component: SidelyingFigure, viewBox: '0 0 290 105' },
  };

  const config = figureMap[pose] || figureMap.standing;
  const FigureComponent = config.component;

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={config.viewBox}
        className="w-full h-full"
        role="img"
        aria-label="Exercise demonstration figure"
      >
        {/* Subtle gradient background */}
        <defs>
          <linearGradient id="figBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAFAF8" />
            <stop offset="100%" stopColor="#F0EDE8" />
          </linearGradient>
        </defs>

        <FigureComponent
          highlights={highlights}
          highlightColor={highlightColor}
        />
      </svg>
    </div>
  );
}
