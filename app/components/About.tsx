'use client';

import { motion } from 'framer-motion';
import { Code2, Cpu, Wrench, Rocket, Brain, Zap } from 'lucide-react';

const skills = [
  {
    category: 'Programming Languages',
    items: ['Python', 'C++', 'C', 'JavaScript', 'MATLAB', 'Java'],
    icon: Code2,
  },
  {
    category: 'Robotics & Embedded',
    items: ['ROS/ROS2', 'Arduino', 'Raspberry Pi', 'STM32', 'PID Control', 'SLAM'],
    icon: Cpu,
  },
  {
    category: 'AI/ML & Computer Vision',
    items: ['TensorFlow', 'PyTorch', 'OpenCV', 'YOLO', 'Scikit-learn', 'Keras'],
    icon: Brain,
  },
  {
    category: 'Tools & Technologies',
    items: ['Git', 'Linux', 'Docker', 'CAD (SolidWorks)', 'PCB Design', 'MQTT'],
    icon: Wrench,
  },
];

const interests = [
  {
    title: 'Autonomous Systems',
    description: 'Developing intelligent robots that can navigate and make decisions independently',
    icon: Rocket,
  },
  {
    title: 'Machine Learning',
    description: 'Applying AI algorithms to solve real-world robotics challenges',
    icon: Brain,
  },
  {
    title: 'Embedded Systems',
    description: 'Building efficient hardware-software solutions for resource-constrained devices',
    icon: Zap,
  },
];

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I&apos;m a Computer Engineering major with a passion for robotics and automation.
            Currently seeking internship opportunities to apply my skills in real-world projects.
          </p>
        </motion.div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl mb-16"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
              As a Computer Engineering student, I combine my knowledge of hardware and software to create
              innovative robotics solutions. My experience spans from low-level embedded programming to
              high-level AI algorithms, enabling me to tackle complex engineering challenges from multiple angles.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              I&apos;m particularly interested in autonomous systems, computer vision, and the intersection of
              robotics with artificial intelligence. I&apos;m eager to contribute to cutting-edge projects and
              learn from experienced professionals in the field.
            </p>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Technical Skills
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skillGroup, index) => {
              const Icon = skillGroup.icon;
              return (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {skillGroup.category}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Interests Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Areas of Interest
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {interests.map((interest, index) => {
              const Icon = interest.icon;
              return (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {interest.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {interest.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
