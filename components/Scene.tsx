"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import FilmGrainShader from "../shaders/FilmGrainShader"; 
import gsap from "gsap";

const SCENE_BG_COLOR = "#666";
const CAMERA_POSITION = new THREE.Vector3(5, 2, 14);
const CAMERA_TARGET = new THREE.Vector3(0, 2, 5);
const SNOW_COUNT = 100;
const SNOW_TEXTURE_PATH = "/assets/textures/texture-snow.jpg";
const MODEL_PATH = "/assets/model-mammoth.glb";
const textureLoader = new THREE.TextureLoader();
const footprintTexture = textureLoader.load('/assets/textures/grunge.jpg');
const footprintAlphaTexture = textureLoader.load('/assets/textures/texture-mammoth-step.jpg');
const footprintMaterial = new THREE.MeshBasicMaterial({
  color: 0x555555,
  alphaMap: footprintAlphaTexture,
  transparent: true,
  opacity: 1,
  depthWrite: false,
});

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);
 
  // ✅ UseRef to track foot bones properly
  const leftFootBoneRef = useRef<THREE.Bone | null>(null);
  const rightFootBoneRef = useRef<THREE.Bone | null>(null);
  const NeckBoneRef = useRef<THREE.Bone | null>(null);

  useEffect(() => {
    
    if (!containerRef.current) return;
    const threejsCanvas = containerRef.current;
    gsap.to(threejsCanvas, {
      opacity: 1,
      duration: 2,
      delay: 1,
      ease: "power4.inOut",
      });
    // Scene Setup
    const scene = new THREE.Scene();
    let footprint = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), footprintMaterial);
  
    function addFootPrint(footBone: THREE.Bone | null) {
      if (!footBone) return;
    
      let position = footBone.getWorldPosition(new THREE.Vector3());
    
      // Create a new footprint mesh each time
      const newFootprint = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),  // New geometry for each footprint
        footprintMaterial.clone()       // Clone material to avoid reusing the same opacity changes
      );
    
      newFootprint.rotation.x = -Math.PI / 2; // Align with the ground
      newFootprint.position.set(position.x, -0.1, position.z); // Slight offset
    
      fadeOutFootprint(newFootprint);
      scene.add(newFootprint);
    
    }
    function fadeOutFootprint(mesh) {
      const fadeInterval = setInterval(() => {
          mesh.position.z -= 0.1;
          if (mesh.position.z <= -10) {
              scene.remove(mesh);
              clearInterval(fadeInterval);
          }
      }, 100);
  }
  
    scene.background = new THREE.Color(SCENE_BG_COLOR);
    // Function to track mouse movement and update bone rotation
    function handleMouseMove(event: MouseEvent) {
      if (!NeckBoneRef.current) return;
    
      const mouseY = -(event.clientX / window.innerWidth) * 2 + 1;
      const mouseX = -(event.clientY / window.innerHeight) * 2 + 1;
      const rotationFactor = Math.PI / 6; // Adjust for smoother blending
    
      // Create a quaternion for the new mouse input
      const targetRotation = new THREE.Quaternion();
      targetRotation.setFromEuler(new THREE.Euler(
        mouseY * rotationFactor,  // Look up/down
        0,                        // No horizontal twist
        mouseX * rotationFactor   // Look left/right
      ));
    
      // Blend it with the animated rotation inside the animation loop
      NeckBoneRef.current.userData.targetRotation = targetRotation;
    }
    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      0.4,
      100
    );
    camera.position.copy(CAMERA_POSITION);
    camera.lookAt(CAMERA_TARGET);

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    containerRef.current.appendChild(renderer.domElement);

    // (OrbitControls removed)

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    scene.fog = new THREE.Fog(SCENE_BG_COLOR, 15, 30);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.castShadow = true;
    directionalLight2.position.set(-3, 2, -1);

    directionalLight.position.set(-1, 10, -7);
    directionalLight2.shadow.camera.near = 0;
    directionalLight2.shadow.camera.far = 30;
    directionalLight2.shadow.mapSize.set(2048, 2048);
    directionalLight2.shadow.radius = 30;
    directionalLight2.shadow.camera.left = -5;
    directionalLight2.shadow.camera.right = 5;
    directionalLight2.shadow.camera.top = 5;
    directionalLight2.shadow.camera.bottom = -5;
    scene.add(directionalLight);
    scene.add(directionalLight2);

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ opacity: 0.3 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Snow Particles and Haze Mesh
    const hazeGeometry = new THREE.PlaneGeometry(5, 5);
    const cloudTexture = textureLoader.load("/assets/textures/texture-cloud.png");
    cloudTexture.minFilter = THREE.LinearFilter;
    cloudTexture.magFilter = THREE.LinearFilter;
    cloudTexture.wrapS = THREE.RepeatWrapping;
    cloudTexture.wrapT = THREE.RepeatWrapping;
    const hazeMaterial = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    });
    const hazeMesh = new THREE.Mesh(hazeGeometry, hazeMaterial);
    hazeMesh.position.set(0.5, 2.8, 4.5);
    scene.add(hazeMesh);

    const snowTexture = textureLoader.load(SNOW_TEXTURE_PATH);
    const snowParticles = new THREE.BufferGeometry();
    const positions = new Float32Array(SNOW_COUNT * 3);
    const velocities = new Float32Array(SNOW_COUNT);

    for (let i = 0; i < SNOW_COUNT; i++) {
      positions[i * 3] = Math.random() * 10 - 4;
      positions[i * 3 + 1] = Math.random() * 0.5 + 4;
      positions[i * 3 + 2] = Math.random() * 10 + 2;
      velocities[i] = Math.random() * 0.01 + 0.01;
    }

    snowParticles.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    snowParticles.setAttribute(
      "velocity",
      new THREE.BufferAttribute(velocities, 1)
    );

    const snowMaterial = new THREE.PointsMaterial({
      size: 0.05,
      map: snowTexture,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
      // blending: THREE.AdditiveBlending,
    });

    const snow = new THREE.Points(snowParticles, snowMaterial);
    scene.add(snow);

    // Post Processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.0,
        0.4,
        0.95
      )
    );
    composer.addPass(new FilmPass(2, 0.1, 1, false));
    const filmGrainPass = new ShaderPass(FilmGrainShader);
    filmGrainPass.uniforms["resolution"].value.set(window.innerWidth, window.innerHeight);
    composer.addPass(filmGrainPass);
    composer.addPass(
      new SMAAPass(
        window.innerWidth * renderer.getPixelRatio(),
        window.innerHeight * renderer.getPixelRatio()
      )
    );
    composer.addPass(new OutputPass());

    // Animation Setup
    let mixer: THREE.AnimationMixer;
    const clock = new THREE.Clock();

    function updateSnow() {
      const positions = snow.geometry.attributes.position.array as Float32Array;
      const velocities = snow.geometry.attributes.velocity.array as Float32Array;

      for (let i = 0; i < SNOW_COUNT; i++) {
        positions[i * 3 + 1] -= velocities[i];
        positions[i * 3] += velocities[i] * 2;

        if (positions[i * 3 + 1] < 0 || positions[i * 3] > 4) {
          positions[i * 3] = Math.random() * 10 - 4;
          positions[i * 3 + 1] = Math.random() * 0.5 + 4;
          positions[i * 3 + 2] = Math.random() * 10 + 2;
        }
      }

      snow.geometry.attributes.position.needsUpdate = true;
    }


    // Load Model
    let model: THREE.Object3D | undefined;
    new GLTFLoader().load(MODEL_PATH, (gltf) => {
      model = gltf.scene;
      model.position.set(0, 0, 0);
      model.rotation.set(0, -Math.PI * 1.1, 0);
      model.scale.set(1, 1, 1);
  
   model.traverse((child) => {
        if ((child as THREE.SkinnedMesh).isMesh) {
          const skinnedMesh = child as THREE.SkinnedMesh;
          child.castShadow = true;
          child.receiveShadow = true;
          (child as THREE.Mesh).material.needsUpdate = true;
          if (skinnedMesh.skeleton) {
            leftFootBoneRef.current = skinnedMesh.skeleton.getBoneByName("BackL003");
            rightFootBoneRef.current = skinnedMesh.skeleton.getBoneByName("BackR003");
            NeckBoneRef.current = skinnedMesh.skeleton.getBoneByName("Spine005");

    // Add mouse move event listener
           window.addEventListener("mousemove", handleMouseMove);
          }
        }
      });
      scene.add(model);
  

      
      if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
        // When loading the animation:

      const action = mixer.clipAction(gltf.animations[0]);
      action.setEffectiveTimeScale(0.8);
      action.setEffectiveWeight(1.0); // Full weight for walk animation
      action.play();

      mixer.blendMode = THREE.AdditiveAnimationBlendMode;
      // Create an additive layer for manual control
      const additiveAction = mixer.clipAction(gltf.animations[0]).play();
      additiveAction.setEffectiveWeight(1.0); // Start with 0, we'll modify manually
      }
      
     
  });

    // Scroll States Setup
    const scrollStates = [
      {
        cameraPosition: { x: 5, y: 2, z: 14 },
        cameraLookAt: { x: 0, y: 2, z: 5 },
        modelPosition: { x: 0, y: 0, z: 0 },
        modelRotation: { x: 0, y: -Math.PI * 1.1, z: 0 },
        hazeMeshPosition: { x: 0.5, y: 2.8, z: 4.5 },
        hazeMeshRotation: { x: 0, y: 0, z: 0 },
      },
      {
        cameraPosition: { x: 6, y: 2, z: 6 },
        // cameraRotation: { x: -0.6, y: 0.25, z: 0.2 },
        cameraLookAt: { x: 0, y: 2, z: 2},
        modelPosition: { x: 0, y: 0, z: 0 },
        modelRotation: { x: 0, y: -Math.PI * 1.1, z: 0 },
        hazeMeshPosition: { x: 4, y: 2.8, z: 4.5 },
        hazeMeshRotation: { x: 0, y: 0, z: 0 },
      },
      {
        cameraPosition: { x: -14, y: 2, z: 14 },
        cameraLookAt: { x: -3, y: 2, z: 5 },
        modelPosition: { x: 0, y: 0, z: 0 },
        modelRotation: { x: 0, y: -Math.PI * 1.1, z: 0 },
        hazeMeshPosition: { x: 0.5, y: 2.8, z: 4.5 },
        hazeMeshRotation: { x: 0, y: 0, z: 0 },
      },
      {
        cameraPosition: { x: -12, y: 2, z: -9 },
        cameraLookAt: { x: 0, y: 2, z: 0 },
        modelPosition: { x: 0, y: 0, z: 0 },
        modelRotation: { x: 0, y: -Math.PI * 1.2, z: 0 },
        hazeMeshPosition: { x: 0.5, y: 2.8, z: 4.5 },
        hazeMeshRotation: { x: 0, y: 0, z: 0 },
      },
    ];
    let currentState = 0;
    let canScroll = true;

    function handleScroll(event: WheelEvent) {
      if (!canScroll) return;
      let newState = currentState;
      if (event.deltaY > 0) {
        newState = Math.min(scrollStates.length - 1, currentState + 1);
      } else if (event.deltaY < 0) {
        newState = Math.max(0, currentState - 1);
      }
      //  if (currentState === scrollStates.length - 1){
      //   newState = 0;
      // }
      if (newState !== currentState) {
        currentState = newState;
        const state = scrollStates[currentState];
        gsap.to(camera.position, {
          duration: 1,
          x: state.cameraPosition.x,
          y: state.cameraPosition.y,
          z: state.cameraPosition.z,
        });
        gsap.to(CAMERA_TARGET, {
          duration: 1,
          x: state.cameraLookAt.x,
          y: state.cameraLookAt.y,
          z: state.cameraLookAt.z,
          onUpdate: () => {
            camera.lookAt(CAMERA_TARGET);
          }
        });
      
        if (model) {
          gsap.to(model.position, {
            duration: 1,
            x: state.modelPosition.x,
            y: state.modelPosition.y,
            z: state.modelPosition.z,
          });
          gsap.to(model.rotation, {
            duration: 1,
            x: state.modelRotation.x,
            y: state.modelRotation.y,
            z: state.modelRotation.z,
          });
        }
        if (hazeMesh) {
          gsap.to(hazeMesh.position, {
            duration: 1,
            x: state.hazeMeshPosition.x,
            y: state.hazeMeshPosition.y,
            z: state.hazeMeshPosition.z,
          });
          gsap.to(hazeMesh.rotation, {
            duration: 1,
            x: state.hazeMeshRotation.x,
            y: state.hazeMeshRotation.y,
            z: state.hazeMeshRotation.z,
          });
        }
        canScroll = false;
        setTimeout(() => {
          canScroll = true;
        }, 2000);
      }
    }

    window.addEventListener("wheel", handleScroll);
   
    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());
    
      updateSnow();
    
      if (leftFootBoneRef.current && isLeftFootOnGround(leftFootBoneRef.current)) {
        setTimeout(() => { addFootPrint(leftFootBoneRef.current); }, 100);
      } 
      if (rightFootBoneRef.current && isRightFootOnGround(rightFootBoneRef.current)) {
        setTimeout(() => { addFootPrint(rightFootBoneRef.current); }, 100);
      }
    
      // **Force NeckBone transformation after animation update**
      if (NeckBoneRef.current) {
        NeckBoneRef.current.updateMatrixWorld(true);
      }
      // Apply the mouse movement without overriding animation
      if (NeckBoneRef.current) {
        const animatedRotation = NeckBoneRef.current.quaternion.clone(); // Store the animation's output
        const targetRotation = NeckBoneRef.current.userData.targetRotation || new THREE.Quaternion();
    
        // Blend animated pose with manual rotation
        animatedRotation.slerp(targetRotation, 0.3);
    
        NeckBoneRef.current.quaternion.copy(animatedRotation);
        NeckBoneRef.current.updateMatrixWorld(true);
      }
    
      updateSnow();
      filmGrainPass.uniforms["time"].value = clock.getElapsedTime();
      composer.render();
    }
    animate();

    // Resize Handler
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleScroll);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 canvas-threejs" style={{opacity: 0}} />;

}
function isLeftFootOnGround(footBone: THREE.Bone | null) {
  return footBone ? footBone.quaternion._z >= 0.34 : false; //0.40445834415888
}
function isRightFootOnGround(footBone: THREE.Bone | null) {
  return footBone ? footBone.quaternion._z >= 0.41 : false; //0.40445834415888
}

