import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  CSS3DObject,
  CSS3DRenderer,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import Face from "./Face";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import ContactSection from "./sections/ContactSection";

const LATERAL_FACES = ["front", "right", "back", "left"];
const DIRECTION_ICONS = {
  up: "\u2191",
  down: "\u2193",
  left: "\u2190",
  right: "\u2192",
};

const FACE_ROTATIONS = {
  front: { x: 0, y: 0 },
  back: { x: 0, y: Math.PI },
  left: { x: 0, y: Math.PI / 2 },
  right: { x: 0, y: -Math.PI / 2 },
  top: { x: Math.PI / 2, y: 0 },
  bottom: { x: -Math.PI / 2, y: 0 },
};

const createFaceTransforms = (distance) => ({
  front: { position: [0, 0, distance], rotation: [0, 0, 0] },
  back: { position: [0, 0, -distance], rotation: [0, Math.PI, 0] },
  left: { position: [-distance, 0, 0], rotation: [0, -Math.PI / 2, 0] },
  right: { position: [distance, 0, 0], rotation: [0, Math.PI / 2, 0] },
  top: { position: [0, distance, 0], rotation: [-Math.PI / 2, 0, 0] },
  bottom: { position: [0, -distance, 0], rotation: [Math.PI / 2, 0, 0] },
});

const interpolateAngle = (current, target, factor) => {
  let delta = target - current;
  delta = ((delta + Math.PI) % (Math.PI * 2)) - Math.PI;
  return current + delta * factor;
};

const getClockwiseFace = (face) => {
  const index = LATERAL_FACES.indexOf(face);
  return LATERAL_FACES[(index + 1) % LATERAL_FACES.length];
};

const getCounterClockwiseFace = (face) => {
  const index = LATERAL_FACES.indexOf(face);
  return LATERAL_FACES[
    (index + LATERAL_FACES.length - 1) % LATERAL_FACES.length
  ];
};

const getOppositeFace = (face) => {
  const index = LATERAL_FACES.indexOf(face);
  return LATERAL_FACES[(index + 2) % LATERAL_FACES.length];
};

const getAdjacentFace = (face, direction, verticalContext) => {
  if (LATERAL_FACES.includes(face)) {
    if (direction === "up") {
      return "top";
    }

    if (direction === "down") {
      return "bottom";
    }

    if (direction === "left") {
      return getCounterClockwiseFace(face);
    }

    return getClockwiseFace(face);
  }

  const contextFace = verticalContext || "front";
  const clockwise = getClockwiseFace(contextFace);
  const counterClockwise = getCounterClockwiseFace(contextFace);
  const opposite = getOppositeFace(contextFace);

  if (face === "top") {
    if (direction === "down") {
      return contextFace;
    }

    if (direction === "up") {
      return opposite;
    }

    if (direction === "left") {
      return counterClockwise;
    }

    return clockwise;
  }

  if (direction === "up") {
    return contextFace;
  }

  if (direction === "down") {
    return opposite;
  }

  if (direction === "left") {
    return counterClockwise;
  }

  return clockwise;
};

export default function Cube({ portfolio }) {
  const mountRef = useRef(null);
  const cssFacesRef = useRef(new Map());
  const cssCubeGroupRef = useRef(null);
  const currentQuaternionRef = useRef(new THREE.Quaternion());
  const activeFaceRef = useRef("front");
  const verticalContextRef = useRef("front");
  const targetQuaternionRef = useRef(new THREE.Quaternion());
  const [activeFace, setActiveFace] = useState("front");
  const [verticalContext, setVerticalContext] = useState("front");

  const faceEntries = useMemo(
    () => [
      {
        key: "front",
        label: "About Me",
        content: <AboutSection data={portfolio.about} />,
      },
      {
        key: "back",
        label: "Projects",
        content: <ProjectsSection projects={portfolio.projects} />,
      },
      {
        key: "left",
        label: "Skills",
        content: <SkillsSection skills={portfolio.skills} />,
      },
      {
        key: "right",
        label: "Experience",
        content: <ExperienceSection experience={portfolio.experience} />,
      },
      {
        key: "top",
        label: "Education",
        content: <EducationSection education={portfolio.education} />,
      },
      {
        key: "bottom",
        label: "Contact",
        content: <ContactSection contact={portfolio.contact} />,
      },
    ],
    [portfolio],
  );

  useEffect(() => {
    activeFaceRef.current = activeFace;
  }, [activeFace]);

  useEffect(() => {
    verticalContextRef.current = verticalContext;
  }, [verticalContext]);

  const setTargetQuaternionForFace = (targetFace) => {
    const euler = new THREE.Euler(
      FACE_ROTATIONS[targetFace].x,
      FACE_ROTATIONS[targetFace].y,
      0,
      "XYZ",
    );

    targetQuaternionRef.current.copy(
      new THREE.Quaternion().setFromEuler(euler),
    );
  };

  const applyDirectionalRotation = (direction) => {
    // ✅ World-space axes — NEVER transform these by the cube quaternion.
    // premultiply handles the orientation accumulation automatically.
    const worldAxes = {
      up: new THREE.Vector3(1, 0, 0), // pitch up = rotate around world +X
      down: new THREE.Vector3(-1, 0, 0), // pitch down = rotate around world -X
      left: new THREE.Vector3(0, 1, 0), // yaw left = rotate around world +Y
      right: new THREE.Vector3(0, -1, 0), // yaw right = rotate around world -Y
    };

    const axis = worldAxes[direction]; // ✅ pure world axis, no quaternion transform

    const angle = Math.PI / 2; // always 90°, sign is baked into axis direction above

    const stepQuaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle);

    // premultiply = apply this rotation in WORLD space BEFORE existing orientation
    targetQuaternionRef.current.premultiply(stepQuaternion).normalize();

    // console.log(`  🔧 applyDirectionalRotation("${direction}")`);
    // console.log(`     World axis: (${axis.x}, ${axis.y}, ${axis.z})`);
    // console.log(`     Rotating 90° around world axis`);
    // console.log(
    //   `     New targetQ: x=${targetQuaternionRef.current.x.toFixed(4)} y=${targetQuaternionRef.current.y.toFixed(4)} z=${targetQuaternionRef.current.z.toFixed(4)} w=${targetQuaternionRef.current.w.toFixed(4)}`,
    // );
    // console.log(
    //   `     → Z component should stay ~0 for lateral/vertical moves. If not, axis is wrong.`,
    // );
  };

  const navigateToFace = (targetFace, options = {}) => {
    const { preserveOrientation = false } = options;
    const currentFace = activeFaceRef.current;
    const currentContext = verticalContextRef.current;

    if (targetFace === "top" || targetFace === "bottom") {
      const nextContext = LATERAL_FACES.includes(currentFace)
        ? currentFace
        : currentContext;

      setVerticalContext(nextContext);
      setActiveFace(targetFace);
    } else {
      setVerticalContext(targetFace);
      setActiveFace(targetFace);
    }

    if (!preserveOrientation) {
      setTargetQuaternionForFace(targetFace);
    }
  };

  const directionVectors = {
    up: new THREE.Vector3(0, 1, 0),
    down: new THREE.Vector3(0, -1, 0),
    left: new THREE.Vector3(-1, 0, 0),
    right: new THREE.Vector3(1, 0, 0),
  };

  const faceNormals = {
    front: new THREE.Vector3(0, 0, 1),
    back: new THREE.Vector3(0, 0, -1),
    left: new THREE.Vector3(-1, 0, 0),
    right: new THREE.Vector3(1, 0, 0),
    top: new THREE.Vector3(0, 1, 0),
    bottom: new THREE.Vector3(0, -1, 0),
  };

  const handleDirectionalMove = (direction) => {
    const faceNormalsLocal = {
      front: new THREE.Vector3(0, 0, 1),
      back: new THREE.Vector3(0, 0, -1),
      left: new THREE.Vector3(-1, 0, 0),
      right: new THREE.Vector3(1, 0, 0),
      top: new THREE.Vector3(0, 1, 0),
      bottom: new THREE.Vector3(0, -1, 0),
    };
    const screenDirections = {
      up: new THREE.Vector3(0, 1, 0),
      down: new THREE.Vector3(0, -1, 0),
      left: new THREE.Vector3(-1, 0, 0),
      right: new THREE.Vector3(1, 0, 0),
    };

    const targetQ = targetQuaternionRef.current;
    const screenDir = screenDirections[direction];

    // console.group(`🎯 handleDirectionalMove("${direction}")`);
    // console.log("📐 Target Quaternion:", {
    //   x: targetQ.x.toFixed(4),
    //   y: targetQ.y.toFixed(4),
    //   z: targetQ.z.toFixed(4),
    //   w: targetQ.w.toFixed(4),
    // });
    // console.log("🖥️ Screen Direction:", screenDir);

    let bestFace = "front";
    let maxDot = -Infinity;

    Object.entries(faceNormalsLocal).forEach(([face, localNormal]) => {
      const worldNormal = localNormal.clone().applyQuaternion(targetQ);
      const dot = worldNormal.dot(screenDir);
      // console.log(
      //   `  Face: ${face.padEnd(6)} | world: (${worldNormal.x.toFixed(3)}, ${worldNormal.y.toFixed(3)}, ${worldNormal.z.toFixed(3)}) | dot: ${dot.toFixed(4)}`,
      // );
      if (dot > maxDot) {
        maxDot = dot;
        bestFace = face;
      }
    });

    // console.log(`✅ Best face: "${bestFace}" (dot=${maxDot.toFixed(4)})`);

    // Apply rotation FIRST (uses targetQ before it changes)
    applyDirectionalRotation(direction);

    // console.log("🔄 New targetQ after rotation:", {
    //   x: targetQuaternionRef.current.x.toFixed(4),
    //   y: targetQuaternionRef.current.y.toFixed(4),
    //   z: targetQuaternionRef.current.z.toFixed(4),
    //   w: targetQuaternionRef.current.w.toFixed(4),
    // });
    // console.log(
    //   `⚠️  Z component: ${targetQuaternionRef.current.z.toFixed(4)} — should be ~0 for clean rotations`,
    // );

    navigateToFace(bestFace, { preserveOrientation: true });
    // console.log(`📍 navigateToFace: "${bestFace}"`);
    // console.groupEnd();
  };

  useEffect(() => {
    const mountNode = mountRef.current;

    if (!mountNode) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const cssScene = new THREE.Scene();
    const currentQuaternion = currentQuaternionRef.current;
    const faceWorldQuaternion = new THREE.Quaternion();
    const faceNormalWorld = new THREE.Vector3();
    const faceUpWorld = new THREE.Vector3();
    const desiredUpWorld = new THREE.Vector3();
    const rotationCross = new THREE.Vector3();
    const screenUpWorld = new THREE.Vector3(0, 1, 0);
    const camera = new THREE.PerspectiveCamera(
      42,
      mountNode.clientWidth / mountNode.clientHeight,
      0.1,
      2000,
    );
    camera.position.set(0, 0, 720);
    targetQuaternionRef.current.identity();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);

    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.inset = "0";
    cssRenderer.domElement.style.pointerEvents = "none";

    mountNode.appendChild(renderer.domElement);
    mountNode.appendChild(cssRenderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x6ad9ff, 1.4);
    const pointLight = new THREE.PointLight(0x58f6ff, 5, 1200);
    pointLight.position.set(240, 260, 440);
    const fillLight = new THREE.PointLight(0x2458ff, 2.5, 900);
    fillLight.position.set(-280, -220, 260);
    scene.add(ambientLight, pointLight, fillLight);

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 550;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1200;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0x58f6ff,
        size: 2.2,
        transparent: true,
        opacity: 0.7,
      }),
    );
    scene.add(particles);

    const webglCubeGroup = new THREE.Group();
    const cssCubeGroup = new THREE.Group();
    cssCubeGroupRef.current = cssCubeGroup;
    scene.add(webglCubeGroup);
    cssScene.add(cssCubeGroup);

    const cubeSize = 320;
    const faceDistance = cubeSize / 2;
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x061425,
      emissive: 0x0f6ea3,
      emissiveIntensity: 0.28,
      transparent: true,
      opacity: 0.18,
      metalness: 0.75,
      roughness: 0.15,
      transmission: 0.25,
    });
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    webglCubeGroup.add(cubeMesh);

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(cubeGeometry),
      new THREE.LineBasicMaterial({
        color: 0x58f6ff,
        transparent: true,
        opacity: 0,
      }),
    );
    webglCubeGroup.add(edges);

    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(
        new THREE.BoxGeometry(cubeSize + 18, cubeSize + 18, cubeSize + 18),
      ),
      new THREE.LineBasicMaterial({
        color: 0x2b74ff,
        transparent: true,
        opacity: 0.22,
      }),
    );
    webglCubeGroup.add(frame);

    const transforms = createFaceTransforms(faceDistance + 2);
    const faceObjects = new Map();

    faceEntries.forEach((face) => {
      const element = cssFacesRef.current.get(face.key);

      if (!element) {
        return;
      }

      element.style.pointerEvents = "auto";

      const object = new CSS3DObject(element);
      const transform = transforms[face.key];
      object.position.set(...transform.position);
      object.rotation.set(...transform.rotation);
      cssCubeGroup.add(object);
      faceObjects.set(face.key, object);
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const faceNormals = [
      { name: "front", normal: new THREE.Vector3(0, 0, 1) },
      { name: "back", normal: new THREE.Vector3(0, 0, -1) },
      { name: "left", normal: new THREE.Vector3(-1, 0, 0) },
      { name: "right", normal: new THREE.Vector3(1, 0, 0) },
      { name: "top", normal: new THREE.Vector3(0, 1, 0) },
      { name: "bottom", normal: new THREE.Vector3(0, -1, 0) },
    ];

    const onPointerDown = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      const [intersection] = raycaster.intersectObject(cubeMesh, false);

      if (!intersection) {
        return;
      }

      const localNormal = intersection.face.normal.clone();
      const worldNormal = localNormal.transformDirection(cubeMesh.matrixWorld);

      let nearestFace = "front";
      let maxDot = -Infinity;

      faceNormals.forEach((face) => {
        const dot = worldNormal.dot(face.normal);
        if (dot > maxDot) {
          maxDot = dot;
          nearestFace = face.name;
        }
      });

      navigateToFace(nearestFace);
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    let pointerStartX = 0;
    let pointerStartY = 0;

    const onTouchStart = (event) => {
      const touch = event.touches[0];
      pointerStartX = touch.clientX;
      pointerStartY = touch.clientY;
    };

    const onTouchEnd = (event) => {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - pointerStartX;
      const deltaY = touch.clientY - pointerStartY;

      if (Math.abs(deltaX) < 45 && Math.abs(deltaY) < 45) {
        return;
      }

      if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        handleDirectionalMove(deltaX < 0 ? "right" : "left");
      } else {
        handleDirectionalMove(deltaY < 0 ? "down" : "up");
      }
    };

    mountNode.addEventListener("touchstart", onTouchStart, { passive: true });
    mountNode.addEventListener("touchend", onTouchEnd, { passive: true });

    const onResize = () => {
      const width = mountNode.clientWidth;
      const height = mountNode.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      cssRenderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    let animationFrameId;
    let time = 0;
    const animate = () => {
      time += 0.0025; // Approximate delta time for 60fps
      currentQuaternion.slerp(targetQuaternionRef.current, 0.1);

      webglCubeGroup.quaternion.copy(currentQuaternion);
      cssCubeGroup.quaternion.copy(currentQuaternion);

      faceEntries.forEach((face) => {
        const object = faceObjects.get(face.key);
        const baseRotation = transforms[face.key].rotation;

        if (!object) {
          return;
        }

        object.rotation.set(baseRotation[0], baseRotation[1], baseRotation[2]);
      });

      cssScene.updateMatrixWorld(true);

      const activeFaceObject = faceObjects.get(activeFaceRef.current);
      if (activeFaceObject) {
        const baseRotation = transforms[activeFaceRef.current].rotation;

        activeFaceObject.getWorldQuaternion(faceWorldQuaternion);

        faceNormalWorld
          .set(0, 0, 1)
          .applyQuaternion(faceWorldQuaternion)
          .normalize();
        faceUpWorld
          .set(0, 1, 0)
          .applyQuaternion(faceWorldQuaternion)
          .normalize();
        desiredUpWorld
          .copy(screenUpWorld)
          .projectOnPlane(faceNormalWorld)
          .normalize();

        let uprightCompensation = 0;

        if (desiredUpWorld.lengthSq() > 1e-8) {
          rotationCross.crossVectors(faceUpWorld, desiredUpWorld);
          uprightCompensation = Math.atan2(
            faceNormalWorld.dot(rotationCross),
            faceUpWorld.dot(desiredUpWorld),
          );
        }

        // Add slow pendulum oscillation
        const oscillation = Math.sin((time * Math.PI * 2) / 2) * 0.02; // 4-second period, 0.05 rad amplitude

        activeFaceObject.rotation.set(
          baseRotation[0],
          baseRotation[1],
          baseRotation[2] + uprightCompensation + oscillation,
        );
      }

      frame.rotation.x -= 0.002;
      frame.rotation.y += 0.0017;
      particles.rotation.y += 0.00055;
      particles.rotation.x += 0.00008;

      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      mountNode.removeEventListener("touchstart", onTouchStart);
      mountNode.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      mountNode.removeChild(renderer.domElement);
      mountNode.removeChild(cssRenderer.domElement);
      particleGeometry.dispose();
      cubeGeometry.dispose();
      cubeMaterial.dispose();
      renderer.dispose();
    };
  }, [faceEntries]);

  const directionalTargets = {
    up: getAdjacentFace(activeFace, "up", verticalContext),
    down: getAdjacentFace(activeFace, "down", verticalContext),
    left: getAdjacentFace(activeFace, "left", verticalContext),
    right: getAdjacentFace(activeFace, "right", verticalContext),
  };

  return (
    <section className="grid flex-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div className="relative min-h-[540px] rounded-[2rem] border border-accent/10 bg-white/[0.02]">
        <div
          ref={mountRef}
          className="absolute inset-0 overflow-hidden rounded-[2rem]"
        />
        <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-accent/20 bg-base/60 px-4 py-2 text-xs uppercase tracking-[0.28em] text-accent backdrop-blur-xl">
          Click or swipe the cube
        </div>
        {/* <div className="pointer-events-none absolute bottom-5 left-5 rounded-2xl border border-accent/15 bg-base/55 px-4 py-3 text-sm text-muted backdrop-blur-xl">
          <p className="font-display uppercase tracking-[0.2em] text-white">
            Active Face
          </p>
          <p className="mt-1 text-accent">
            {faceEntries.find((face) => face.key === activeFace)?.label}
          </p>
        </div> */}
        <button
          type="button"
          onClick={() => handleDirectionalMove("up")}
          className="hidden md:flex absolute left-1/2 top-2 z-20 -translate-x-1/2 w-10 h-10 items-center justify-center rounded-full border border-accent/25 bg-base/70 text-lg text-accent backdrop-blur-xl transition hover:border-accent/60 hover:bg-accent/10 hover:text-white"
        >
          {DIRECTION_ICONS.up}
          {/* {directionalTargets.up} */}
        </button>
        <button
          type="button"
          onClick={() => handleDirectionalMove("down")}
          className="hidden md:flex absolute left-1/2 bottom-2 z-20 -translate-x-1/2 w-10 h-10 items-center justify-center rounded-full border border-accent/25 bg-base/70 text-lg text-accent backdrop-blur-xl transition hover:border-accent/60 hover:bg-accent/10 hover:text-white"
        >
          {DIRECTION_ICONS.down}
          {/* {directionalTargets.down} */}
        </button>
        <button
          type="button"
          onClick={() => handleDirectionalMove("left")}
          className="hidden md:flex absolute left-5 top-1/2 z-20 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border border-accent/25 bg-base/70 text-lg text-accent backdrop-blur-xl transition hover:border-accent/60 hover:bg-accent/10 hover:text-white"
        >
          {DIRECTION_ICONS.left}
          {/* {directionalTargets.left} */}
        </button>
        <button
          type="button"
          onClick={() => handleDirectionalMove("right")}
          className="hidden md:flex absolute right-5 top-1/2 z-20 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border border-accent/25 bg-base/70 text-lg text-accent backdrop-blur-xl transition hover:border-accent/60 hover:bg-accent/10 hover:text-white"
        >
          {DIRECTION_ICONS.right}
          {/* {directionalTargets.right} */}
        </button>
      </div>

      <aside className="glass-panel rounded-[2rem] p-5 sm:p-6">
        <p className="hud-label mb-4 text-xs text-accent/80">Navigation Grid</p>
        <div className="grid grid-cols-2 gap-3">
          {faceEntries.map((face) => (
            <button
              key={face.key}
              type="button"
              onClick={() => navigateToFace(face.key)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                activeFace === face.key
                  ? "border-accent/60 bg-accent/10 text-white shadow-edge"
                  : "border-accent/15 bg-white/5 text-muted hover:border-accent/35 hover:text-white"
              }`}
            >
              <p className="font-display text-bg uppercase tracking-[0.14em]">
                {face.label}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-accent/70">
                {face.key}
              </p>
            </button>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-accent/15 bg-white/5 p-4 text-sm leading-relaxed text-muted">
          Each cube face is an interactive HTML panel mounted in 3D space with
          Three.js. Click a face directly or use the navigation grid to rotate
          the cube into focus.
        </div>
      </aside>

      <div className="hidden">
        {faceEntries.map((face) => (
          <div
            key={face.key}
            ref={(node) => {
              if (!node) {
                cssFacesRef.current.delete(face.key);
                return;
              }

              cssFacesRef.current.set(face.key, node);
            }}
          >
            <Face
              label={face.label}
              isActive={activeFace === face.key}
              onClick={() => navigateToFace(face.key)}
            >
              {face.content}
            </Face>
          </div>
        ))}
      </div>
    </section>
  );
}
