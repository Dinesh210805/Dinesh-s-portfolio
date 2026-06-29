'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const { theme } = useTheme();

	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		particles: THREE.Points[];
		animationId: number;
		count: number;
	} | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const SEPARATION = 150;
		const AMOUNTX = 40;
		const AMOUNTY = 60;

		// Scene setup
		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			10000,
		);
		camera.position.set(0, 355, 1220);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(scene.fog.color, 0);

		containerRef.current.appendChild(renderer.domElement);

		// Create particles
		const particles: THREE.Points[] = [];
		const positions: number[] = [];
		const colors: number[] = [];

		// Create geometry for all particles
		const geometry = new THREE.BufferGeometry();

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				const y = 0; // Will be animated
				const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

				positions.push(x, y, z);
				// Force light colored particles since DottedSurface is placed on dark backgrounds
				colors.push(200, 200, 200);
			}
		}

		geometry.setAttribute(
			'position',
			new THREE.Float32BufferAttribute(positions, 3),
		);
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		// Create material
		const material = new THREE.PointsMaterial({
			size: 8,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
		});

		// Create points object
		const points = new THREE.Points(geometry, material);
		scene.add(points);

		let count = 0;
		let animationId: number;

		const mouse = new THREE.Vector2(0, 0);
		let hasMouseMoved = false;
		const raycaster = new THREE.Raycaster();

		// Invisible plane to detect mouse intersection with the grid
		const planeGeo = new THREE.PlaneGeometry(10000, 10000);
		planeGeo.rotateX(-Math.PI / 2);
		const planeMat = new THREE.MeshBasicMaterial({ visible: false });
		const plane = new THREE.Mesh(planeGeo, planeMat);
		scene.add(plane);

		const onDocumentMouseMove = (event: MouseEvent) => {
			hasMouseMoved = true;
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
		};

		document.addEventListener('mousemove', onDocumentMouseMove);

		// Animation function
		const animate = () => {
			animationId = requestAnimationFrame(animate);

			// Dramatic camera movement
			camera.position.x += (mouse.x * 1500 - camera.position.x) * 0.05;
			camera.position.y += (mouse.y * 600 + 400 - camera.position.y) * 0.05;
			camera.lookAt(scene.position);

			let intersectPoint: THREE.Vector3 | null = null;
			
			if (hasMouseMoved) {
				raycaster.setFromCamera(mouse, camera);
				const intersects = raycaster.intersectObject(plane);
				if (intersects.length > 0) {
					intersectPoint = intersects[0].point;
				}
			}

			const positionAttribute = geometry.attributes.position;
			const positions = positionAttribute.array as Float32Array;

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					const index = i * 3;

					// Base wave
					let y = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;

					// Add exact cursor repulsion based on raycaster
					if (intersectPoint) {
						const dx = positions[index] - intersectPoint.x;
						const dz = positions[index + 2] - intersectPoint.z;
						const distance = Math.sqrt(dx * dx + dz * dz);
						
						// Massive repulsive field
						const maxDistance = 1500;
						if (distance < maxDistance) {
							// Smooth falloff curve
							const force = Math.pow(1 - distance / maxDistance, 2);
							y += force * 400; // Repel significantly upward
						}
					}

					positions[index + 1] = y;
					i++;
				}
			}

			positionAttribute.needsUpdate = true;

			renderer.render(scene, camera);
			count += 0.04; 
		};

		// Handle window resize
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);

		// Start animation
		animate();

		// Store references
		sceneRef.current = {
			scene,
			camera,
			renderer,
			particles: [points],
			animationId,
			count,
		};

		// Cleanup function
		return () => {
			document.removeEventListener('mousemove', onDocumentMouseMove);
			window.removeEventListener('resize', handleResize);

			if (sceneRef.current) {
				cancelAnimationFrame(sceneRef.current.animationId);

				// Clean up Three.js objects
				sceneRef.current.scene.traverse((object) => {
					if (object instanceof THREE.Points) {
						object.geometry.dispose();
						if (Array.isArray(object.material)) {
							object.material.forEach((material) => material.dispose());
						} else {
							object.material.dispose();
						}
					}
				});

				sceneRef.current.renderer.dispose();

				if (containerRef.current && sceneRef.current.renderer.domElement) {
					containerRef.current.removeChild(
						sceneRef.current.renderer.domElement,
					);
				}
			}
		};
	}, [theme]);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none fixed inset-0', className)}
			{...props}
		/>
	);
}
