// About section: story, what I focus on, skills, and recognition.
// Edit the text and lists below directly.

const focusAreas = [
  {
    title: 'Assistive technology',
    text: 'Devices that give people back independence: a pH meter that speaks for blind chemistry students, a communicator for people with ALS, and an oxygen-tank helper for families of children on oxygen therapy.',
  },
  {
    title: 'Product design',
    text: 'I start with the people who will use the thing. Interviews, observation, sketches, and mockups come before CAD, and testing with users shapes every version after.',
  },
  {
    title: 'Hardware and mechatronics',
    text: 'Mechanisms, circuits, and firmware working together, from custom PCBs and motor control to a research instrument and combat robots.',
  },
];

const skills = [
  {
    group: 'Design and prototyping',
    items: [
      'User research and interviews',
      'Sketching and mockups',
      'Onshape',
      'SolidWorks',
      'Fusion 360',
      'SketchUp',
      '3D printing',
      'Machining',
      'Design for manufacturing',
    ],
  },
  {
    group: 'Electronics',
    items: [
      'PCB design (Eagle)',
      'Analog signal conditioning',
      'Motor drivers and ESCs',
      'I²C, SPI, UART',
      'Soldering and rework',
      'Oscilloscope debugging',
    ],
  },
  {
    group: 'Programming',
    items: ['Embedded C/C++', 'Arduino', 'Raspberry Pi Pico', 'Python', 'MATLAB and Simulink', 'ROS 2', 'Git', 'Linux'],
  },
  {
    group: 'Languages',
    items: ['Portuguese (native)', 'English (fluent)', 'Spanish (basic)', 'Hebrew (basic)'],
  },
];

const recognition = [
  { year: '2023', text: 'Brazilian utility model patent published for the accessible pH meter (INPI)' },
  { year: '2023', text: 'SARA academic workflow platform registered as software with INPI' },
  { year: '2025', text: 'Big Band-Aid Award, Midwest Robot Rumble, with Serrinha' },
  { year: '2026', text: 'Grant-funded undergraduate research at the Robotic Matter Lab, Northwestern' },
];

export default function About() {
  return (
    <section id="about" className="border-t border-line bg-card py-20 md:py-28">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-[1fr_1.25fr]">
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">About me</h2>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
            <p>
              I grew up in Catolé do Rocha, a small town in the sertão of Paraíba, Brazil. In high school at the
              Federal Institute of Paraíba, I helped build a pH meter that reads its results out loud so blind students
              could work in the chemistry lab. That project became a patent, and it set the direction for everything
              since: I want to design hardware that helps people do things on their own.
            </p>
            <p>
              Now I study computer engineering at Northwestern University and am completing the Segal Design
              Certificate. I like working across the whole product: talking to users, sketching, CAD, electronics,
              firmware, and testing on the bench.
            </p>
            <p>
              I&apos;m looking for internships in assistive technology, product design, and hardware engineering.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-12 md:grid-cols-3">
          {focusAreas.map((area) => (
            <div key={area.title}>
              <span className="mb-4 block h-1 w-10 rounded-full bg-violet" aria-hidden="true" />
              <h3 className="mb-3 text-xl font-extrabold tracking-tight">{area.title}</h3>
              <p className="leading-relaxed">{area.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-[1fr_1.25fr]">
          <div>
            <h3 className="mb-6 text-2xl font-extrabold tracking-tight">Skills</h3>
            <dl className="space-y-6">
              {skills.map((s) => (
                <div key={s.group}>
                  <dt className="mb-2 font-bold text-ink">{s.group}</dt>
                  <dd className="leading-relaxed">{s.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="mb-6 text-2xl font-extrabold tracking-tight">Recognition</h3>
            <ul className="divide-y divide-line border-y border-line">
              {recognition.map((r) => (
                <li key={r.text} className="flex gap-6 py-4">
                  <span className="w-12 flex-none font-bold tabular-nums text-lilac">{r.year}</span>
                  <span>{r.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
