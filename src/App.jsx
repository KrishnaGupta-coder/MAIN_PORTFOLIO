import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Cpu, Sparkles, Code2, Database, Hand, Brain, ExternalLink, 
  X, Mail, Play, Pause, VolumeX, Volume2, Tv, CheckCircle2, 
  ChevronRight, Eye, Info, Phone, Terminal as TerminalIcon, 
  ShieldAlert, Users, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import emailjs from '@emailjs/browser';

// Custom inline SVG brand icons
const Github = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Project Data
const PROJECTS = [
  {
    id: 'zerotouchsec',
    name: 'ZeroTouchSec',
    category: 'Computer Vision & HCI',
    desc: 'Gesture-Driven AI Automation for Secure Cloud Operations & Surveillance Control. Control media, volume, and system actions touchlessly using computer vision.',
    longDesc: 'ZeroTouchSec is a state-of-the-art Human-Computer Interaction (HCI) project designed to replace physical input devices with intuitive hand gestures. By utilizing OpenCV and custom PyTorch models, it maps raw camera feed features to system-level commands, creating a seamless touchless environment. It is optimized for low-latency operations, ensuring real-time response times.',
    tech: ['Python', 'PyTorch', 'OpenCV', 'OS-Triggers'],
    icon: Hand,
    color: '#00f5d4'
  },
  {
    id: 'attendance',
    name: 'AI Smart Campus Attendance',
    category: 'Deep Learning & Vector DB',
    desc: 'Multi-camera real-time face recognition attendance system scaling up to 40+ students simultaneously using Qdrant vector search and L2-normalized embeddings.',
    longDesc: 'This project is a fully automated attendance tracking system powered by face recognition. It captures high-resolution feeds, crops facial regions, generates 1280x1280 high-precision embeddings, and performs sub-millisecond matching against a Qdrant vector database. The system handles lighting variances and scales efficiently to monitor multiple classroom access points.',
    tech: ['Python', 'PyTorch', 'OpenCV', 'Qdrant', 'React'],
    icon: Tv,
    color: '#bd00ff'
  },
  {
    id: 'sda',
    name: 'SDA - Smart Disaster Agent',
    category: 'AI & Humanitarian Tech',
    desc: 'Mobile/Web-enabled early warning system connecting citizens and disaster responders, featuring satellite API inputs, AI severity scoring, and offline alert paths.',
    longDesc: 'Developed for the Smart India Hackathon (SIH 2025) by Team Synapse, Synapse - Smart Disaster Agent integrates real-time satellite radar parameters, community hazard reports, and deep learning severity classification. It maps danger radiuses, automates resource dispatch coordination, and utilizes offline notification fallbacks to deliver warning alerts under 3 seconds to endangered zones.',
    tech: ['React.js', 'Supabase', 'Firebase', 'Satellite-APIs'],
    icon: ShieldAlert,
    color: '#ff007f'
  }
];

// Hackathons & Achievements Data
const HACKATHONS = [
  {
    role: 'Event Coordinator & Participant',
    name: 'WCHL Hackathon',
    desc: 'Organized core logistical tracks and milestones for 100+ active coders, while contributing to open-source software structures during parallel hacking segments.'
  },
  {
    role: 'Lead Contributor & Solver',
    name: 'Blockchain Hackathon',
    desc: 'Designed and deployed decentralized smart ledger interfaces to automate submission workflows and student ledger queries on-chain.'
  },
  {
    role: 'Team Lead / SIH 2025 Candidate',
    name: 'HackStorm Hackathon',
    desc: 'Led the development of automated computer vision pipelines, achieving rapid prototype categorization speeds and optimizing data routing configurations.'
  }
];

// Tech Skills for 3D Tag Sphere
const SKILLS = [
  'Python', 'C++', 'C', 'PyTorch', 'TensorFlow', 
  'OpenCV', 'Qdrant', 'AWS', 'NumPy', 'HTML5', 'CSS3', 
  'JavaScript', 'React.js', 'Git', 'GitHub', 'VS Code', 'Vercel'
];

// Diagnostic logs for Hacker Terminal
const TERMINAL_LOGS = [
  'system.init() -> boot sequence loaded.',
  'loading gesture_control_engine... OK (v1.2)',
  'opening local camera buffer access... active',
  'fetching student face embeddings index... 40 targets loaded.',
  'connecting to Qdrant vector space... search latency: 0.82ms.',
  'loading satellite hazard layers for SDA... connection active.',
  'integrating NDMA API early warning feeds... OK',
  'verifying gesture triggers: swipe_left, palm_pause, volume_scale... ready.',
  'Krishna Gupta Profile System is active // awaiting inputs.'
];

function App() {
  const [activeTab, setActiveTab] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Custom mouse states
  const mouse = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const threeCanvasRef = useRef(null);
  const skillCanvasRef = useRef(null);
  const pointerCanvasRef = useRef(null);
  const formLogsRef = useRef(null);
  
  // Hacker Terminal States
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [terminalIndex, setTerminalIndex] = useState(0);

  // ZeroTouchSec Simulator States
  const [simActive, setSimActive] = useState(false);
  const [detectedGesture, setDetectedGesture] = useState('NO HAND');
  const [simSlide, setSimSlide] = useState(0);
  const [simVolume, setSimVolume] = useState(50);
  const [simPlaying, setSimPlaying] = useState(true);
  const [swipeTrigger, setSwipeTrigger] = useState(false);

  // SDA Simulator States
  const [sdaDisasterType, setSdaDisasterType] = useState('Flood Warning');
  const [sdaAlertRadius, setSdaAlertRadius] = useState(15);
  const [sdaBroadcastLogs, setSdaBroadcastLogs] = useState([]);
  const [sdaActiveAlert, setSdaActiveAlert] = useState(false);

  // Upgraded Contact Form States
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formLogs, setFormLogs] = useState([
    'Awaiting connection packets...'
  ]);
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Auto-scroll contact console logs to bottom
  useEffect(() => {
    if (formLogsRef.current) {
      formLogsRef.current.scrollTop = formLogsRef.current.scrollHeight;
    }
  }, [formLogs]);

  // Scroll details tracking
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Check current section
      const scrollPos = window.scrollY + window.innerHeight / 3;
      const sections = ['hero', 'about', 'hackathons', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse coordinate tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.rx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.ry = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hacker Terminal Auto-typer
  useEffect(() => {
    if (terminalIndex >= TERMINAL_LOGS.length) return;
    const interval = setTimeout(() => {
      setTerminalOutput(prev => [...prev, TERMINAL_LOGS[terminalIndex]]);
      setTerminalIndex(prev => prev + 1);
    }, 1800);
    return () => clearTimeout(interval);
  }, [terminalIndex]);

  // 1. Canvas Pointer Trail
  useEffect(() => {
    const canvas = pointerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let particles = [];
    const colorCycle = ['#00f5d4', '#bd00ff', '#ff007f'];
    let colorIdx = 0;
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Spawn new particle
      if (Math.random() < 0.8) {
        colorIdx = (colorIdx + 1) % colorCycle.length;
        particles.push({
          x: mouse.current.x,
          y: mouse.current.y,
          size: Math.random() * 6 + 2,
          color: colorCycle[colorIdx],
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.012
        });
      }
      
      // Update particles
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.size *= 0.97;
        
        if (p.alpha <= 0) return false;
        
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    drawParticles();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // 2. Three.js Background Constellation
  useEffect(() => {
    if (!threeCanvasRef.current) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 240;
    
    const renderer = new THREE.WebGLRenderer({
      canvas: threeCanvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = [];
    
    const colorPalette = [
      new THREE.Color('#00f5d4'),
      new THREE.Color('#bd00ff'),
      new THREE.Color('#ff007f')
    ];
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 450;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 450;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 250;
      
      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.16,
        y: (Math.random() - 0.5) * 0.16,
        z: (Math.random() - 0.5) * 0.1
      });
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 4.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xbd00ff,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending
    });
    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    
    let animationFrameId;
    const animate = () => {
      const posArr = geometry.attributes.position.array;
      
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3] += velocities[i].x;
        posArr[i * 3 + 1] += velocities[i].y;
        posArr[i * 3 + 2] += velocities[i].z;
        
        if (Math.abs(posArr[i * 3]) > 250) velocities[i].x *= -1;
        if (Math.abs(posArr[i * 3 + 1]) > 250) velocities[i].y *= -1;
        if (Math.abs(posArr[i * 3 + 2]) > 150) velocities[i].z *= -1;
      }
      geometry.attributes.position.needsUpdate = true;
      
      const linePositions = [];
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArr[i * 3] - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          
          if (dist < 60) {
            linePositions.push(posArr[i * 3], posArr[i * 3 + 1], posArr[i * 3 + 2]);
            linePositions.push(posArr[j * 3], posArr[j * 3 + 1], posArr[j * 3 + 2]);
          }
        }
      }
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.attributes.position.needsUpdate = true;

      particleSystem.rotation.y += 0.0006;
      particleSystem.rotation.x += 0.0003;
      
      camera.position.x += (mouse.current.rx * 55 - camera.position.x) * 0.05;
      camera.position.y += (mouse.current.ry * 55 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // 3. 3D Skills Sphere Orbit Canvas (UPDATED: Added glowing wireframe latitude/longitude rings & glowing intersections)
  useEffect(() => {
    const canvas = skillCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    
    const center = { x: width / 2, y: height / 2 };
    const radius = Math.min(width, height) * 0.35;
    
    // Skill tags 3D coordinates configuration
    let tags = SKILLS.map((skill, idx) => {
      const k = -1 + (2 * (idx + 1) - 1) / SKILLS.length;
      const theta = Math.acos(k);
      const phi = Math.sqrt(SKILLS.length * Math.PI) * theta;
      
      return {
        text: skill,
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta)
      };
    });
    
    // Generate static 3D points representing standard latitude and longitude rings of the globe sphere
    const globeRings = [];
    
    // Generate 6 latitude circles at specific Z heights for higher grid resolution
    const latZs = [-radius * 0.8, -radius * 0.5, -radius * 0.2, radius * 0.2, radius * 0.5, radius * 0.8];
    latZs.forEach(z => {
      const ringRadius = Math.sqrt(radius * radius - z * z);
      const ringPoints = [];
      for (let i = 0; i <= 40; i++) {
        const angle = (i / 40) * Math.PI * 2;
        ringPoints.push({
          x: ringRadius * Math.cos(angle),
          y: ringRadius * Math.sin(angle),
          z: z
        });
      }
      globeRings.push(ringPoints);
    });
    
    // Generate 6 longitude circles rotating around the vertical Y axis
    const longAngles = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2, (2 * Math.PI) / 3, (5 * Math.PI) / 6];
    longAngles.forEach(angle => {
      const ringPoints = [];
      for (let i = 0; i <= 40; i++) {
        const theta = (i / 40) * Math.PI * 2;
        const xVal = radius * Math.cos(theta);
        const yVal = radius * Math.sin(theta);
        
        ringPoints.push({
          x: xVal * Math.cos(angle),
          y: yVal,
          z: xVal * Math.sin(angle)
        });
      }
      globeRings.push(ringPoints);
    });
    
    let rotX = 0.006;
    let rotY = 0.006;
    
    let isDragging = false;
    let startMouse = { x: 0, y: 0 };
    
    const handleDown = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startMouse = { x: clientX, y: clientY };
    };
    
    const handleMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - startMouse.x;
      const dy = clientY - startMouse.y;
      
      rotY = dx * 0.0005;
      rotX = -dy * 0.0005;
    };
    
    const handleUp = () => {
      isDragging = false;
    };
    
    canvas.addEventListener('mousedown', handleDown);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    canvas.addEventListener('touchstart', handleDown);
    canvas.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);
    
    const renderOrbit = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      
      if (!isDragging) {
        rotX += (0.0025 - rotX) * 0.05;
        rotY += (0.0025 - rotY) * 0.05;
      }
      
      const depth = 380;
      
      // 0. Volumetric Core Glow in the center of the globe
      const coreGlow = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius * 0.85);
      coreGlow.addColorStop(0, 'rgba(189, 0, 255, 0.09)');
      coreGlow.addColorStop(0.5, 'rgba(0, 245, 212, 0.03)');
      coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius * 0.85, 0, Math.PI * 2);
      ctx.fill();

      // Outer boundary glow ring
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.05)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // 1. Draw glowing background grid lines representing the 3D globe wireframe in segments for depth shading
      globeRings.forEach((ringPoints, rIdx) => {
        for (let i = 0; i < ringPoints.length - 1; i++) {
          const pt1 = ringPoints[i];
          const pt2 = ringPoints[i + 1];
          
          const y1_1 = pt1.y * cosX - pt1.z * sinX;
          const z1_1 = pt1.y * sinX + pt1.z * cosX;
          const x2_1 = pt1.x * cosY - z1_1 * sinY;
          const z2_1 = pt1.x * sinY + z1_1 * cosY;
          
          const y1_2 = pt2.y * cosX - pt2.z * sinX;
          const z1_2 = pt2.y * sinX + pt2.z * cosX;
          const x2_2 = pt2.x * cosY - z1_2 * sinY;
          const z2_2 = pt2.x * sinY + z1_2 * cosY;
          
          const scale1 = depth / (depth - z2_1);
          const px1 = center.x + x2_1 * scale1;
          const py1 = center.y + y1_1 * scale1;
          
          const scale2 = depth / (depth - z2_2);
          const px2 = center.x + x2_2 * scale2;
          const py2 = center.y + y1_2 * scale2;
          
          const avgZ = (z2_1 + z2_2) / 2;
          const depthFactor = (avgZ + radius) / (2 * radius); // 0 to 1 (front to back)
          
          ctx.beginPath();
          ctx.moveTo(px1, py1);
          ctx.lineTo(px2, py2);
          
          const baseOpacity = isDragging ? 0.38 : 0.22;
          const opacity = 0.04 + depthFactor * baseOpacity;
          
          ctx.strokeStyle = rIdx < 6 
            ? `rgba(189, 0, 255, ${opacity})`  // Purple Latitudes
            : `rgba(0, 245, 212, ${opacity})`;   // Teal Longitudes
          
          ctx.lineWidth = 0.4 + depthFactor * 1.8; // Thicker in front, fading line width in back
          ctx.stroke();
          
          // Draw intersection dots at intervals
          if (i % 8 === 0 && avgZ > 0) {
            ctx.save();
            ctx.fillStyle = `rgba(0, 245, 212, ${opacity * 1.5})`;
            ctx.beginPath();
            ctx.arc(px1, py1, 1.8 + depthFactor * 1.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
        
        // Persist rotations for coordinates
        ringPoints.forEach(pt => {
          const y1 = pt.y * cosX - pt.z * sinX;
          const z1 = pt.y * sinX + pt.z * cosX;
          const x2 = pt.x * cosY - z1 * sinY;
          const z2 = pt.x * sinY + z1 * cosY;
          pt.x = x2;
          pt.y = y1;
          pt.z = z2;
        });
      });
      
      // 2. Draw the skill text tags
      const updatedTags = tags.map(tag => {
        const y1 = tag.y * cosX - tag.z * sinX;
        const z1 = tag.y * sinX + tag.z * cosX;
        const x2 = tag.x * cosY - z1 * sinY;
        const z2 = tag.x * sinY + z1 * cosY;
        
        tag.x = x2;
        tag.y = y1;
        tag.z = z2;
        
        const scale = depth / (depth - z2);
        const px = center.x + x2 * scale;
        const py = center.y + y1 * scale;
        
        return {
          text: tag.text,
          px,
          py,
          z: z2,
          scale
        };
      });
      
      updatedTags.sort((a, b) => a.z - b.z);
      
      // Draw dynamic web lines connecting adjacent tags
      ctx.beginPath();
      for (let i = 0; i < updatedTags.length; i++) {
        for (let j = i + 1; j < updatedTags.length; j++) {
          const t1 = updatedTags[i];
          const t2 = updatedTags[j];
          const dist = Math.sqrt(Math.pow(t1.px - t2.px, 2) + Math.pow(t1.py - t2.py, 2));
          
          if (dist < 100 && t1.z > 0 && t2.z > 0) {
            ctx.moveTo(t1.px, t1.py);
            ctx.lineTo(t2.px, t2.py);
          }
        }
      }
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.04)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      
      // Draw tags labels
      updatedTags.forEach(tag => {
        const alpha = Math.min(1.0, Math.max(0.18, (tag.z + radius) / (2 * radius)));
        const fontSize = Math.floor(12 + tag.scale * 4);
        
        ctx.font = `600 ${fontSize}px var(--font-sans)`;
        
        if (tag.z > 20) {
          ctx.fillStyle = `rgba(0, 245, 212, ${alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(0, 245, 212, 0.5)';
        } else if (tag.z < -20) {
          ctx.fillStyle = `rgba(100, 116, 139, ${alpha * 0.7})`;
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(189, 0, 255, ${alpha})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(189, 0, 255, 0.4)';
        }
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tag.text, tag.px, tag.py);
      });
      
      animationFrameId = requestAnimationFrame(renderOrbit);
    };
    
    renderOrbit();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleDown);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      canvas.removeEventListener('touchstart', handleDown);
      canvas.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  // 4. ZeroTouchSec Simulator mouse trackers
  const handleSimulatorMouseMove = (e) => {
    if (!simActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x < rect.width * 0.3) {
      setDetectedGesture('SWIPE LEFT');
      if (!swipeTrigger) {
        setSwipeTrigger(true);
        setSimSlide(prev => (prev === 0 ? 2 : prev - 1));
        setTimeout(() => setSwipeTrigger(false), 800);
      }
    } else if (x > rect.width * 0.7) {
      setDetectedGesture('SWIPE RIGHT');
      if (!swipeTrigger) {
        setSwipeTrigger(true);
        setSimSlide(prev => (prev === 2 ? 0 : prev + 1));
        setTimeout(() => setSwipeTrigger(false), 800);
      }
    } else if (y < rect.height * 0.3) {
      setDetectedGesture('PALM (PLAY/PAUSE)');
      if (!swipeTrigger) {
        setSwipeTrigger(true);
        setSimPlaying(prev => !prev);
        setTimeout(() => setSwipeTrigger(false), 1000);
      }
    } else if (y > rect.height * 0.7) {
      setDetectedGesture('FIST (MUTE)');
      setSimVolume(0);
    } else {
      setDetectedGesture('OPEN HAND (ACTIVE)');
      const verticalRatio = 1 - (y - rect.height * 0.3) / (rect.height * 0.4);
      setSimVolume(Math.round(Math.min(100, Math.max(10, verticalRatio * 100))));
    }
  };

  const handleSimulatorMouseLeave = () => {
    setDetectedGesture('NO HAND');
  };

  // 5. SDA Simulator Alerts Trigger
  const triggerSdaAlert = () => {
    setSdaActiveAlert(true);
    const timestamp = new Date().toLocaleTimeString();
    
    setSdaBroadcastLogs([
      `[${timestamp}] Initiated early warning broadcast: ${sdaDisasterType}`,
      `[${timestamp}] Targeting danger radius: ${sdaAlertRadius} km`,
      `[${timestamp}] Querying active device registers inside sector...`,
      `[${timestamp}] Dispatching push coordinates & satellite vectors...`,
      `[${timestamp}] Deploying offline alert nodes via SMS network...`,
      `[${timestamp}] SUCCESS: 2,412 citizens alerted under 2.4 seconds!`
    ]);
  };

  // 6. Holographic Contact Form with live EmailJS integration
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) {
      setFormLogs(prev => [...prev, '❌ ERROR: Handshake rejected. Mandatory parameters missing.']);
      return;
    }
    
    setIsTransmitting(true);
    const timestamp = new Date().toLocaleTimeString();
    
    setFormLogs(prev => [
      ...prev,
      `[${timestamp}] Initializing client socket connection...`,
      `[${timestamp}] Resolving DNS registers for: ${formEmail}`,
      `[${timestamp}] Encrypting transmission payload (AES-256)...`
    ]);

    // To activate live emails, register a free account on emailjs.com and place your keys here
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
      // Simulate submission & log setup guidance
      setTimeout(() => {
        const completionTime = new Date().toLocaleTimeString();
        setFormLogs(prev => [
          ...prev,
          `[${completionTime}] Dispatching packet data...`,
          `[${completionTime}] SECURE PORT 443 RESPONSE: SUCCESS! (SIMULATED)`,
          `[${completionTime}] Handshake finalized. Transmission secured for ${formName.toUpperCase()}.`,
          `[${completionTime}] 💡 TIP: Set your EmailJS keys in App.jsx to receive real emails.`
        ]);
        setIsTransmitting(false);
        setFormName('');
        setFormEmail('');
        setFormMsg('');
      }, 1800);
    } else {
      // Live EmailJS dispatch
      emailjs.send(
        serviceId,
        templateId,
        {
          name: formName,
          email: formEmail,
          message: formMsg
        },
        publicKey
      )
      .then(() => {
        const completionTime = new Date().toLocaleTimeString();
        setFormLogs(prev => [
          ...prev,
          `[${completionTime}] Dispatching live socket packet...`,
          `[${completionTime}] EmailJS API Response: 200 OK`,
          `[${completionTime}] Transmission completed! Message sent successfully.`
        ]);
        setIsTransmitting(false);
        setFormName('');
        setFormEmail('');
        setFormMsg('');
      })
      .catch((err) => {
        const errorTime = new Date().toLocaleTimeString();
        setFormLogs(prev => [
          ...prev,
          `[${errorTime}] ❌ TRANSMISSION FAILURE: Connection refused.`,
          `[${errorTime}] Error: ${err.text || err.message || 'Unknown network response'}`
        ]);
        setIsTransmitting(false);
      });
    }
  };

  // Section scroll action helper
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveTab(id);
  };

  return (
    <div className="app-container">
      {/* Background aurora spots */}
      <div className="grid-bg" />
      <div className="aurora-glow-1" />
      <div className="aurora-glow-2" />
      <div className="aurora-glow-3" />
      
      <canvas ref={threeCanvasRef} className="three-canvas" />
      <canvas ref={pointerCanvasRef} className="pointer-canvas" />

      {/* Vertical Scroll Progress Tracker (Right sidebar) */}
      <div className="scroll-progress-container">
        <div className="scroll-track-line" />
        <div 
          className="scroll-track-fill" 
          style={{ height: `${scrollProgress}%` }}
        />
        {[
          { id: 'hero', label: 'Home', class: 'hero-node' },
          { id: 'about', label: 'About', class: 'about-node' },
          { id: 'hackathons', label: 'Experience', class: 'hackathons-node' },
          { id: 'projects', label: 'Projects', class: 'projects-node' },
          { id: 'contact', label: 'Contact', class: 'contact-node' }
        ].map((node) => (
          <div 
            key={node.id} 
            className={`scroll-node clickable ${node.class} ${activeTab === node.id ? 'active' : ''}`}
            onClick={() => scrollToSection(node.id)}
          >
            <div className="scroll-node-tooltip">{node.label}</div>
          </div>
        ))}
      </div>

      {/* Floating Navbar */}
      <nav className="navbar">
        <div className="logo-text clickable" onClick={() => scrollToSection('hero')}>
          KRISHNA GUPTA
        </div>
        <ul className="nav-links">
          {['hero', 'about', 'hackathons', 'projects', 'contact'].map((section) => (
            <li key={section}>
              <a 
                href={`#${section}`} 
                className={`nav-link clickable ${activeTab === section ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section);
                }}
              >
                {section.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="section">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-content"
        >
          <div className="hero-subtitle">
            B.Tech in Artificial Intelligence & Data Science
          </div>
          
          <h1 className="hero-title">
            Engineering <span>Next-Gen</span> AI Interfaces & Automation.
          </h1>
          
          <p className="hero-desc">
            Developing responsive systems that merge computer vision, vector search logic, and geo-hazard warnings for human-centered impacts.
          </p>
          
          <div className="hero-btns">
            <button 
              className="btn-neon clickable"
              onClick={() => scrollToSection('projects')}
            >
              EXPLORE PROJECTS
            </button>
            <button 
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '14px 32px',
                borderRadius: '10px',
                fontWeight: 600,
                color: 'var(--text-bright)',
                fontSize: '15px'
              }}
              className="clickable"
              onClick={() => scrollToSection('about')}
            >
              ABOUT ME
            </button>
          </div>

          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-number">99.4%</span>
              <span className="metric-label">Embedding Precision</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">&lt; 3 Sec</span>
              <span className="metric-label">Disaster Warning Delivery</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">30 FPS</span>
              <span className="metric-label">HCI Gesture Tracking</span>
            </div>
          </div>
        </motion.div>
        
        <div className="scroll-indicator">
          <span>SCROLL DOWN</span>
          <div className="mouse-icon">
            <div className="mouse-wheel" />
          </div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* About Section */}
      <section id="about" className="section">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%' }}
        >
          <div className="section-header">
            <h2>About Me</h2>
            <div className="divider-line" />
          </div>

          <div className="about-grid">
            <div className="glass-panel about-card">
              <h3 className="about-title">Academic & Technical Focus</h3>
              <p className="about-desc">
                I am an AI and Machine Learning engineer pursuing my B.Tech at <span className="about-highlight">Arya College of Engineering & IT</span> (2024 - 2028). I specialize in designing systems that translate deep learning concepts into touchless human-computer interface widgets.
              </p>
              <p className="about-desc">
                From building high-precision face recognition models mapping millions of vector points in Qdrant, to early alert responders mapping early indicators of hazard, my focus is creating solutions that work at scale.
              </p>
              
              <div className="skills-container">
                {SKILLS.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    <Sparkles size={14} className="glow-text-teal" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="glass-panel interactive-canvas-card clickable">
              <canvas ref={skillCanvasRef} style={{ width: '100%', height: '100%' }} />
              <div className="canvas-hint">Drag tags to spin 3D skill globe</div>
            </div>
          </div>

          {/* Live Hacker Terminal Diagnostic Console */}
          <div className="terminal-widget">
            <div className="terminal-header">
              <span className="terminal-dot dot-red" />
              <span className="terminal-dot dot-yellow" />
              <span className="terminal-dot dot-green" />
              <span className="terminal-title">krishna@ai-diagnostics:~</span>
            </div>
            <div className="terminal-body">
              {terminalOutput.map((log, idx) => (
                <div key={idx}>
                  <span className="terminal-prompt">$</span> {log}
                </div>
              ))}
              {terminalIndex < TERMINAL_LOGS.length && (
                <div>
                  <span className="terminal-prompt">$</span> running diagnostic check...
                  <span className="terminal-cursor">█</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      <div className="cyber-divider" />

      {/* Hackathons & Experience Section */}
      <section id="hackathons" className="section">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="timeline-section"
        >
          <div className="section-header">
            <h2>Hackathons & Accomplishments</h2>
            <div className="divider-line" />
          </div>

          <div className="timeline-grid">
            {HACKATHONS.map((h, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-panel timeline-card"
              >
                <div>
                  <div className="timeline-role">{h.role}</div>
                  <h3 className="timeline-name">{h.name}</h3>
                  <p className="timeline-desc">{h.desc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '25px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <Users size={14} style={{ color: 'var(--neon-purple)' }} /> Organization Team & Participant
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="cyber-divider" />

      {/* Projects Section */}
      <section id="projects" className="section">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div className="projects-header">
            <div className="section-header">
              <h2>Featured Projects</h2>
              <div className="divider-line" />
            </div>
            <p className="projects-subtitle" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '16px', marginTop: '-50px', marginBottom: '50px' }}>Applied deep learning and systems development</p>
          </div>

          <div className="projects-grid">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`glass-panel project-card ${project.id} clickable`}
                onClick={() => setSelectedProject(project)}
              >
                <div>
                  <div className="project-meta">
                    <span className="project-category">{project.category}</span>
                    <div className="project-tech-badges">
                      {project.tech.slice(0, 3).map((t, index) => (
                        <span key={index} className="tech-badge">{t}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-desc">{project.desc}</p>
                </div>
                
                <button className="project-action-btn clickable">
                  <Eye size={16} /> VIEW DETAILS & INTERACTION
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="cyber-divider" />

      {/* Upgraded Contact Section */}
      <section id="contact" className="section">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div className="section-header">
            <h2>Get In Touch</h2>
            <div className="divider-line" />
          </div>

          <div className="contact-grid">
            {/* Left Column: Cybernetic Transmission Form */}
            <div className="glass-panel contact-form-panel">
              <h3 className="form-title">Send a Transmission</h3>
              <p className="form-subtitle">Initialize secure socket handshake and submit your feedback/inquiry.</p>
              
              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label>Ident/Name</label>
                  <input 
                    type="text" 
                    value={formName} 
                    onChange={(e) => setFormName(e.target.value)} 
                    placeholder="Enter your name..." 
                    className="form-input clickable"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Vector</label>
                  <input 
                    type="email" 
                    value={formEmail} 
                    onChange={(e) => setFormEmail(e.target.value)} 
                    placeholder="name@domain.com" 
                    className="form-input clickable"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Message Content</label>
                  <textarea 
                    value={formMsg} 
                    onChange={(e) => setFormMsg(e.target.value)} 
                    placeholder="Write details of inquiry..." 
                    className="form-input clickable"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isTransmitting}
                  className="btn-neon form-submit-btn clickable"
                >
                  {isTransmitting ? 'TRANSMITTING...' : '⚡ DISPATCH ENCRYPTED MESSAGE'}
                </button>
              </form>

              {/* Simulated encryption terminal logs */}
              <div className="form-status-console" ref={formLogsRef}>
                <div style={{ color: 'var(--neon-teal)', fontWeight: 'bold', marginBottom: '4px' }}>TRANSMISSION TERMINAL LOG:</div>
                {formLogs.map((log, idx) => (
                  <div key={idx} style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2px' }}>
                    <span style={{ color: 'var(--neon-purple)' }}>&gt;</span> {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Direct Info Links */}
            <div className="glass-panel contact-info-panel">
              <div>
                <h3 className="form-title" style={{ fontSize: '28px' }}>Direct Coordinates</h3>
                <p className="form-subtitle">For urgent developer collaborations, internships, and direct sync pathways.</p>
              </div>

              <div className="socials-column">
                <a href="https://linkedin.com/in/krishna-gupta333" target="_blank" className="social-btn linkedin clickable">
                  <Linkedin size={22} style={{ color: '#0077b5' }} /> 
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold' }}>LinkedIn</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>krishna-gupta333</div>
                  </div>
                  <span>CONNECT ↗</span>
                </a>
                
                <a href="https://instagram.com/1k.r.i.s.h.n.a._" target="_blank" className="social-btn instagram clickable">
                  <Instagram size={22} style={{ color: '#e4405f' }} />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold' }}>Instagram</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>1k.r.i.s.h.n.a._</div>
                  </div>
                  <span>FOLLOW ↗</span>
                </a>
                
                <a href="mailto:16krishnagupta06@gmail.com" className="social-btn email clickable">
                  <Mail size={22} style={{ color: 'var(--neon-teal)' }} />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold' }}>Email Address</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>16krishnagupta06@gmail.com</div>
                  </div>
                  <span>WRITE ⚡</span>
                </a>
                
                <a href="tel:8955915536" className="social-btn phone clickable">
                  <Phone size={22} style={{ color: 'var(--neon-purple)' }} />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold' }}>Direct Call Vector</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>+91 8955915536</div>
                  </div>
                  <span>DIAL 📞</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Modal Details Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => {
              setSelectedProject(null);
              setSimActive(false);
              setSdaActiveAlert(false);
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="glass-panel modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="close-btn clickable" 
                onClick={() => {
                  setSelectedProject(null);
                  setSimActive(false);
                  setSdaActiveAlert(false);
                }}
              >
                <X size={24} />
              </button>

              <span className="project-category" style={{ color: selectedProject.color }}>
                {selectedProject.category}
              </span>
              <h2 className="project-name" style={{ fontSize: '36px', marginTop: '10px' }}>
                {selectedProject.name}
              </h2>
              
              <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
                {selectedProject.tech.map((t, idx) => (
                  <span key={idx} className="tech-badge" style={{ fontSize: '12px', padding: '4px 10px' }}>
                    {t}
                  </span>
                ))}
              </div>

              <p className="about-desc" style={{ fontSize: '16px' }}>
                {selectedProject.longDesc}
              </p>

              {/* ZeroTouchSec Interactive Simulator */}
              {selectedProject.id === 'zerotouchsec' && (
                <div className="gesture-simulator-panel">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 className="simulator-title" style={{ color: 'var(--neon-teal)' }}>🖐️ ZeroTouchSec Interactive Simulator</h4>
                    <button 
                      className="btn-neon clickable"
                      style={{ padding: '4px 12px', fontSize: '12px' }}
                      onClick={() => setSimActive(prev => !prev)}
                    >
                      {simActive ? 'DISABLE SIMULATION' : 'LAUNCH SIMULATOR'}
                    </button>
                  </div>
                  
                  {simActive ? (
                    <div 
                      className="simulation-zone clickable"
                      onMouseMove={handleSimulatorMouseMove}
                      onMouseLeave={handleSimulatorMouseLeave}
                    >
                      <div style={{ width: '100%', textAlign: 'center', zIndex: 2, color: '#fff' }}>
                        <h3 style={{ fontSize: '20px', textShadow: '0 0 10px rgba(0, 245, 212, 0.8)' }}>
                          Gesture Command: <span style={{ color: 'var(--neon-teal)' }}>{detectedGesture}</span>
                        </h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '5px' }}>
                          Hover coordinates: Left/Right to Swipe, Top to Play/Pause, Bottom to Mute, Center scales Volume.
                        </p>
                      </div>

                      <div 
                        className="glass-panel"
                        style={{
                          width: '280px',
                          padding: '15px',
                          marginTop: '20px',
                          zIndex: 2,
                          border: '1px solid rgba(0, 245, 212, 0.2)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <div 
                            style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '8px',
                              background: `linear-gradient(45deg, ${simSlide === 0 ? '#00f5d4' : simSlide === 1 ? '#bd00ff' : '#ff007f'}, #222)`,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Hand size={24} />
                          </div>
                          <div style={{ textAlign: 'left', flexGrow: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>
                              {simSlide === 0 ? 'Gesture Command 01' : simSlide === 1 ? 'Surveillance Track B' : 'Gesture Override Mode'}
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                              Touchless Media Control
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                          <span style={{ fontSize: '10px' }}>VOL: {simVolume}%</span>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {simPlaying ? <Play size={14} className="glow-text-teal" /> : <Pause size={14} />}
                            {simVolume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="simulation-zone" style={{ background: 'rgba(0,0,0,0.3)' }}>
                      <Hand size={48} className="float-animation" style={{ color: 'rgba(0, 245, 212, 0.25)', marginBottom: '15px' }} />
                      <p className="simulation-cursor-hint">
                        Click "LAUNCH SIMULATOR" to simulate camera hand-tracking using mouse paths.
                      </p>
                    </div>
                  )}
                  
                  <div className="gesture-status-bar">
                    <span>Virtual Pipeline: <span className="status-value">Ready</span></span>
                    <span>FPS: <span className="status-value">30.0</span></span>
                  </div>
                </div>
              )}

              {/* Smart Campus Attendance Simulator */}
              {selectedProject.id === 'attendance' && (
                <div className="gesture-simulator-panel" style={{ border: '1px solid rgba(189, 0, 255, 0.2)' }}>
                  <h4 className="simulator-title" style={{ color: '#bd00ff' }}>📊 AI Campus Attendance Tracker Console</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '15px', marginTop: '15px' }}>
                    <div 
                      style={{
                        height: '180px',
                        background: '#020308',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      <div 
                        style={{
                          width: '100px',
                          height: '100px',
                          border: '2px solid #bd00ff',
                          position: 'absolute',
                          boxShadow: '0 0 15px rgba(189, 0, 255, 0.3)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          padding: '2px'
                        }}
                      >
                        <span style={{ fontSize: '8px', background: '#bd00ff', color: '#fff', padding: '1px 3px' }}>
                          KRISHNA GUPTA 99.4%
                        </span>
                      </div>
                      <Tv size={48} style={{ opacity: 0.15 }} />
                      <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '9px', color: '#bd00ff' }}>
                        🔴 LIVE FEED // CLASS_ROOM_ACCESS_A
                      </div>
                    </div>

                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: '13px' }}>
                        <div style={{ fontWeight: 'bold', color: '#fff', marginBottom: '5px' }}>Recognition Database Log</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          • Model output: L2-Normalized (512-dim)
                          <br />• Index resolution: 1280x1280
                          <br />• Search latency: 0.82 ms
                        </div>
                      </div>

                      <div 
                        className="glass-panel" 
                        style={{
                          padding: '10px',
                          border: '1px solid rgba(189, 0, 255, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <CheckCircle2 size={18} style={{ color: '#00f5d4' }} />
                        <div style={{ fontSize: '11px' }}>
                          Attendance registered successfully for <strong style={{ color: '#fff' }}>Krishna Gupta</strong>!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SDA early Warning System Simulator */}
              {selectedProject.id === 'sda' && (
                <div className="gesture-simulator-panel" style={{ border: '1px solid rgba(255, 0, 127, 0.2)' }}>
                  <h4 className="simulator-title" style={{ color: '#ff007f' }}>🚨 Smart Disaster Agent Warning Broadcast Panel</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '20px', marginTop: '15px' }}>
                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Select Hazard Category</label>
                        <select 
                          value={sdaDisasterType} 
                          onChange={(e) => setSdaDisasterType(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '6px',
                            color: '#fff',
                            marginTop: '4px'
                          }}
                          className="clickable"
                        >
                          <option value="Flood Warning">🌊 Flood Warning</option>
                          <option value="Seismic Earthquake">🫨 Seismic Earthquake</option>
                          <option value="Forest Fire Access B">🔥 Forest Fire Zone C</option>
                          <option value="Landslide Trigger A">⛰️ Landslide Trigger A</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Danger Radius: {sdaAlertRadius} km</label>
                        <input 
                          type="range" 
                          min="5" 
                          max="50" 
                          value={sdaAlertRadius} 
                          onChange={(e) => setSdaAlertRadius(e.target.value)}
                          style={{ width: '100%', marginTop: '4px' }}
                          className="clickable"
                        />
                      </div>

                      <button 
                        onClick={triggerSdaAlert}
                        className="btn-neon clickable"
                        style={{ padding: '10px', fontSize: '12px', border: '1px solid var(--neon-pink)', color: '#fff', width: '100%' }}
                      >
                        ⚠️ DISPATCH EARLY BROADCAST
                      </button>
                    </div>

                    <div 
                      style={{
                        background: '#020308',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        padding: '15px',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        textAlign: 'left',
                        height: '180px',
                        overflowY: 'auto'
                      }}
                    >
                      <div style={{ color: '#ff007f', fontWeight: 'bold', marginBottom: '8px' }}>DISPATCH LOGS:</div>
                      {sdaActiveAlert ? (
                        sdaBroadcastLogs.map((log, idx) => <div key={idx} style={{ marginBottom: '4px' }}>{log}</div>)
                      ) : (
                        <div style={{ color: 'var(--text-muted)' }}>Waiting for alert dispatch simulation...</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
