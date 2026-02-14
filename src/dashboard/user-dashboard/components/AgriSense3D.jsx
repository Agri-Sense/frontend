import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

export default function AgriSenseDetailed3D() {
  const mountRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const assemblyGroupRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a2a2a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(12, 8, 12);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-10, 10, -10);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x4488ff, 0.5);
    rimLight.position.set(0, 5, -15);
    scene.add(rimLight);

    // Main assembly group
    const assemblyGroup = new THREE.Group();
    assemblyGroupRef.current = assemblyGroup;

    // ============ NODEMCU ESP8266 BOARD ============
    const nodeMCUGroup = new THREE.Group();
    
    // PCB Board (teal color like Arduino)
    const pcbGeometry = new THREE.BoxGeometry(3, 0.15, 5);
    const pcbMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00878f,
      roughness: 0.6,
      metalness: 0.2
    });
    const pcb = new THREE.Mesh(pcbGeometry, pcbMaterial);
    pcb.castShadow = true;
    nodeMCUGroup.add(pcb);

    // ESP8266 chip (black)
    const espChipGeometry = new THREE.BoxGeometry(1.2, 0.2, 1.2);
    const espChipMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a,
      roughness: 0.3,
      metalness: 0.7
    });
    const espChip = new THREE.Mesh(espChipGeometry, espChipMaterial);
    espChip.position.set(0, 0.18, 0);
    nodeMCUGroup.add(espChip);

    // USB Port (silver)
    const usbGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.8);
    const usbMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xc0c0c0,
      metalness: 0.9,
      roughness: 0.2
    });
    const usb = new THREE.Mesh(usbGeometry, usbMaterial);
    usb.position.set(-1.7, 0.15, 0);
    nodeMCUGroup.add(usb);

    // Pin headers (silver pins on both sides)
    const pinMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xe0e0e0,
      metalness: 0.9,
      roughness: 0.1
    });
    
    // Left side pins
    for (let i = 0; i < 15; i++) {
      const pin = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.6, 0.08),
        pinMaterial
      );
      pin.position.set(-1.3, -0.3, -2.2 + (i * 0.3));
      nodeMCUGroup.add(pin);
    }

    // Right side pins
    for (let i = 0; i < 15; i++) {
      const pin = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.6, 0.08),
        pinMaterial
      );
      pin.position.set(1.3, -0.3, -2.2 + (i * 0.3));
      nodeMCUGroup.add(pin);
    }

    // LED indicators on board
    const ledGeometry = new THREE.BoxGeometry(0.15, 0.08, 0.15);
    const redLED = new THREE.Mesh(ledGeometry, new THREE.MeshStandardMaterial({ 
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 0.6
    }));
    redLED.position.set(0.5, 0.15, -1.5);
    nodeMCUGroup.add(redLED);

    const blueLED = new THREE.Mesh(ledGeometry, new THREE.MeshStandardMaterial({ 
      color: 0x0000ff,
      emissive: 0x0000ff,
      emissiveIntensity: 0.6
    }));
    blueLED.position.set(0.8, 0.15, -1.5);
    nodeMCUGroup.add(blueLED);

    nodeMCUGroup.position.set(0, 0, 0);
    assemblyGroup.add(nodeMCUGroup);

    // ============ DHT22 SENSOR ============
    const dht22Group = new THREE.Group();
    
    const dhtBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 1.5, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.5 })
    );
    dhtBody.castShadow = true;
    dht22Group.add(dhtBody);

    // Sensor grid holes
    const gridGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.05);
    const gridMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.position.set(0, 0, 0.22);
    dht22Group.add(grid);

    // DHT22 pins
    for (let i = 0; i < 4; i++) {
      const dhtPin = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.5, 0.08),
        pinMaterial
      );
      dhtPin.position.set(-0.3 + (i * 0.2), -1, 0);
      dht22Group.add(dhtPin);
    }

    dht22Group.position.set(-4, 0.75, -2);
    assemblyGroup.add(dht22Group);

    // ============ RELAY MODULE ============
    const relayGroup = new THREE.Group();
    
    // Relay PCB (blue)
    const relayPCB = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.12, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x2874a6, roughness: 0.6 })
    );
    relayPCB.castShadow = true;
    relayGroup.add(relayPCB);

    // Relay block (transparent blue cube)
    const relayBlock = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.8, 0.8),
      new THREE.MeshPhysicalMaterial({ 
        color: 0x3498db,
        transparent: true,
        opacity: 0.6,
        roughness: 0.3
      })
    );
    relayBlock.position.set(0, 0.46, 0);
    relayGroup.add(relayBlock);

    // Terminal blocks (black)
    const terminal1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.4, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
    );
    terminal1.position.set(-0.7, 0.26, -0.4);
    relayGroup.add(terminal1);

    const terminal2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.4, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
    );
    terminal2.position.set(-0.7, 0.26, 0.4);
    relayGroup.add(terminal2);

    // Relay pins
    for (let i = 0; i < 4; i++) {
      const relayPin = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.4, 0.08),
        pinMaterial
      );
      relayPin.position.set(0.7 - (i * 0.25), -0.3, 0.5);
      relayGroup.add(relayPin);
    }

    relayGroup.position.set(4, 0.06, -1);
    assemblyGroup.add(relayGroup);

    // ============ SOIL MOISTURE SENSOR ============
    const soilGroup = new THREE.Group();
    
    // Probe PCB
    const soilPCB = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 2.5, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.6 })
    );
    soilPCB.castShadow = true;
    soilGroup.add(soilPCB);

    // Metal traces (gold)
    for (let i = 0; i < 2; i++) {
      const trace = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 2.3, 0.02),
        new THREE.MeshStandardMaterial({ 
          color: 0xffd700,
          metalness: 0.8,
          roughness: 0.2
        })
      );
      trace.position.set(0, 0, 0.08 - (i * 0.16));
      soilGroup.add(trace);
    }

    // Connector at top
    const soilConnector = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.3, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x2c3e50 })
    );
    soilConnector.position.set(0, 1.4, 0);
    soilGroup.add(soilConnector);

    soilGroup.position.set(5.5, 1.25, 1.5);
    soilGroup.rotation.z = 0.3;
    assemblyGroup.add(soilGroup);

    // ============ LDR SENSOR ============
    const ldrGroup = new THREE.Group();
    
    // LDR body (golden/brown)
    const ldrBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.25, 0.5, 16),
      new THREE.MeshStandardMaterial({ 
        color: 0xd4af37,
        roughness: 0.4
      })
    );
    ldrBody.castShadow = true;
    ldrGroup.add(ldrBody);

    // Sensitive surface (darker)
    const ldrSurface = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16),
      new THREE.MeshStandardMaterial({ 
        color: 0x8b4513,
        roughness: 0.3
      })
    );
    ldrSurface.position.set(0, 0.28, 0);
    ldrGroup.add(ldrSurface);

    // LDR legs
    const ldrLeg1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8),
      pinMaterial
    );
    ldrLeg1.position.set(-0.1, -0.65, 0);
    ldrGroup.add(ldrLeg1);

    const ldrLeg2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8),
      pinMaterial
    );
    ldrLeg2.position.set(0.1, -0.65, 0);
    ldrGroup.add(ldrLeg2);

    ldrGroup.position.set(-3.5, 1.2, 1.5);
    assemblyGroup.add(ldrGroup);

    // ============ WATER PUMP ============
    const pumpGroup = new THREE.Group();
    
    // Pump body (yellow/gold)
    const pumpBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.6, 1.2, 16),
      new THREE.MeshStandardMaterial({ 
        color: 0xf39c12,
        roughness: 0.5
      })
    );
    pumpBody.castShadow = true;
    pumpBody.rotation.x = Math.PI / 2;
    pumpGroup.add(pumpBody);

    // Pump outlet tube
    const pumpOutlet = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 0.6, 12),
      new THREE.MeshStandardMaterial({ color: 0x34495e })
    );
    pumpOutlet.position.set(0, 0, 0.9);
    pumpGroup.add(pumpOutlet);

    // Pump wires (red and black)
    const wireGeometry = new THREE.CylinderGeometry(0.04, 0.04, 1.5, 8);
    const redWire = new THREE.Mesh(
      wireGeometry,
      new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );
    redWire.position.set(-0.3, 0.75, 0);
    redWire.rotation.z = Math.PI / 4;
    pumpGroup.add(redWire);

    const blackWire = new THREE.Mesh(
      wireGeometry,
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
    blackWire.position.set(0.3, 0.75, 0);
    blackWire.rotation.z = -Math.PI / 4;
    pumpGroup.add(blackWire);

    pumpGroup.position.set(6, 0.6, -2.5);
    assemblyGroup.add(pumpGroup);

    // ============ JUMPER WIRES ============
    const createWire = (start, end, color) => {
      const curve = new THREE.QuadraticBezierCurve3(
        start,
        new THREE.Vector3(
          (start.x + end.x) / 2,
          (start.y + end.y) / 2 + 1,
          (start.z + end.z) / 2
        ),
        end
      );
      
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: color, linewidth: 2 });
      return new THREE.Line(geometry, material);
    };

    // DHT22 to NodeMCU wires
    const dhtWire1 = createWire(
      new THREE.Vector3(-4, 0.2, -2),
      new THREE.Vector3(-1.3, -0.3, -1.5),
      0xff0000 // Red (VCC)
    );
    assemblyGroup.add(dhtWire1);

    const dhtWire2 = createWire(
      new THREE.Vector3(-3.8, 0.2, -2),
      new THREE.Vector3(-1.3, -0.3, -1.2),
      0x00ff00 // Green (Data)
    );
    assemblyGroup.add(dhtWire2);

    const dhtWire3 = createWire(
      new THREE.Vector3(-3.6, 0.2, -2),
      new THREE.Vector3(-1.3, -0.3, -0.9),
      0x000000 // Black (GND)
    );
    assemblyGroup.add(dhtWire3);

    // Relay to NodeMCU wires
    const relayWire1 = createWire(
      new THREE.Vector3(3.75, -0.24, -0.5),
      new THREE.Vector3(1.3, -0.3, 0.5),
      0xff6600 // Orange (Signal)
    );
    assemblyGroup.add(relayWire1);

    const relayWire2 = createWire(
      new THREE.Vector3(3.5, -0.24, -0.5),
      new THREE.Vector3(1.3, -0.3, 0.8),
      0xff0000 // Red (VCC)
    );
    assemblyGroup.add(relayWire2);

    // LDR to NodeMCU wires
    const ldrWire1 = createWire(
      new THREE.Vector3(-3.6, 0.4, 1.5),
      new THREE.Vector3(-1.3, -0.3, 1.5),
      0xffff00 // Yellow
    );
    assemblyGroup.add(ldrWire1);

    const ldrWire2 = createWire(
      new THREE.Vector3(-3.4, 0.4, 1.5),
      new THREE.Vector3(-1.3, -0.3, 1.8),
      0x000000 // Black
    );
    assemblyGroup.add(ldrWire2);

    scene.add(assemblyGroup);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a,
      roughness: 0.9
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Mouse controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
    };

    const handleMouseMove = (e) => {
      if (isDragging && assemblyGroupRef.current) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y
        };

        assemblyGroupRef.current.rotation.y += deltaMove.x * 0.005;
        assemblyGroupRef.current.rotation.x += deltaMove.y * 0.005;
      }

      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      if (cameraRef.current) {
        camera.position.z += e.deltaY * 0.01;
        camera.position.z = Math.max(5, Math.min(25, camera.position.z));
      }
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && assemblyGroupRef.current) {
        assemblyGroupRef.current.rotation.y += 0.003;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (mountRef.current && cameraRef.current && rendererRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Title */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '15px 40px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h2 style={{ margin: 0, fontSize: '24px' }}>🚜 AgriSense IoT - Detailed Hardware Assembly</h2>
      </div>

      {/* Controls */}
      <div style={{
        position: 'absolute',
        top: '100px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>⚙️ Controls</h3>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}>
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={(e) => setAutoRotate(e.target.checked)}
            style={{ marginRight: '10px' }}
          />
          <span>Auto Rotate</span>
        </label>
        <div style={{ fontSize: '13px', opacity: 0.8, marginTop: '15px', lineHeight: '1.6' }}>
          🖱️ Click & drag to rotate<br />
          🔍 Scroll to zoom<br />
          👆 Touch to interact
        </div>
      </div>

      {/* Component Legend */}
      <div style={{
        position: 'absolute',
        top: '100px',
        right: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        maxWidth: '320px'
      }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>📦 Components</h3>
        <div style={{ fontSize: '13px', lineHeight: '2' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#00878f', marginRight: '10px', borderRadius: '3px' }}></div>
            <span>NodeMCU ESP8266</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#3498db', marginRight: '10px', borderRadius: '3px' }}></div>
            <span>DHT22 Sensor</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#2874a6', marginRight: '10px', borderRadius: '3px' }}></div>
            <span>5V Relay Module</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#27ae60', marginRight: '10px', borderRadius: '3px' }}></div>
            <span>Soil Moisture Sensor</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#d4af37', marginRight: '10px', borderRadius: '3px' }}></div>
            <span>LDR Light Sensor</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#f39c12', marginRight: '10px', borderRadius: '3px' }}></div>
            <span>Water Pump</span>
          </div>
        </div>
      </div>

      {/* Wire Color Guide */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>🔌 Wire Colors</h3>
        <div style={{ fontSize: '12px', lineHeight: '1.8', fontFamily: 'monospace' }}>
          <span style={{ color: '#ff0000' }}>⬤</span> Red = VCC (5V)<br />
          <span style={{ color: '#000000', background: '#fff', padding: '0 4px' }}>⬤</span> Black = GND<br />
          <span style={{ color: '#00ff00' }}>⬤</span> Green = Data<br />
          <span style={{ color: '#ffff00' }}>⬤</span> Yellow = Signal<br />
          <span style={{ color: '#ff6600' }}>⬤</span> Orange = Control
        </div>
      </div>

      {/* Technical Info */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>📊 Specifications</h3>
        <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
          <strong>MCU:</strong> ESP8266 (80MHz)<br />
          <strong>Memory:</strong> 4MB Flash<br />
          <strong>WiFi:</strong> 802.11 b/g/n<br />
          <strong>GPIO Pins:</strong> 17<br />
          <strong>ADC:</strong> 1x 10-bit<br />
          <strong>Power:</strong> 3.3V/5V<br />
          <strong>Current:</strong> ~80mA (avg)
        </div>
      </div>

      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
