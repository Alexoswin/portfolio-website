"use client";

import { useEffect, useRef, useState } from "react";

const VERTEX_SHADER = /* glsl */ `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

// Analytic sphere + corona; uSun morphs 0 = crescent moon -> 1 = sun (waxes to full, then ignites).
const FRAGMENT_SHADER = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uSun;
varying vec2 vUv;

const float R = 0.2;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
    mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
    f.z);
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + 11.7;
    a *= 0.5;
  }
  return v;
}

// Distance to the nearest scattered feature point — crater centres.
float worley(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  float d = 1.0;
  for (int x = -1; x <= 1; x++)
  for (int y = -1; y <= 1; y++)
  for (int z = -1; z <= 1; z++) {
    vec3 g = vec3(float(x), float(y), float(z));
    vec3 o = vec3(hash(i + g), hash(i + g + 19.1), hash(i + g + 47.3));
    vec3 r = g + o - f;
    d = min(d, dot(r, r));
  }
  return sqrt(d);
}

mat3 rotX(float a) {
  float c = cos(a), s = sin(a);
  return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);
}

mat3 rotY(float a) {
  float c = cos(a), s = sin(a);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

void main() {
  vec2 p = vUv;
  float d = length(p);
  float px = 2.0 / uRes.x;
  float t = max(d - R, 0.0);

  // Corona — tight bloom + wide haze, with drifting streamers for the sun.
  float streamers = pow(noise(vec3(normalize(p) * 5.0, uTime * 0.5)), 2.5);
  float sunGlow = exp(-t * 9.0) * 0.9 + exp(-t * 3.2) * 0.35 + streamers * exp(-t * 4.5) * 0.45;
  float moonGlow = exp(-t * 7.0) * 0.4 + exp(-t * 2.6) * 0.14;
  float glowA = mix(moonGlow, sunGlow, uSun) * (1.0 - smoothstep(0.75, 1.0, d)) * smoothstep(R - px, R + px, d);
  glowA = clamp(glowA, 0.0, 1.0);
  vec3 glowCol = mix(vec3(0.62, 0.7, 0.95), vec3(1.0, 0.8, 0.42), uSun);

  vec3 col = glowCol * glowA;
  float alpha = glowA;

  if (d < R + px) {
    vec2 sp = p / R;
    float z = sqrt(max(1.0 - dot(sp, sp), 0.0));
    vec3 n = vec3(sp, z);
    vec3 q = rotX(0.35) * rotY(uTime * 0.45) * n;

    // Sun: granulation, convection cells, a few spots, limb darkening.
    float gran = fbm(q * 7.0 + vec3(0.0, uTime * 0.6, 0.0));
    float cells = fbm(q * 18.0 - uTime * 0.4);
    float spots = smoothstep(0.62, 0.7, fbm(q * 2.5 + 4.0));
    vec3 sunCol = mix(vec3(0.96, 0.55, 0.16), vec3(1.0, 0.86, 0.38), gran);
    sunCol = mix(sunCol, vec3(1.0, 0.98, 0.88), smoothstep(0.35, 1.0, z) * 0.75);
    sunCol *= (0.85 + 0.3 * cells) * (1.0 - spots * 0.55);
    sunCol *= (0.55 + 0.45 * sqrt(z)) * 1.25;

    // Moon: maria, two scales of craters with bright rims, regolith grain.
    float maria = smoothstep(0.45, 0.62, fbm(q * 1.8 + 2.0));
    float w1 = worley(q * 4.0);
    float w2 = worley(q * 9.0);
    float bowls = (1.0 - smoothstep(0.05, 0.3, w1)) * 0.18 + (1.0 - smoothstep(0.03, 0.22, w2)) * 0.1;
    float rims = smoothstep(0.22, 0.3, w1) * (1.0 - smoothstep(0.3, 0.38, w1)) * 0.1;
    vec3 moonAlbedo = vec3(0.92, 0.94, 0.98) * (1.0 - maria * 0.28 - bowls + rims);
    moonAlbedo *= 0.92 + 0.16 * fbm(q * 12.0);

    // Light swings from behind-left (crescent) to face-on as uSun rises.
    vec3 L = normalize(mix(vec3(-0.85, -0.3, -0.42), vec3(0.0, 0.0, 1.0), uSun));
    float lit = smoothstep(-0.08, 0.3, dot(n, L));
    // Unlit side: a faint, partly see-through earthshine ghost, not a black hole.
    vec3 moonCol = mix(vec3(0.36, 0.42, 0.6), moonAlbedo, lit);

    float fres = pow(1.0 - z, 3.0);
    vec3 sphere = mix(moonCol, sunCol, uSun);
    sphere += mix(vec3(0.55, 0.62, 0.85) * 0.3 * lit, vec3(1.0, 0.75, 0.35) * 0.5, uSun) * fres;

    float cover = (1.0 - smoothstep(R - px, R + px, d)) * mix(0.22 + 0.78 * lit, 1.0, uSun);
    col = sphere * cover + col * (1.0 - cover);
    alpha = cover + alpha * (1.0 - cover);
  }

  gl_FragColor = vec4(col, alpha);
}
`;

let webglSupported: boolean | undefined;

function hasWebGL() {
  if (webglSupported === undefined) {
    const gl = document.createElement("canvas").getContext("webgl");
    webglSupported = gl !== null;
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }
  return webglSupported;
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

/** Seconds into the pass over which the outgoing body morphs into the incoming one. */
const MORPH_START = 0.1;
const MORPH_END = 0.8;

/** Starts the shader loop on `canvas`; returns a stop function, or undefined if GL setup failed. */
function startOrb(canvas: HTMLCanvasElement, kind: "sun" | "moon") {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(canvas.clientWidth * dpr);
  canvas.height = Math.round(canvas.clientHeight * dpr);

  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
  });
  if (!gl) return;
  // Browsers cap live contexts; each pass makes a fresh canvas, so free it on stop.
  const release = () => gl.getExtension("WEBGL_lose_context")?.loseContext();

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return release;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return release;
  gl.useProgram(program);

  // One oversized triangle covers the viewport — no seam down a diagonal.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(program, "uTime");
  const uSun = gl.getUniformLocation(program, "uSun");
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform2f(
    gl.getUniformLocation(program, "uRes"),
    canvas.width,
    canvas.height,
  );

  const start = performance.now();
  let frame = 0;
  const draw = (now: number) => {
    const seconds = (now - start) / 1000;
    const x = Math.min(
      Math.max((seconds - MORPH_START) / (MORPH_END - MORPH_START), 0),
      1,
    );
    const eased = x * x * (3 - 2 * x);
    gl.uniform1f(uTime, seconds);
    gl.uniform1f(uSun, kind === "sun" ? eased : 1 - eased);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    frame = requestAnimationFrame(draw);
  };
  frame = requestAnimationFrame(draw);

  return () => {
    cancelAnimationFrame(frame);
    release();
  };
}

/** Rising body of the theme-switch pass; renders `fallback` where WebGL is unavailable. */
export function CelestialOrb({
  kind,
  fallback,
}: {
  kind: "sun" | "moon";
  fallback: React.ReactNode;
}) {
  const [supported] = useState(hasWebGL);
  const hostRef = useRef<HTMLSpanElement>(null);

  // The canvas is created per effect run: a remount (e.g. StrictMode) must not
  // reuse a canvas whose context the previous cleanup already lost.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const canvas = document.createElement("canvas");
    canvas.className = "celestial-orb-canvas";
    host.appendChild(canvas);
    const stop = startOrb(canvas, kind);
    return () => {
      stop?.();
      canvas.remove();
    };
  }, [kind]);

  if (!supported) return fallback;

  return <span ref={hostRef} className="celestial-body" />;
}
