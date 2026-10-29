import type { LucideIcon } from 'lucide-react';
import { Cpu, Gauge, Layers, MessageSquare, Swords, Volume2, Workflow } from 'lucide-react';

// ---------------------------------------------------------------------------
// ALL PROJECT CONTENT LIVES HERE.
// - Projects WITH a `caseStudy` get their own page at /projects/<slug>
//   and their card links there.
// - Projects WITHOUT a `caseStudy` open the pop-up instead.
// - Order in this array = order on the site.
// - Images go in the /public folder; reference them as '/your-file.jpg'.
//   Leave `image` out and the card shows a clean gradient + icon instead.
// ---------------------------------------------------------------------------

// The filter buttons, in this order. A category only appears on the site
// once at least one project uses it.
export const CATEGORIES = ['Robotics', 'Mechatronics', 'Assistive Tech', 'Design', 'Miscellaneous'] as const;
export type Category = (typeof CATEGORIES)[number];

export type LinkKind ='github' | 'demo' | 'sketch' | 'diagram' | 'doc' | 'link';

export interface ProjectLink {
  label: string;
  href: string;
  kind: LinkKind;
}

export interface CaseStudy {
  role: string;
  timeline: string;
  team?: string;
  status?: string;
  /** Big numbers shown in a row near the top of the page. */
  metrics?: { value: string; label: string }[];
  problem: string;
  sections: { heading: string; body?: string; bullets?: string[] }[];
  /** Extra photos: CAD renders, prototypes, testing, etc. */
  gallery?: { src: string; caption: string }[];
}

export interface Project {
  slug: string;
  title: string;
  /** One or two sentences shown on the card. */
  summary: string;
  /** Must be one of CATEGORIES above. */
  category: Category;
  date: string;
  icon: LucideIcon;
  image?: string;
  tags: string[];
  /** Bullet points shown in the pop-up (projects without a case study). */
  highlights: string[];
  links?: ProjectLink[];
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  // ======================= CASE STUDY PAGES =======================
  {
    slug: 'blade-coater',
    title: 'Automated Doctor-Blade Coating System',
    summary:
      'A single instrument that automates thin-film fabrication for soft actuators, combining a precision motion stage, a controlled thermal zone, and UV curing.',
    category: 'Mechatronics',
    date: '2025 – Present',
    icon: Layers,
    // image: '/blade-coater.jpg',   // ← add a photo or CAD render
    tags: ['Mechanical Design', 'Motion Control', 'Thermal Control', 'UV Curing', 'Fixturing', 'CAD'],
    highlights: [],
    caseStudy: {
      role: 'Undergraduate Researcher, Robotic Matter Lab',
      timeline: 'Oct 2025 – Present',
      status: 'In development',
      metrics: [
        { value: '30–90°', label: 'Blade angle range' },
        { value: '25–100 µm', label: 'Gap control' },
        { value: '5–100 mm/s', label: 'Deposition speed' },
      ],
      problem:
        'The lab fabricates thin-film soft actuators with a manual coating process. To fabricate at scale, coating, heating, and curing need to happen in one repeatable, automated instrument.',
      sections: [
        {
          heading: 'The instrument',
          body: 'I am designing and building a custom doctor-blade coater that brings the full process into one machine:',
          bullets: [
            'Precision motion stage that drives the blade across the substrate at a controlled speed',
            'Controlled thermal zone for the film during deposition',
            'Integrated UV-curing stage',
          ],
        },
        {
          heading: 'Defining the process envelope',
          body: 'I specified the mechanical operating range the machine has to cover: a 30–90° blade angle, 25–100 µm gap control, and 5–100 mm/s deposition speed. Every mechanism in the design is sized around holding those values.',
        },
        {
          heading: 'Mechanical design',
          bullets: [
            'Designed the fixturing and adjustment mechanisms that hold the gap and angle tolerances repeatably',
            // ← add: support-arm design, materials, how you adjust/lock the gap, etc.
          ],
        },
        // ← add a "Results" section once you have test data
        //   (coating time before/after, thickness repeatability, films run).
      ],
      // gallery: [{ src: '/blade-coater-cad.jpg', caption: 'CAD of the motion stage' }],
    },
  },
  {
    slug: 'accessible-ph-meter',
    title: 'Accessible pH Meter',
    summary:
      'A patented, low-cost pH meter that speaks its readings aloud, so visually impaired chemists can work in the lab independently.',
    category: 'Assistive Tech',
    date: '2020 – 2022',
    icon: Volume2,
    image: '/phmeter.jpg',
    tags: ['Arduino C/C++', 'Custom PCB', 'Analog Signal Conditioning', 'pH Electrode (BNC)', 'DFPlayer Mini', 'LCD 16x2', 'LiPo Power', '3D-Printed Enclosure'],
    highlights: [],
    links: [
      { label: 'View Code', href: 'https://github.com/Letiiciadiniz/pHmeter.git', kind: 'github' },
      { label: 'Watch Demo', href: 'https://youtu.be/KwcFQ8zasOc?si=c8AuHtFSur_hcx5d&t=355', kind: 'demo' },
    ],
    caseStudy: {
      role: 'Inventor & hardware/firmware developer',
      timeline: 'Apr 2020 – Dec 2022',
      team: 'Federal Institute of Paraíba (IFPB)',
      status: 'Patented (utility model)',
      metrics: [
        { value: 'Patented', label: 'Utility model' },
        { value: 'Voice + LCD', label: 'Dual readout' },
        { value: 'pH 4 · 7 · 10', label: 'Validated against a commercial bench meter' },
      ],
      problem:
        'Standard pH meters only show readings on a screen, which keeps visually impaired students and chemists from running measurements on their own.',
      sections: [
        {
          heading: 'What I built',
          body: 'A self-contained, portable device that shows the pH on an LCD and announces it by voice.',
          bullets: [
            'Custom PCB with analog signal conditioning for a BNC pH electrode',
            'Embedded firmware on Arduino; audio readout through a DFPlayer Mini and speaker',
            'Guided start-up and calibration prompts, with simple buttons for calibrating at pH 4 and pH 7',
            '3D-printed enclosure and LiPo battery power, so it is fully portable and low-cost',
          ],
        },
        {
          heading: 'Validation',
          body: 'I compared readings against a commercial bench pH meter using buffer solutions (pH 4, 7, and 10) and real samples: bicarbonate solution, bleach, vinegar, and wine.',
        },
        {
          heading: 'Impact',
          body: 'The device was patented as a utility model. It was designed for teaching and analytical labs, so users with low or no vision can operate it independently.',
        },
      ],
    },
  },
  {
    slug: 'combat-robotics',
    title: 'Combat Robotics: 3 lb & 30 lb Robots',
    summary:
      'Co-leading Northwestern’s combat robotics team: designing spinning weapons, impact-rated mounts, and drive electronics for competition robots.',
    category: 'Robotics',
    date: '2025 – Present',
    icon: Swords,
    // image: '/combat-robot.jpg',   // ← add a photo of the robot
    tags: ['CAD', 'Drivetrain Design', 'Weapon Systems', 'Motor Drivers & ESCs', 'Power Distribution', 'RC Control', '3D Printing', 'Machining'],
    highlights: [],
    caseStudy: {
      role: 'Combat Robotics Co-Leader, NU Robotics Club',
      timeline: 'Jan 2025 – Present',
      team: '8-person subteam',
      status: 'Ongoing',
      metrics: [
        { value: '~100 MPH', label: 'Weapon tip speed (3 lb robot)' },
        { value: '3 lb & 30 lb', label: 'Weight classes' },
        { value: '8', label: 'Subteam members co-led' },
      ],
      problem:
        'Combat robots must survive repeated high-energy impacts while staying within strict weight limits. Every part, from the weapon to the motor mounts, has to be designed for abuse.',
      sections: [
        {
          heading: 'Scratch-built 3 lb robot',
          body: 'I designed the robot end to end in CAD: chassis, drivetrain, and a steel spinning weapon that reaches about 100 MPH at the tip.',
        },
        {
          heading: 'Kit robot weapon upgrade',
          body: 'I upgraded a 3 lb kit robot with a custom saw weapon. I redesigned the blade geometry and the impact-bearing mounts, then manufactured them with both additive and subtractive processes to improve reliability under repeated hits.',
        },
        {
          heading: '30 lb robot electronics',
          bullets: [
            'Motor driver and ESC selection',
            'Power distribution design',
            'Custom radio-control channel mapping',
          ],
        },
        {
          heading: 'Leadership',
          body: 'I co-lead an 8-person subteam and manage the budget for robots in both weight classes.',
        },
        // ← add competition results here when you have them
      ],
    },
  },
  {
    slug: 'powereg',
    title: 'PoweReg: Automated Oxygen Regulator',
    summary:
      'A hands-free device that sets up oxygen tanks for Lurie Children’s Hospital, cutting a manual task of over a minute down to 34 seconds.',
    category: 'Assistive Tech',
    date: 'Fall 2024',
    icon: Gauge,
    // image: '/powereg.jpg',   // ← add a photo
    tags: ['Product Design', 'DFM', 'Motor Actuation', '3D Printing', 'Destructive Testing', 'Team Leadership'],
    highlights: [],
    caseStudy: {
      role: 'Team Lead',
      timeline: 'Sep – Dec 2024',
      team: '4-person team · Client: Lurie Children’s Hospital',
      status: 'Completed',
      metrics: [
        { value: '34 s', label: 'Hands-free setup (vs. 1+ min by hand)' },
        { value: '$80.67', label: 'Bill of materials' },
        { value: '4', label: 'Team members led' },
      ],
      problem:
        'Setting up an oxygen tank regulator is a manual process that users described as taking over a minute.',
      sections: [
        {
          heading: 'The solution',
          body: 'I led a 4-person team building an automated device that performs the setup hands-free in 34 seconds, with an $80.67 bill of materials.',
        },
        {
          heading: 'Testing and iteration',
          body: 'We refined the materials and design for manufacturing through destructive bench testing:',
          bullets: [
            'The 3D-printed valve cylinder chipped under motor load, so we raised the infill from 15% to 50%',
            'A PLA pin holder deflected under torque, so we replaced it with aluminum',
          ],
        },
      ],
    },
  },

  // ========================= POP-UP PROJECTS =========================
  {
    slug: 'bat-companion',
    title: 'Interactive Bat Companion',
    summary:
      'A cute-but-spooky bat that wakes up when you approach and opens its wings and screeches when you pet it.',
    category: 'Design',
    date: '2025',
    icon: Cpu,
    image: '/bat.jpg',
    tags: ['Raspberry Pi Pico', 'CircuitPython', 'HC-SR04 Ultrasonic', 'MPR121 Capacitive Touch', 'Micro Servos', 'DFPlayer Mini', 'LED Eyes', '3D-Printed Enclosure'],
    highlights: [
      'Wakes up when someone approaches, using an ultrasonic distance sensor; LED eyes turn on as the first feedback cue',
      'Turns off automatically when the person walks away',
      'Capacitive touch on the head (MPR121) detects petting',
      'When petted, two synchronized servos open the wings and a DFPlayer Mini plays a bat screech',
      'State machine in CircuitPython: idle → alert → pet response → reset',
      'Enclosure and internal layout designed from physical sketches and iterative measurements',
    ],
    links: [
      { label: 'View Code', href: 'https://github.com/Letiiciadiniz/DSGN_297.git', kind: 'github' },
      { label: 'Demo Video', href: 'https://drive.google.com/file/d/18OJK1dtEcGp1-RSvWvYhDaTWRRTL0pOc/view?usp=sharing', kind: 'demo' },
      { label: 'Sketch', href: 'https://drive.google.com/file/d/120EglYuwNbtym248d0ovIh6n2iNVg8NM/view?usp=sharing', kind: 'sketch' },
      { label: 'Diagram', href: 'https://drive.google.com/file/d/1iKPkKLcLsjNN3bOZ3-1tRqdlNg4hbl9F/view?usp=sharing', kind: 'diagram' },
    ],
  },
  {
    slug: 'als-communicator',
    title: 'ALS Vocal Communicator',
    summary:
      'An Arduino-based device that helps patients with ALS communicate, using sensor-based interaction and real-time signal processing.',
    category: 'Assistive Tech',
    date: '2021',
    icon: MessageSquare,
    tags: ['Arduino', 'Sensor Interfacing', 'Real-Time Signal Processing'],
    highlights: [
      'Built a vocal communicator to restore speech capability for patients with ALS',
      'Integrated sensor-based interaction with real-time signal processing',
      'Presented to 700+ attendees',
    ],
  },
  {
    slug: 'sara',
    title: 'SARA: Academic Workflow Automation',
    summary:
      'A patented automation platform for repetitive academic administrative tasks, making them about 5× faster.',
    category: 'Miscellaneous',
    date: '2021',
    icon: Workflow,
    tags: ['Backend Development', 'System Integration', 'Process Automation'],
    highlights: [
      'Co-developed and patented at the Federal Institute of Paraíba',
      'Cut task completion time about 5× (≈80%) through system integration and process redesign',
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
