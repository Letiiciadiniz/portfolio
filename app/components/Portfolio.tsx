'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code2, Cpu, Zap, LucideIcon, Volume2 } from 'lucide-react';
import Image from 'next/image'

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  category: string;
  icon: LucideIcon;
  image: string;
  details: string[];
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Autonomous Navigation Robot',
    description: 'Mobile robot with computer vision and path planning capabilities for autonomous indoor navigation.',
    technologies: ['ROS2', 'Python', 'OpenCV', 'SLAM', 'Raspberry Pi'],
    github: 'https://github.com',
    category: 'Robotics',
    icon: Cpu,
    image: '/images/autonomous-robot.jpg',
    details: [
      'Implemented SLAM algorithm for real-time mapping',
      'Integrated LiDAR and camera sensors for obstacle detection',
      'Developed path planning using A* algorithm',
      'Achieved 95% navigation accuracy in test environments',
    ],
  },
  {
    id: 'project-2',
    title: 'Robotic Arm Controller',
    description: '6-DOF robotic arm with inverse kinematics for precise object manipulation and pick-and-place operations.',
    technologies: ['Arduino', 'C++', 'MATLAB', 'Servo Control'],
    github: 'https://github.com',
    demo: 'https://example.com',
    category: 'Robotics',
    icon: Zap,
    image: '/images/autonomous-robot.jpg',
    details: [
      'Designed custom inverse kinematics solver',
      'Built web interface for remote control',
      'Implemented PID control for smooth motion',
      'Precision of ±2mm in object placement',
    ],
  },
  {
    id: 'project-3',
    title: 'Computer Vision Object Tracker',
    description: 'Real-time object detection and tracking system using deep learning for robotics applications.',
    technologies: ['Python', 'TensorFlow', 'YOLO', 'OpenCV'],
    github: 'https://github.com',
    category: 'AI/ML',
    icon: Code2,
    image: '/images/autonomous-robot.jpg',
    details: [
      'Trained custom YOLO model on 10,000+ images',
      'Real-time processing at 30 FPS',
      'Multi-object tracking with 92% accuracy',
      'Integrated with ROS for robotic control',
    ],
  },
  {
    id: 'project-4',
    title: 'Arduino-Based Accessible pH Meter',
    description: 'Low-cost pH meter with LCD and spoken readouts, designed for inclusive use by visually impaired learners and lab users.',
    technologies: [
          'Arduino C/C++',
          '3D-Printed Enclosure',
          'pH Electrode Sensor',
          'BNC -vInterface Module',
          'DFPlayer Mini',
          'Speaker',
          'LCD 16x2',
          'LiPo Batteries',
      ],
    github: 'https://github.com/Letiiciadiniz/pHmeter.git',
    demo: 'https://youtu.be/KwcFQ8zasOc?si=c8AuHtFSur_hcx5d&t=355',
    category: 'IoT',
    icon: Volume2,
    image: '/phmeter.jpg',
    details: [ 
    'Utility model focused on accessibility: LCD display plus voice feedback of pH values',
    'pH sensing via electrode → BNC module → Arduino Uno; audio via DFPlayer Mini and speaker',
    'Guided startup and calibration prompts; simple buttons for calibration at pH 4 and pH 7',
    'Portable, low-cost build powered by LiPo batteries; enclosure designed and printed in 3D',
    'Displays pH on-screen and announces it by voice for inclusive lab use',
    'Validated against a commercial bench pH meter using buffer solutions (pH 4, 7, 10) and real samples (bicarbonate solution, bleach, vinegar, wine)',
    'Intended for teaching and analytical labs, enabling independent operation by users with low or no vision'
    ],
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Robotics', 'AI/ML', 'IoT'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <section id="portfolio" className="min-h-screen py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore my robotics and engineering projects
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700"
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                  {project.image && (
                    <div className="mb-4 overflow-hidden rounded-xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="relative bottom-0 left-0 w-24 h-24 object-cover rounded-lg border border-gray-300 dark:border-gray-600 shadow-md"
                      />
                    </div>
                  )}
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Github size={24} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <ExternalLink size={24} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && selectedProjectData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedProjectData.title}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedProjectData.description}
                </p>

                <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Key Features
                </h4>
                <ul className="space-y-2 mb-6">
                  {selectedProjectData.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProjectData.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {selectedProjectData.github && (
                    <a
                      href={selectedProjectData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Github size={20} />
                      View Code
                    </a>
                  )}
                  {selectedProjectData.demo && (
                    <a
                      href={selectedProjectData.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
