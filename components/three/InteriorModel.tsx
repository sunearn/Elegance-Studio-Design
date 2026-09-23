'use client';

import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import { BoxGeometry, CanvasTexture, Group, Mesh, MeshStandardMaterial, RepeatWrapping, SRGBColorSpace } from 'three';
import { INITIAL_CONFIGURATION, type RoomConfiguration } from '@/components/configurator/configurator-state';

const ROOM_PARTS = new Set([
  '000-flat-floor-4m', '001-flat-floor-4m', '002-flat-floor-4m', '003-flat-wall-window-4m', '004-flat-wall-4m', '005-flat-wall-4m', '006-flat-wall-4m', '007-flat-wall-4m', '008-flat-wall-door-4m',
  '010-rug-wool-large', '012-table-lamp-dome', '018-floor-lamp-drum', '024-sofa-three-seat', '025-rug-round-jute', '026-coffee-table-rect', '027-armchair-lounge', '028-side-table-round', '029-table-lamp-dome',
  '030-floor-lamp-arc', '031-bookcase-5-shelf', '032-console-table', '033-pouffe-round', '034-dining-table-6seat', '035-dining-chair-timber',
  '036-dining-chair-timber', '037-dining-chair-upholstered', '038-dining-bench', '039-pendant-lamp-dome', '040-desk-writing', '041-desk-task-chair', '042-wall-sconce',
]);

function shouldRenderRoomPart(name: string) {
  const normalized = name.toLowerCase();
  if (!normalized) return false;
  if (['guide', 'grid', 'shadow', 'reference', 'helper', 'backdrop', 'plane'].some((token) => normalized.includes(token))) {
    return false;
  }
  if (ROOM_PARTS.has(name)) return true;
  return /(?:flat-floor|flat-wall|sofa|rug|coffee-table|armchair|table-lamp|floor-lamp|bookcase|console|pouffe|dining|wall-sconce|desk|bench|pendant|chair|door)/i.test(normalized);
}

function createMarbleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const context = canvas.getContext('2d');
  if (!context) return null;
  context.fillStyle = '#e9e5dc'; context.fillRect(0, 0, 512, 512);
  for (let index = 0; index < 18; index += 1) {
    const x = (index * 89 + 37) % 512;
    context.beginPath(); context.moveTo(x, -15); context.bezierCurveTo(x - 78, 140, x + 96, 320, x - 24, 530);
    context.strokeStyle = index % 4 === 0 ? 'rgba(166,154,137,.24)' : 'rgba(120,126,127,.13)';
    context.lineWidth = index % 4 === 0 ? 2.2 : 1.15; context.stroke();
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace; texture.wrapS = texture.wrapT = RepeatWrapping; texture.repeat.set(2, 2);
  return texture;
}

const wallTones = { Ivory: '#ddd5c7', Beige: '#b9a88f', Charcoal: '#484743', Textured: '#b9ae9c' };
const floorTones = { Oak: '#aa8865', Walnut: '#674d3d', Marble: '#e6e2da', Concrete: '#999891' };
const sofaTones = { Cream: '#e5dfd3', Beige: '#b5a48c', Grey: '#888783', Brown: '#725c4a' };

function createFeaturePanel(tone: string) {
  const group = new Group(); group.name = 'Elegance timber feature battens'; group.position.set(2.6, 0.08, -1.89);
  const wood = new MeshStandardMaterial({ color: tone, roughness: 0.72 });
  const geometry = new BoxGeometry(0.045, 2.25, 0.035);
  for (let index = 0; index < 23; index += 1) {
    const slat = new Mesh(geometry, wood); slat.position.set((index - 11) * 0.078, 1.12, 0); slat.castShadow = true; slat.receiveShadow = true; group.add(slat);
  }
  return group;
}

function prepareRoom(source: Group, configuration: RoomConfiguration, materials: { wall: MeshStandardMaterial; floor: MeshStandardMaterial; sofa: MeshStandardMaterial }) {
  const room = source.clone(true);
  room.traverse((object) => {
    if (!(object instanceof Mesh)) return;

    const meshName = object.name || object.parent?.name || '';
    const shouldRender = shouldRenderRoomPart(meshName);
    object.visible = shouldRender;
    if (!shouldRender) return;

    object.castShadow = true; object.receiveShadow = true;
    if (meshName.includes('wall')) object.material = materials.wall;
    if (meshName.includes('floor')) object.material = materials.floor;
    if (meshName.startsWith('024-sofa-three-seat') || meshName.includes('sofa-three-seat')) {
      const originals = Array.isArray(object.material) ? object.material : [object.material];
      const updated = originals.map((material) => /fabric|linen|sage|mustard|clay/i.test(material.name) ? materials.sofa : material);
      object.material = Array.isArray(object.material) ? updated : updated[0];
    }
  });
  room.add(createFeaturePanel(configuration.wall === 'Charcoal' ? '#302f2c' : configuration.wall === 'Beige' ? '#745d47' : '#755a43'));
  return room;
}

export function PottedOliveTree() {
  const materials = useMemo(() => ({
    terracotta: new MeshStandardMaterial({ color: '#9b7059', roughness: 0.9 }), soil: new MeshStandardMaterial({ color: '#342c24', roughness: 1 }),
    trunk: new MeshStandardMaterial({ color: '#66513e', roughness: 0.92 }), leaf: new MeshStandardMaterial({ color: '#69745a', roughness: 0.86 }),
  }), []);
  return <group position={[4.12, 0.06, -0.48]}>
    <mesh position={[0, 0.23, 0]} material={materials.terracotta} castShadow receiveShadow><cylinderGeometry args={[0.28, 0.21, 0.46, 24]} /></mesh>
    <mesh position={[0, 0.47, 0]} material={materials.terracotta} castShadow><cylinderGeometry args={[0.29, 0.29, 0.07, 24]} /></mesh>
    <mesh position={[0, 0.51, 0]} material={materials.soil}><cylinderGeometry args={[0.245, 0.245, 0.025, 24]} /></mesh>
    <mesh position={[0, 1.04, 0]} rotation={[0, 0, -0.12]} material={materials.trunk} castShadow><cylinderGeometry args={[0.025, 0.045, 1.12, 8]} /></mesh>
    {[
      [-0.34, 1.32, 0.02, 0.27, 0.13, 0.17], [0.33, 1.48, -0.04, 0.3, 0.14, 0.18], [-0.2, 1.78, 0.05, 0.29, 0.13, 0.17],
      [0.19, 1.97, -0.02, 0.31, 0.14, 0.18], [-0.42, 1.91, -0.07, 0.24, 0.12, 0.16], [0.42, 1.8, 0.08, 0.23, 0.12, 0.16], [0.02, 2.2, 0.01, 0.26, 0.13, 0.17],
    ].map(([x, y, z, sx, sy, sz], index) => <mesh key={index} position={[x, y, z]} scale={[sx, sy, sz]} material={materials.leaf} castShadow><sphereGeometry args={[1, 12, 10]} /></mesh>)}
  </group>;
}

export function InteriorModel({ configuration = INITIAL_CONFIGURATION }: { configuration?: RoomConfiguration }) {
  const { scene } = useGLTF('/models/luxury-living-room.glb');
  const marbleTexture = useMemo(() => createMarbleTexture(), []);
  const materials = useMemo(() => ({
    wall: new MeshStandardMaterial({
      color: wallTones[configuration.wall],
      roughness: configuration.wall === 'Textured' ? 0.98 : 0.82,
      ...(configuration.wall === 'Textured' && marbleTexture ? { bumpMap: marbleTexture, bumpScale: 0.035 } : {}),
    }),
    floor: new MeshStandardMaterial({
      color: floorTones[configuration.floor],
      roughness: configuration.floor === 'Marble' ? 0.28 : configuration.floor === 'Concrete' ? 0.92 : 0.62,
      ...(configuration.floor === 'Marble' && marbleTexture ? { map: marbleTexture } : {}),
    }),
    sofa: new MeshStandardMaterial({ color: sofaTones[configuration.sofa], roughness: 0.92 }),
  }), [configuration.wall, configuration.floor, configuration.sofa, marbleTexture]);
  const room = useMemo(() => prepareRoom(scene, configuration, materials), [scene, configuration, materials]);
  return <group position={[-2, 0, 0]}><primitive object={room} dispose={null} /><PottedOliveTree /></group>;
}

