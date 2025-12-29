---
subject: Games Development
title: Handling Basic Endpoint Authorization with ASP.NET Core TestServer
date: '2023-08-15T21:15:00.000Z'
tags:
  - gamedev
  - godot
coverImage: ./handling-basic-endpoint-authorization-with-aspnetcore-testserver.jpg
coverImageCredit: Dim Hou on Unsplash
coverImageCreditUrl: https://unsplash.com/photos/BjD3KhnTIkg
---

## 01 - Basic
godot-procedural-checkerboard-basic.png

Good start, but not aligned to faces. Fixed pattern which "moves" over the surface as the camera moves.

```sh
shader_type spatial;

uniform float size : hint_range(1.0, 100.0) = 25.0;
uniform vec3 color1 : source_color = vec3(1.0, 1.0, 1.0);
uniform vec3 color2 : source_color = vec3(0.7, 0.7, 0.7);

void fragment() {
    vec2 pos = floor(FRAGCOORD.xy / size);
    float pattern_mask = mod(pos.x + mod(pos.y, 2.0), 2.0);
    ALBEDO = mix(color1, color2, pattern_mask);
}
```

## 02 - Aligned to faces
godot-procedural-checkerboard-face-aligned-stretched.png

Better, aligned to faces. But the pattern is stretched or compressed on some faces and not even. We want consistent size

```sh
shader_type spatial;

uniform float size : hint_range(1.0, 100.0) = 25.0;
uniform vec3 color1 : source_color = vec3(1.0, 1.0, 1.0);
uniform vec3 color2 : source_color = vec3(0.7, 0.7, 0.7);

void fragment() {
    vec2 pos = floor(UV * size);
    float pattern_mask = mod(pos.x + mod(pos.y, 2.0), 2.0);
    ALBEDO = mix(color1, color2, pattern_mask);
}
```

## 03 - Aligned to faces, consistent size at certain angles, stretching off-angle
godot-procedural-checkerboard-stretching-at-angle.png

Looks mostly right but a shear camera angles, we see the checker pattern change so stretching occurs.

The stretching occurs because of projection plane switching during interpolation.

```sh
shader_type spatial;

uniform float size : hint_range(1.0, 10.0) = 1;
uniform vec3 color1 : source_color = vec3(1.0, 1.0, 1.0);
uniform vec3 color2 : source_color = vec3(0.7, 0.7, 0.7);

varying vec3 world_position;

void vertex() {
	world_position = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
}

void fragment() {
	// Using interpolated normal in fragment shader - causes artifacts at edges!
	vec3 world_normal = normalize((MODEL_MATRIX * vec4(NORMAL, 0.0)).xyz);
	vec3 abs_normal = abs(world_normal);

	vec2 pattern_coords;

	// Determine which face this fragment belongs to using interpolated normal
	if (abs_normal.x > abs_normal.y && abs_normal.x > abs_normal.z) {
		// X face
		pattern_coords = world_position.yz;
	} else if (abs_normal.y > abs_normal.z) {
		// Y face
		pattern_coords = world_position.xz;
	} else {
		// Z face
		pattern_coords = world_position.xy;
	}

	vec2 pos = floor(pattern_coords * size);
    float pattern_mask = mod(pos.x + mod(pos.y, 2.0), 2.0);
    ALBEDO = mix(color1, color2, pattern_mask);
}
```

The Root Cause: Interpolated Normal Ambiguity

When the normal is interpolated across a face in the fragment shader, pixels near edges experience a critical issue:

1. At cube edges, the interpolated normal becomes roughly (0.707, 0.707, 0) or similar - nearly equal components
2. The comparison logic (if abs_normal.x > abs_normal.y > abs_normal.z) becomes unstable
3. Adjacent pixels can make different decisions about which plane to project onto

The Stretching Mechanism

Here's what causes the visual stretching:

// Fragment A might choose: pattern_coords = world_position.yz
// Fragment B (1 pixel away) might choose: pattern_coords = world_position.xz

When neighboring fragments use different projection planes:
- The pattern coordinates suddenly jump between completely different 2D spaces
- Instead of smooth interpolation, you get discontinuous coordinate changes
- This manifests as stretching because the shader is trying to blend between incompatible coordinate systems

Camera Angle Sensitivity

The effect worsens at certain camera angles because:

1. Screen-space derivatives affect how the GPU interpolates normals
2. Grazing angles make the normal interpolation more extreme
3. Perspective distortion changes which fragments are neighbors on screen
4. The GPU's fragment clustering (2x2 quads) can span across the decision boundary

Why It Doesn't "Repeat" Properly

The pattern appears to not repeat because:
- Fragments are sampling from different slices of 3D space (YZ vs XZ vs XY)
- These slices are orthogonal to each other - completely unrelated pattern spaces
- The transition zone shows a garbled mix of two unrelated checker patterns

The Mathematical Breakdown

At an edge between faces, say where X and Y faces meet at 45°:
- Vertex normals: (1,0,0) and (0,1,0)
- Interpolated normal at edge: ~(0.707, 0.707, 0)
- The abs_normal.x ≈ abs_normal.y comparison becomes numerically unstable
- Floating-point precision causes adjacent pixels to flip-flop between decisions

This is why the vertex shader approach is superior - it makes the projection decision once per triangle, ensuring all fragments within that triangle use the same consistent
coordinate system.

The artifacts you'll see when screenshotting:
- Blurry transitions at cube edges where the normal interpolates between face directions
- Pattern misalignment where checkers don't line up properly across face boundaries
- Pixel noise along edges as neighboring fragments flip between different face projections

## 04 - Aligned to faces, consistent size
godot-procedural-checkerboard-face-aligned-sized.png

looks shit on curved surfaces

```sh
shader_type spatial;

uniform float size : hint_range(1.0, 10.0) = 1;
uniform vec3 color1 : source_color = vec3(1.0, 1.0, 1.0);
uniform vec3 color2 : source_color = vec3(0.7, 0.7, 0.7);

varying vec3 world_position;
varying vec2 pattern_coords;

void vertex() {
	world_position = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;

	// Calculate face normal in vertex shader to avoid interpolation issues
	vec3 world_normal = normalize((MODEL_MATRIX * vec4(NORMAL, 0.0)).xyz);
	vec3 abs_normal = abs(world_normal);

	// Determine which face this vertex belongs to and set pattern coordinates
	if (abs_normal.x > abs_normal.y && abs_normal.x > abs_normal.z) {
		// X face
		pattern_coords = world_position.yz;
	} else if (abs_normal.y > abs_normal.z) {
		// Y face
		pattern_coords = world_position.xz;
	} else {
		// Z face
		pattern_coords = world_position.xy;
	}
}

void fragment() {
	vec2 pos = floor(pattern_coords * size);
    float pattern_mask = mod(pos.x + mod(pos.y, 2.0), 2.0);
    ALBEDO = mix(color1, color2, pattern_mask);
}
```

This Godot shader creates a 3D checkerboard pattern that correctly wraps around any mesh surface. Let me break down the clever techniques used:

The Core Challenge

Creating a checkerboard pattern on 3D objects isn't trivial - you need the pattern to look correct from every angle and seamlessly wrap around corners without distortion or
discontinuities.

The Solution Architecture

1. World-Space Mapping (Lines 11, 20, 23, 26)

The shader uses world-space coordinates instead of UV coordinates. This is crucial because:
- UV mapping would stretch/compress the pattern based on how the mesh is unwrapped
- World-space ensures consistent checker size regardless of object scale or UV layout
- The pattern automatically tiles infinitely in 3D space

2. Face-Dependent Projection (Lines 14-27)

The brilliant part is how it handles different faces:
// Determine dominant axis by comparing normal components
if (abs_normal.x > abs_normal.y && abs_normal.x > abs_normal.z):
pattern_coords = world_position.yz  // Project onto YZ plane
else if (abs_normal.y > abs_normal.z):
pattern_coords = world_position.xz  // Project onto XZ plane
else:
pattern_coords = world_position.xy  // Project onto XY plane

This triplanar mapping approach:
- Prevents texture stretching on steep angles
- Ensures checkers align properly at edges where faces meet
- Works on any mesh topology without custom UV mapping

3. Vertex Shader Calculation (Line 10-28)

Computing the projection in the vertex shader rather than fragment shader is an optimization:
- Face determination happens per-vertex (fewer calculations)
- The pattern_coords varying interpolates smoothly across the surface
- Avoids potential aliasing from per-pixel normal calculations

4. The Checkerboard Math (Lines 31-33)

vec2 pos = floor(pattern_coords * size);
float pattern_mask = mod(pos.x + mod(pos.y, 2.0), 2.0);

This elegant formula:
- floor(pattern_coords * size) creates grid cells
- mod(pos.y, 2.0) offsets every other row
- mod(pos.x + offset, 2.0) creates the alternating pattern
- Results in a clean 0 or 1 mask for color mixing

Design Decisions Explained

Why not use UV coordinates?
- Would require careful UV unwrapping for each mesh
- Pattern size would vary with UV scale
- Seams would be visible at UV boundaries

Why calculate normal in vertex shader?
- Interpolated normals in fragment shader can cause artifacts at edges
- Vertex-level decision ensures all pixels on a face use the same projection

Why use world position instead of local?
- Pattern remains stable when object moves
- Multiple objects share the same pattern grid
- Creates coherent visual space

Customization Points

- size: Controls checker density (1-10 range)
- color1/color2: Fully customizable colors with source_color hint for linear color space
- Easy to extend with roughness, metallic variations per checker

This shader exemplifies good graphics programming: solving a complex 3D problem with elegant math, optimizing where it matters, and providing intuitive artist controls.

## 05 - 3D lattice

Doesn't work on non-grid aligned meshes, get narrow bands, works well on uneven surfaces

```sh
shader_type spatial;

uniform float checker_scale = 1;
uniform vec3 color1 : source_color = vec3(1.0, 1.0, 1.0);
uniform vec3 color2 : source_color = vec3(0.7, 0.7, 0.7);

varying vec3 world_pos;

void vertex() {
    world_pos = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
}

void fragment() {
	// Scale the position to control the size of the grid
	vec3 pos = world_pos / checker_scale;

	// Get modulo of each component of the position
	float x_mod = mod(floor(pos.x), 2.0);
	float y_mod = mod(floor(pos.y), 2.0);
	float z_mod = mod(floor(pos.z), 2.0);

	// Use the sum of components and get modulo
	// - mod(even sum) = black
	// - mod(odd sum) = white
	float m = mod(x_mod + y_mod + z_mod, 2.0);

	// Mix the colors
	ALBEDO = mix(color1, color2, m);
}
```