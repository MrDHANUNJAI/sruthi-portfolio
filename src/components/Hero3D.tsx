import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sparkles, ArrowRight, Download, Eye, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface Hero3DProps {
  onExplore: () => void;
  onOpenContact: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onExplore, onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [activeMaterialPreset, setActiveMaterialPreset] = useState<'violet' | 'gold' | 'chrome'>('violet');
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    group: THREE.Group;
    torusKnot: THREE.Mesh;
    floatingRings: THREE.Mesh[];
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Software WebGL detection
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch (e) {
        return true;
      }
    })();

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x17131F);
    scene.fog = new THREE.FogExp2(0x17131F, 0.035);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.5, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0ea, 2.2);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0x7446F5, 0x17131F, 1.5);
    scene.add(fillLight);

    // Composite 3-12 Part Procedural Model Group (Digital Marketing Ecosystem sculpture)
    const group = new THREE.Group();

    // Primary central torus knot (Creative strategy core)
    const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.38, 128, 32);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x7446F5,
      metalness: 0.85,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      anisotropy: 0.8,
    });
    const torusKnot = new THREE.Mesh(knotGeo, knotMat);
    torusKnot.castShadow = true;
    torusKnot.receiveShadow = true;
    group.add(torusKnot);

    // Secondary orbiting rings (Meta Ads & Social channels)
    const floatingRings: THREE.Mesh[] = [];
    const ringGeos = [
      new THREE.TorusGeometry(2.0, 0.04, 16, 100),
      new THREE.TorusGeometry(2.6, 0.03, 16, 100),
      new THREE.TorusGeometry(3.2, 0.02, 16, 100),
    ];

    ringGeos.forEach((geo, index) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: index === 0 ? 0xC5A6FF : index === 1 ? 0x9260F6 : 0xFFFFFF,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      group.add(ring);
      floatingRings.push(ring);
    });

    scene.add(group);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      group,
      torusKnot,
      floatingRings,
    };

    // Animation Loop with Software WebGL Guard
    let animationFrameId: number;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          animationFrameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          animationFrameId = window.setTimeout(cb, 80);
        }
      };
      animationFrameId = window.setTimeout(poll, 5);
    }

    const animate = () => {
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      // Rotate group and rings gracefully
      group.rotation.y = time * 0.25;
      group.rotation.x = Math.sin(time * 0.15) * 0.2;

      floatingRings.forEach((ring, i) => {
        ring.rotation.x += dt * (0.2 + i * 0.1);
        ring.rotation.y += dt * (0.15 - i * 0.05);
      });

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !sceneRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Change material preset
  const handleMaterialChange = (preset: 'violet' | 'gold' | 'chrome') => {
    setActiveMaterialPreset(preset);
    if (!sceneRef.current) return;
    const { torusKnot } = sceneRef.current;
    const mat = torusKnot.material as THREE.MeshPhysicalMaterial;
    if (preset === 'violet') {
      mat.color.setHex(0x7446F5);
      mat.metalness = 0.85;
      mat.roughness = 0.15;
    } else if (preset === 'gold') {
      mat.color.setHex(0xE5C158);
      mat.metalness = 0.95;
      mat.roughness = 0.1;
    } else if (preset === 'chrome') {
      mat.color.setHex(0xCCCCCC);
      mat.metalness = 1.0;
      mat.roughness = 0.05;
    }
  };

  return (
    <section id="home" className="relative w-full h-screen min-h-[750px] overflow-hidden bg-[#17131F]">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-auto" />

      {/* Atmospheric gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#17131F] via-[#17131F]/40 to-transparent z-10 pointer-events-none" />

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start pt-20 pb-24 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7446F5]/20 border border-[#7446F5]/40 text-[#C5A6FF] text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4 text-[#C5A6FF]" />
            <span>Digital Marketing Executive & Content Creator</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#F5F1FA] tracking-tight leading-[1.1] mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A6FF] via-[#9260F6] to-[#7446F5]">{PERSONAL_INFO.name}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl text-[#C5A6FF]/90 font-medium mb-4 leading-snug">
            {PERSONAL_INFO.title}
          </p>

          <p className="text-sm sm:text-base text-[#F5F1FA]/70 mb-8 max-w-2xl leading-relaxed">
            {PERSONAL_INFO.summary}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExplore}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#7446F5] to-[#9260F6] text-white font-semibold text-sm sm:text-base shadow-xl shadow-[#7446F5]/40 hover:shadow-[#7446F5]/70 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenContact}
              className="px-8 py-4 rounded-full bg-[#231B30]/80 backdrop-blur-md border border-[#7446F5]/40 text-[#F5F1FA] font-semibold text-sm sm:text-base hover:bg-[#7446F5]/20 hover:border-[#7446F5] transition-all flex items-center gap-3"
            >
              <span>Let's Collaborate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unified Bottom Control Dock (Following Three.js guidelines) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 w-[94%] max-w-[840px] pointer-events-auto">
        <div className="bg-[#17131F]/85 backdrop-blur-xl border border-[#7446F5]/30 rounded-2xl p-3 shadow-2xl shadow-black/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#C5A6FF]" />
            <span className="text-xs sm:text-sm font-semibold text-[#F5F1FA]">3D Interactive Core</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#C5A6FF]/80 hidden sm:inline">Material Finish:</span>
            <button
              onClick={() => handleMaterialChange('violet')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeMaterialPreset === 'violet' ? 'bg-[#7446F5] text-white shadow' : 'bg-[#231B30] text-[#C5A6FF] hover:bg-[#7446F5]/20'
              }`}
            >
              Deep Violet
            </button>
            <button
              onClick={() => handleMaterialChange('gold')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeMaterialPreset === 'gold' ? 'bg-[#E5C158] text-[#17131F] shadow' : 'bg-[#231B30] text-[#C5A6FF] hover:bg-[#7446F5]/20'
              }`}
            >
              Luxury Gold
            </button>
            <button
              onClick={() => handleMaterialChange('chrome')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeMaterialPreset === 'chrome' ? 'bg-[#CCCCCC] text-[#17131F] shadow' : 'bg-[#231B30] text-[#C5A6FF] hover:bg-[#7446F5]/20'
              }`}
            >
              Platinum
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
