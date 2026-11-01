import type { LucideIcon } from 'lucide-react';
import { CircuitBoard, Cog, Cpu, Gauge, Layers, MessageSquare, Swords, Volume2, Workflow } from 'lucide-react';

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
  sections: {
    heading: string;
    body?: string;
    bullets?: string[];
    /** Figures shown at the end of the section. */
    figures?: { src: string; caption: string }[];
    /** Show the figures in two columns (good for before/after pairs). */
    sideBySide?: boolean;
    /** A simple data table shown after the text. */
    table?: { headers: string[]; rows: string[][]; note?: string };
  }[];
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

const allProjects: Project[] = [
  // ======================= CASE STUDY PAGES =======================
  {
    slug: 'blade-coater',
    title: 'Blade-Coating Platform for LCE Artificial Muscles',
    summary:
      'A custom, programmable blade coater that aligns liquid crystal elastomer films for soft robotic actuators, combining motorized blade motion, a temperature-controlled substrate, and UV curing in one instrument.',
    category: 'Mechatronics',
    date: '2025 – Present',
    icon: Layers,
    image: '/blade-coater-current-build.jpg',
    tags: ['Mechanical Design', 'CAD', 'Raspberry Pi Pico', 'Motion Control', 'PID Temperature Control', 'UV Curing', 'Machining', 'Soft Robotics'],
    highlights: [],
    caseStudy: {
      role: 'Undergraduate Researcher, Robotic Matter Lab',
      timeline: 'Oct 2025 – Present',
      team: 'Robotic Matter Lab, Northwestern University',
      status: 'In development · grant-funded',
      metrics: [
        { value: '25–100 µm', label: 'Adjustable blade gap (film thickness)' },
        { value: '5–100 mm/s', label: 'Coating speed' },
        { value: '−50 to 100 °C', label: 'Substrate temperature range' },
      ],
      problem:
        'Liquid crystal elastomers (LCEs) are rubbery materials that contract like muscle when heated, which makes them promising for soft robots. But they only actuate well when their molecules are aligned. Blade coating creates that alignment through shear, yet commercial coaters cost over $5,000 and do not let researchers freely vary the parameters that control it. The lab had no coater at all.',
      sections: [
        {
          heading: 'Why blade coating',
          body: 'As a blade sweeps a liquid precursor across a substrate, the motion shears the solution. That shear lines up the rod-shaped liquid crystal molecules (mesogens) along the coating direction, and the gap between blade and substrate sets the film thickness. Controlling speed, gap, angle, and temperature precisely is what makes the alignment controllable and repeatable.',
          figures: [
            { src: '/blade-coater-shear.jpg', caption: 'The blade spreads the solution across a glass substrate on a heated base; the gap sets film thickness.' },
            { src: '/blade-coater-alignment.jpg', caption: 'Before shearing, mesogens point in random directions. After the blade passes, they line up along the coating direction.' },
          ],
        },
        {
          heading: 'Defining the requirements',
          body: 'I started by turning the research goals into measurable machine requirements, using the design process from my DSGN 106 course:',
          bullets: [
            'Blade travel at 5–100 mm/s',
            'Blade gap adjustable from 25 to 100 µm',
            'Blade angle adjustable from 90° down to 30–45°',
            'Heated and cooled substrate from −50 to 100 °C',
            'Samples of at least 2 × 3 in',
            'Integrated UV curing to lock in the aligned structure',
          ],
        },
        {
          heading: 'System architecture',
          bullets: [
            'Motion: a motorized linear slide table drives the blade across the substrate',
            'Film thickness: micrometer-based height adjustment sets the blade gap',
            'Blade angle: an adjustable flip platform tilts the blade',
            'Temperature: a heated aluminum base regulated by a dedicated PID temperature controller',
            'Control: a Raspberry Pi Pico sequences motion, heating (through a solid-state relay), and UV curing, with limit switches for safe travel',
          ],
          figures: [
            { src: '/blade-coater-cad.jpg', caption: 'CAD of the blade assembly: twin micrometers set the gap, and the bracket mounts to the slide table.' },
          ],
        },
        {
          heading: 'Design and fabrication',
          body: 'I created the CAD model and bill of materials, built a 3D-printed prototype to test the layout, and then moved on to the full build. I am now designing the enclosure. Materials were chosen for each job:',
          bullets: [
            'Machined aluminum for the heating base and blade/micrometer holders, for thermal conductivity and stiffness',
            'Acrylic for the flip platform, which is light and easy to machine',
            '3D-printed PLA for the electronics enclosure',
            'Parts machined at Northwestern’s Segal Prototyping & Fabrication Lab',
          ],
          figures: [
            { src: '/blade-coater-prototype.jpg', caption: 'First 3D-printed prototype (V1): slide table, micrometer blade holder, and Raspberry Pi Pico.' },
            { src: '/blade-coater-concept.jpg', caption: 'Concept sketch of the finished instrument with its enclosure, temperature readout, UV button, and speed menu.' },
          ],
        },
        {
          heading: 'Validation plan',
          body: 'The machine is validated in two stages:',
          bullets: [
            'Model material: coating silicone elastomer to check film uniformity and blade motion consistency, using microscopy, thermal imaging, and video to measure thickness, temperature, and speed',
            'LCE films: varying blade speed, gap, angle, and temperature, then measuring alignment with polarized optical microscopy and testing how the films actuate when heated',
          ],
          // ← once you have results, rename this "Results" and add your numbers
          //   (thickness uniformity, alignment quality, actuation strain, etc.)
        },
        {
          heading: 'Impact',
          body: 'The platform gives the Robotic Matter Lab its first blade-coating capability and a flexible tool for studying how fabrication conditions shape molecular alignment and, in turn, how well soft actuators perform.',
        },
      ],
    },
  },
  {
    slug: 'accessible-ph-meter',
    title: 'Accessible pH Meter for Blind and Low-Vision Students',
    summary:
      'A voice-guided pH meter, published as a utility model patent in Brazil, that speaks every reading aloud. It measures within 0.06 pH of a commercial bench meter at about a tenth of the cost.',
    category: 'Assistive Tech',
    date: '2020 – 2022',
    icon: Volume2,
    image: '/ph-meter-v2.jpg',
    tags: ['Arduino (C/C++)', 'Custom PCB (Eagle)', 'Analog Sensor Interfacing', 'Two-Point Calibration', 'DFPlayer Mini Audio', 'I²C LCD', '3D-Printed Enclosure', 'Accessible Design'],
    highlights: [],
    links: [
      { label: 'View Code', href: 'https://github.com/Letiiciadiniz/pHmeter.git', kind: 'github' },
      { label: 'Watch Demo', href: 'https://youtu.be/KwcFQ8zasOc?si=c8AuHtFSur_hcx5d&t=355', kind: 'demo' },
      { label: 'Read the Patent (Portuguese)', href: '/files/ph-meter-patent.pdf', kind: 'doc' },
    ],
    caseStudy: {
      role: 'Co-inventor · hardware & firmware',
      timeline: 'Apr 2020 – Dec 2022',
      team: '4 student researchers, 2 faculty advisors · IFPB',
      status: 'Patent published · BR 20 2021 017789-1',
      metrics: [
        { value: '±0.06 pH', label: 'Agreement with a commercial bench meter on calibration buffers' },
        { value: '~10× cheaper', label: 'Than a commercial bench meter (R$296 vs. ~R$3,000)' },
        { value: '50% smaller', label: 'Second version, after a custom PCB replaced the breadboard' },
      ],
      problem:
        'Chemistry labs depend on reading instruments by sight, so blind and low-vision students are often left out of hands-on experiments. A pH meter shows its result only on a screen. Earlier accessible designs were imprecise or played musical tones that users struggled to translate into pH values, and commercial bench meters cost around R$3,000, far beyond what public schools in Brazil can spend.',
      sections: [
        {
          heading: 'How it works',
          body: 'A glass pH electrode produces a small voltage that changes with acidity. The device turns that voltage into a pH value and reports it two ways: on an LCD for sighted users and out loud for everyone else.',
          bullets: [
            'Signal chain: pH electrode → BNC signal-conditioning module → Arduino analog input',
            'Firmware converts the voltage to pH using the calibration below',
            'Output: a 16×2 I²C LCD, plus spoken numbers through a DFPlayer Mini audio module, LM386 amplifier, and speaker',
            'Powered by LiPo batteries inside a 3D-printed enclosure, so it is portable',
          ],
        },
        {
          heading: 'Firmware',
          bullets: [
            'Two-point calibration: the user dips the electrode in pH 4 and pH 7 buffer solutions, and the firmware computes the electrode’s voltage-per-pH slope, then maps every reading onto that line',
            'Noise reduction: each reading averages 2,000 analog samples, smoothing out electrode noise',
            'Spoken output: the reading is split into characters and each digit (and the decimal point) plays as a recorded voice clip, so 7.12 is spoken “seven, point, one, two”',
            'Voice-guided workflow: spoken prompts walk the user through start-up and calibration (“Initialization complete, please calibrate,” “pH calibrated”)',
            'Two-button interface operable by touch: green calibrates at pH 7, red at pH 4, and pressing both takes a reading',
          ],
        },
        {
          heading: 'Redesign: from breadboard to custom PCB',
          body: 'In the first version, components were wired to the Arduino through a breadboard and jumper cables. Loose contacts and interference made the pH readings drift. For the second version we designed our own Arduino shield in Eagle and fabricated the board in-house for R$6.25. Following judges’ feedback at Brazil’s National Robotics Showcase (MNR), we also switched from an Arduino Uno to a Nano. The new device is half the size of the first and about 9% cheaper to build.',
          sideBySide: true,
          figures: [
            { src: '/ph-meter-v1-interior.jpg', caption: 'Version 1: breadboard and jumper wires, prone to loose contacts.' },
            { src: '/ph-meter-v2-interior.jpg', caption: 'Version 2: Arduino Nano, audio module, and pH board on our custom PCB, in an enclosure half the size.' },
            { src: '/ph-meter-pcb-layout.jpg', caption: 'PCB layout designed in Eagle.' },
            { src: '/ph-meter-pcb.jpg', caption: 'The fabricated board before soldering. Cost to make: R$6.25.' },
          ],
        },
        {
          heading: 'Designed to be used by touch',
          bullets: [
            'Braille labels on the device so users can identify the buttons independently',
            'A 3D-printed sample holder, designed in SketchUp, keeps the buffer solutions, distilled water, and sample in fixed, braille-labeled positions',
            'The electrode slots into a dedicated opening on top, so it is always in the same place',
          ],
          figures: [
            { src: '/ph-meter-sample-holder.jpg', caption: 'Enclosure with the sample holder for buffer solutions, rinse water, and the sample.' },
          ],
        },
        {
          heading: 'Validation',
          body: 'We measured buffer solutions and everyday liquids three times each, side by side with a commercial bench pH meter. Repeat readings on our device agreed within 0.02 pH. On the calibration buffers, it stayed within 0.06 pH of the commercial meter, and within 0.11 pH on every other sample.',
          table: {
            headers: ['Sample', 'Our device (avg. of 3)', 'Commercial meter (avg. of 3)', 'Difference'],
            rows: [
              ['pH 4 buffer', '4.06', '4.00', '0.06'],
              ['pH 7 buffer', '7.11', '7.14', '0.02'],
              ['pH 10 buffer', '10.35', '10.36', '0.01'],
              ['Baking soda solution', '8.14', '8.25', '0.11'],
              ['Bleach', '12.56', '12.54', '0.01'],
              ['Wine', '3.31', '3.37', '0.06'],
            ],
            note: 'Vinegar was also tested, but the commercial meter’s own readings were inconsistent (2.98, 2.98, 1.94), so it is left out of the comparison.',
          },
        },
        {
          heading: 'Recognition',
          bullets: [
            'Utility model patent filed with INPI, Brazil’s patent office (BR 20 2021 017789-1): filed September 2021, published March 2023',
            'Presented at Brazil’s National Robotics Showcase (MNR); the second version incorporated the judges’ feedback',
            'Developed through a funded research program at the Federal Institute of Paraíba (IFPB)',
          ],
        },
      ],
    },
  },
  {
    slug: 'clancy',
    title: 'Clancy: Scratch-Built 3 lb Horizontal Spinner',
    summary:
      'A combat robot I designed from a blank page in Onshape: aluminum-plate chassis, two-wheel drive, and a belt-driven steel weapon with about 100 MPH tip speed.',
    category: 'Robotics',
    date: '2025 – 2026',
    icon: Swords,
    image: '/clancy.jpg',
    tags: ['Onshape CAD', 'Mechanism Design', 'Belt Drive', 'Weapon Design', 'Drivetrain', '3D Printing', 'Machining', 'Combat Robotics'],
    highlights: [],
    links: [
      { label: 'Explore the CAD in Onshape', href: 'https://cad.onshape.com/documents/6b6ad9bc997673d01ca4a4b0/w/185b0e42ff930e6006393ca5/e/52909f58346d6af70aea2a75?renderMode=0&uiState=6ae6a478a539d40372a04be8', kind: 'link' },
    ],
    caseStudy: {
      role: 'Designer & builder',
      timeline: 'Sophomore year, 2025 – 2026',
      team: 'NU Robotics Club · Combat Robotics',
      status: 'Built',
      metrics: [
        { value: '~100 MPH', label: 'Weapon tip speed' },
        { value: '3 lb', label: 'Beetleweight class' },
        { value: 'From scratch', label: 'Every part designed in CAD' },
      ],
      problem:
        'In combat robotics, every gram counts and every part gets hit. A 3 lb robot has to pack a drivetrain, a weapon that can deliver a destructive hit, and the electronics into a frame that survives repeated impacts. After a year of modifying a kit robot, I wanted to design one entirely myself.',
      sections: [
        {
          heading: 'Design',
          body: 'I modeled the full robot in Onshape before cutting any material, using the assembly to check clearances, weapon reach, and weight.',
          bullets: [
            'Weapon: a horizontal steel bar spinner, driven by a belt and pulleys from a motor inside the chassis, reaching about 100 MPH at the tip',
            'Chassis: aluminum top and bottom plates sandwiching 3D-printed side walls, which keeps it stiff while saving weight',
            'Drivetrain: two-wheel drive with 3D-printed wheel hubs',
          ],
          figures: [
            { src: '/clancy-cad.jpg', caption: 'Onshape assembly: the weapon arm, belt pulley, and chassis plates.' },
          ],
        },
        // ← Add more detail here if you can: weapon motor, battery, weapon
        //   mass, how you calculated tip speed, and any competition results.
      ],
    },
  },
  {
    slug: 'serrinha',
    title: 'Serrinha: Custom Vertical Spinner',
    summary:
      'My first combat robot: I took a 3 lb kit and redesigned its weapon and chassis around a saw-blade vertical spinner, then took it to Midwest Robot Rumble 2025.',
    category: 'Robotics',
    date: '2024 – 2025',
    icon: Cog,
    image: '/serrinha.jpg',
    tags: ['Onshape CAD', 'Weapon Design', 'Impact-Rated Mounts', '3D Printing', 'Machining', 'Competition'],
    highlights: [],
    links: [
      { label: 'Explore the CAD in Onshape', href: 'https://cad.onshape.com/documents/22ff5445eba60c93013a5110/w/8fb093b63debc0a6fc4a0b2b/e/94ebe28b966fffb3f18bfdbe?renderMode=0&uiState=6ae6a57b40c1f054683f8c1b', kind: 'link' },
    ],
    caseStudy: {
      role: 'Weapon & chassis designer',
      timeline: 'Freshman year, 2024 – 2025',
      team: 'NU Robotics Club · Combat Robotics',
      status: 'Competed · Midwest Robot Rumble 2025',
      metrics: [
        { value: '3 lb', label: 'Beetleweight class' },
        { value: 'Saw blade', label: 'Custom vertical spinner weapon' },
        { value: 'Award', label: 'Big Band-Aid Award, Midwest Robot Rumble 2025' },
      ],
      problem:
        'My first robot at Northwestern started from a Just Cuz Robotics 3 lb kit. My job was to adapt it into a saw-blade vertical spinner: design a custom weapon, customize the chassis around it, and make the result survive real fights.',
      sections: [
        {
          heading: 'What I changed',
          bullets: [
            'Designed a new weapon around a saw blade, redesigning the blade geometry and the arm that carries it',
            'Redesigned the impact-bearing mounts in CAD to improve reliability under repeated hits',
            'Customized the chassis, including steel front forks to get under opponents',
            'Made the parts with both additive (3D printing) and subtractive (machining) processes',
          ],
          figures: [
            { src: '/serrinha-cad.jpg', caption: 'Onshape assembly of the custom weapon and chassis.' },
          ],
        },
        {
          heading: 'Competition',
          body: 'Serrinha competed at Midwest Robot Rumble on May 31, 2025, and came home with the Big Band-Aid Award, along with plenty of battle damage. The 3D-printed weapon arm and motor mount took the worst of it. Seeing exactly where the robot failed shaped how I designed Clancy the next year.',
          figures: [
            { src: '/serrinha-after-competition.jpg', caption: 'After the event: the award, the saw blade, and the parts that did not survive.' },
          ],
        },
      ],
    },
  },
  {
    slug: 'powereg',
    title: 'PoweReg: Automated Oxygen Tank Setup',
    summary:
      'A two-button attachment that motorizes oxygen tank setup for families of children on oxygen therapy, cutting a minute-plus emergency task down to 34 seconds.',
    category: 'Assistive Tech',
    date: 'Fall 2024',
    icon: Gauge,
    image: '/powereg-cad.jpg',
    tags: ['3D CAD', 'Mechanism Design', 'Motor Selection & Torque', 'Worm Gear Motors', '3D Printing', 'Machining', 'Destructive Testing', 'User Research'],
    highlights: [],
    links: [
      { label: 'View Poster', href: '/files/powereg-poster.pdf', kind: 'doc' },
    ],
    caseStudy: {
      role: 'Team Lead · 3D CAD',
      timeline: 'Sep – Dec 2024 (10 weeks)',
      team: '4 engineers · Partner: Lurie Children’s Hospital',
      status: 'Working prototype',
      metrics: [
        { value: '34 s', label: 'Hands-free setup (28 s regulator + 6 s valve), vs. over a minute by hand' },
        { value: '$80.67', label: 'Bill of materials, about half the $150 budget' },
        { value: '2 switches', label: 'Replace the alignment, T-handle, and loose key' },
      ],
      problem:
        'When a child on oxygen therapy has an emergency at home, a caregiver has to align the regulator on the tank, screw in its T-handle, find a separate key, and turn the valve. Even an experienced pulmonary nurse needs a minute or more. Some families leave the tank open to save time, which wastes oxygen.',
      sections: [
        {
          heading: 'Research',
          body: 'We interviewed a nurse coordinator from Lurie Children’s Pulmonary Habilitation Program and a parent who manages her daughter’s oxygen at home, and watched both of them set up a tank. Key findings:',
          bullets: [
            'It is hard to remember which way to turn the key, and the key is not attached to the tank, so it gets lost',
            'Aligning the regulator on the valve is the slowest, most fiddly step',
            'Regulators get dropped and break, so the user wanted something that protects them',
            'The parent would gladly accept extra weight in exchange for a faster setup',
          ],
        },
        {
          heading: 'How it works',
          body: 'PoweReg replaces each manual step with a motor that the user controls with a three-position toggle switch.',
          bullets: [
            'T-handle mechanism: a 12 V, 15 rpm gearmotor turns an aluminum bar with two steel dowel pins that grip the T-handle and screw the regulator onto the tank in about 28 seconds',
            'Valve mechanism: a 12 V worm gear motor (70 kg·cm) turns a 3D-printed socket shaped to fit the valve stem, opening the tank in about 6 seconds',
            'Each switch has forward, off, and reverse positions, so the same device also closes the tank and removes the regulator',
          ],
          sideBySide: true,
          figures: [
            { src: '/powereg-thandle-motor.jpg', caption: 'T-handle motor screwing the regulator onto the tank.' },
            { src: '/powereg-key-motor.jpg', caption: 'Worm gear motor turning the valve, replacing the key.' },
          ],
        },
        {
          heading: '3D CAD',
          body: 'I modeled the complete product in CAD: the tank, regulator, both motor mechanisms, the battery pack, and the switches, all packaged in a two-compartment enclosure. The enclosure height locates the regulator at exactly the right spot on the tank, which removes the alignment step users struggled with most. The case also protects the regulator if it gets dropped.',
          figures: [
            { src: '/powereg-cad.jpg', caption: 'Rendered CAD assembly: valve motor and battery pack in the top compartment, T-handle mechanism in the bottom.' },
            { src: '/powereg-layout.jpg', caption: 'Layout drawing used to position both mechanisms around the regulator.' },
          ],
        },
        {
          heading: 'Testing and iteration',
          body: 'Most of the design was settled through bench testing on a real tank and regulator.',
          bullets: [
            'Motors: the first 24 V gearmotors were fast but lacked the torque to turn either part. A 12 V, 15 rpm gearmotor handled the T-handle but stalled on the valve, so we switched to a high-ratio worm gear motor for the valve.',
            'Valve socket: the 3D-printed socket chipped under motor load, so we raised the infill from 15% to 50% and matched the opening exactly to the valve stem, since any slack made it slip.',
            'T-handle holder: the PLA pin holder bent under torque, so we machined it from aluminum, drilling and tapping it to mount the pins and motor hub.',
          ],
          sideBySide: true,
          figures: [
            { src: '/powereg-chipped.jpg', caption: 'Early valve socket, worn and chipped after testing.' },
            { src: '/powereg-key-final.jpg', caption: 'Final socket on the worm gear motor: denser print and an exact fit.' },
          ],
        },
        {
          heading: 'Next steps',
          bullets: [
            'Add a microcontroller with end-of-travel sensing so the motors stop automatically, instead of the user switching them off',
            'Use a higher-torque motor on the T-handle to cut the 28-second step',
            'Machine the valve socket from aluminum and build the enclosure from sheet metal for durability',
          ],
        },
        {
          heading: 'Showcase',
          body: 'We presented PoweReg at Northwestern’s Design Thinking and Communication showcase.',
          figures: [
            { src: '/powereg-team.jpg', caption: 'The team with our poster at the DTC showcase.' },
          ],
        },
      ],
    },
  },

  // ========================= POP-UP PROJECTS =========================
  {
    slug: 'combat-30lb',
    title: '30 lb Combat Robot: Electrical Lead',
    summary:
      'Leading a team of 8 electrical engineering students to design the complete electronics and drive control system for the club’s 30 lb robot.',
    category: 'Robotics',
    date: '2026 – Present',
    icon: CircuitBoard,
    tags: ['Team Leadership', 'Motor Drivers & ESCs', 'Power Distribution', 'RC Control', 'Wiring & Integration'],
    highlights: [
      'Leading 8 electrical engineering students in NU Robotics Club’s combat robotics team',
      'Selecting motor drivers and ESCs for the drivetrain and weapon',
      'Designing the power distribution system',
      'Mapping custom radio-control channels for driving and weapon control',
      'Third year in combat robotics: from modifying a kit (Serrinha), to designing a robot from scratch (Clancy), to leading a team',
    ],
  },
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
    title: 'Vocal Communicator for People with ALS',
    summary:
      'A low-cost, Arduino-based device that speaks recorded phrases at the press of a key, so people with ALS who still have some finger movement can communicate without a computer.',
    category: 'Assistive Tech',
    date: '2021',
    icon: MessageSquare,
    image: '/als-device.jpg',
    tags: ['Arduino (C/C++)', 'DFPlayer Mini Audio', 'Membrane Keypad', 'LCD', 'Eagle Schematic', '3D-Printed Enclosure', 'Assistive Technology'],
    highlights: [],
    caseStudy: {
      role: 'Co-developer · hardware & firmware',
      timeline: '2021',
      team: '3 student researchers, 2 faculty advisors · IFPB',
      status: 'Working prototype',
      metrics: [
        { value: 'R$143', label: 'Total build cost, vs. R$900+ for commercial communicators' },
        { value: '1 key', label: 'Press per spoken phrase' },
        { value: 'No computer', label: 'Fully standalone: no PC or extra screen needed' },
      ],
      problem:
        'ALS (amyotrophic lateral sclerosis) gradually takes away voluntary movement, including speech. As it progresses, many patients are left with little more than “yes” or “no.” The communication aids we found were expensive (around R$900–R$1,000), needed a computer to interpret signals, or were slow, such as spelling out each letter with eye blinks.',
      sections: [
        {
          heading: 'The idea',
          body: 'We designed a standalone device for people in earlier stages of ALS, or with similar conditions, who can still move one finger. Instead of spelling words, the user presses a key and the device speaks a whole phrase out loud through a built-in speaker. No computer or extra screen is involved.',
          figures: [
            { src: '/als-concept.jpg', caption: 'Early 3D concept: keypad and display on top, speaker on the side.' },
          ],
        },
        {
          heading: 'How it works',
          bullets: [
            'A 4×4 membrane keypad is read by an Arduino Uno',
            'Each key maps to a phrase recorded in our own voices and stored on a memory card',
            'A DFPlayer Mini audio module plays the phrase through a speaker (one we salvaged and reused)',
            'An LCD shows the selected phrase for people nearby',
            'We designed the wiring in Eagle before building the circuit',
          ],
          figures: [
            { src: '/als-schematic.jpg', caption: 'Schematic in Eagle: Arduino, DFPlayer Mini, speaker, LCD, and keypad.' },
          ],
        },
        {
          heading: 'Phrases',
          body: 'The prototype speaks nine everyday phrases (shown here in English; the device speaks Portuguese):',
          table: {
            headers: ['Key', 'Phrase'],
            rows: [
              ['1', 'Are you okay?'],
              ['2', 'I’m fine, and you?'],
              ['3', 'Yes.'],
              ['4', 'No.'],
              ['5', 'I’m hot.'],
              ['6', 'I’m hungry.'],
              ['7', 'I’m cold.'],
              ['8', 'I don’t feel well.'],
              ['9', 'Help!'],
            ],
            note: 'The full design uses two-key combinations (for example A + 1, A + 2) to reach about 36 phrases.',
          },
        },
        {
          heading: 'Debugging the build',
          body: 'On a breadboard, loose connections to the audio module distorted the sound. We first moved the circuit to perforated board, but our soldering was still too inexperienced for it to be reliable. In the end, we wired the keypad and audio module directly to the Arduino, which removed the breadboard entirely and gave clean audio and stable connections.',
          sideBySide: true,
          figures: [
            { src: '/als-breadboard.jpg', caption: 'Breadboard version, where loose contacts distorted the audio.' },
            { src: '/als-final-wiring.jpg', caption: 'Final wiring direct to the Arduino, inside the enclosure.' },
          ],
        },
        {
          heading: 'Enclosure',
          body: 'We modeled the enclosure in SketchUp and 3D-printed it in PLA, with openings for the display and speaker.',
          sideBySide: true,
          figures: [
            { src: '/als-enclosure-cad.jpg', caption: 'Enclosure modeled in SketchUp.' },
            { src: '/als-enclosure-printed.jpg', caption: 'The printed enclosure.' },
          ],
        },
        {
          heading: 'Results and next steps',
          bullets: [
            'Built a working prototype for R$142.80 in parts, compared with R$900+ for commercial communicators that do not speak',
            'Next steps: add the battery (the prototype ran on an external power supply), implement two-key combinations for about 36 phrases, and replace the wiring with a custom PCB',
            'Written up as an expanded abstract for the Brazilian Young Scientists Fair (FBJC) and presented to 700+ attendees',
          ],
        },
      ],
    },
  },
  {
    slug: 'sara',
    title: 'SARA: Academic Workflow Platform',
    summary:
      'A web platform that automates repetitive administrative work for a Brazilian federal institute, making those tasks about 5× faster. Registered as software with Brazil’s national IP office.',
    category: 'Miscellaneous',
    date: '2020 – 2023',
    icon: Workflow,
    tags: ['PHP', 'CodeIgniter (MVC)', 'MySQL', 'Authentication', 'Role-Based Access Control', 'Bootstrap', 'jQuery / DataTables'],
    highlights: [],
    links: [
      { label: 'View Software Registration (Portuguese)', href: '/files/sara-registration.pdf', kind: 'doc' },
    ],
    caseStudy: {
      role: 'Co-author · web developer',
      timeline: 'Jul 2020 – Apr 2023',
      team: '3 student developers, 1 faculty advisor · IFPB Campus Catolé do Rocha',
      status: 'Registered software · BR 51 2023 001074-0',
      metrics: [
        { value: '~5×', label: 'Faster task completion (≈80% less time)' },
        { value: '6', label: 'User roles with separate permissions' },
        { value: '50 years', label: 'Software registration with INPI, Brazil’s IP office' },
      ],
      problem:
        'At the Federal Institute of Paraíba, routine academic administration involves many offices: faculty, the pedagogical coordination office, and the coordinators of each technical program. Much of that work was done manually, so repetitive tasks took far longer than they needed to.',
      sections: [
        {
          heading: 'What SARA does',
          body: 'SARA (Sistema Auxiliar de Rotinas Acadêmicas, “Academic Routines Assistant”) brings those workflows into a single web system. Each user logs in and gets the tools and permissions that match their role.',
        },
        {
          heading: 'Architecture',
          bullets: [
            'Back end: PHP on the CodeIgniter MVC framework, with controllers, models, and views kept separate',
            'Database: MySQL, including a SQL view that joins users to their roles for fast permission checks',
            'Authentication: secure login with hashed passwords, failed-login tracking, and password reset',
            'Front end: responsive Bootstrap dashboard, with searchable, sortable tables (DataTables) for managing records',
            'Validation on every form, such as unique usernames, emails, and student/staff ID numbers, and a minimum password length',
          ],
        },
        {
          heading: 'Role-based access',
          body: 'The institute’s offices need very different access, so permissions are built around six roles:',
          table: {
            headers: ['Role', 'Who it is for'],
            rows: [
              ['Admin', 'System administrators'],
              ['Faculty', 'Teachers'],
              ['COPED', 'Pedagogical coordination office'],
              ['COINFO', 'IT technical program coordination'],
              ['COEDIF', 'Building technology program coordination'],
              ['CCT', 'Coordination of all technical programs'],
            ],
          },
        },
        {
          heading: 'Impact',
          bullets: [
            'Cut the time to complete repetitive administrative tasks by about 5× (≈80%) through system integration and process redesign',
            'Registered with INPI (Brazil’s National Institute of Industrial Property) as a computer program, protected for 50 years, with the institute as the rights holder',
          ],
        },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// ORDER ON THE SITE: list slugs in the order you want the cards to appear.
// Any project not listed here goes at the end.
// ---------------------------------------------------------------------------
const ORDER = [
  'blade-coater',
  'accessible-ph-meter',
  'powereg',
  'clancy',
  'serrinha',
  'bat-companion',
  'als-communicator',
  'sara',
  'combat-30lb',
];

const rank = (slug: string) => {
  const i = ORDER.indexOf(slug);
  return i === -1 ? ORDER.length : i;
};

export const projects: Project[] = [...allProjects].sort((a, b) => rank(a.slug) - rank(b.slug));

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
