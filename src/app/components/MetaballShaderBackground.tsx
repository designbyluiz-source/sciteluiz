import { useEffect, useRef } from "react";

const METABALL_EPOCH_MS = typeof performance !== "undefined" ? performance.now() : Date.now();

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

/** Port of Shadertoy mainImage — metaballs + iChannel0 dither, output inverted B&W */
const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_channel0;

void main() {
  float c = cos(u_time);
  float s = sin(u_time);
  float uvScale = 1.0;

  vec2 fragCoord = gl_FragCoord.xy;
  vec2 uv = fragCoord / u_resolution;
  uv.y *= u_resolution.y / u_resolution.x;
  uv.x = mix(-1.0 * uvScale, uvScale, uv.x);
  uv.y = mix(-1.0 * uvScale, uvScale, uv.y);

  vec2 m0 = vec2(sin(u_time * 0.5) * 0.5 - 0.23, abs(s * 0.5) - 1.0);
  vec2 m1 = vec2(cos(u_time * 0.7) * 0.4 + 0.1, abs(sin(u_time * 0.25)) * 0.9 - 1.0);
  vec2 m2 = vec2(sin(u_time * 1.33) * 0.3, cos(u_time * 1.3) * 0.3 - 0.8);
  vec2 m3 = vec2(c * 0.5, abs(s * 0.9 * s * 0.3) - 1.0);

  float e = 0.00015;
  float sum =
      0.04 / pow(max(e, distance(uv, m0)), 2.0)
    + 0.01 / pow(max(e, distance(uv, m1)), 2.0)
    + 0.3 / pow(max(e, distance(uv, m2)), 2.0)
    + 0.03 / pow(max(e, distance(uv, m3)), 2.0);

  vec4 ballCol = vec4(sum);

  vec2 tc = mod(fragCoord, vec2(8.0)) / 8.0;
  vec3 ch0 = texture2D(u_channel0, tc).xyz;
  vec3 oldcolor = ballCol.xyz * ch0;
  vec3 dithered = floor(vec3(oldcolor.x, oldcolor.x, oldcolor.x));
  gl_FragColor = vec4(1.0 - dithered, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("[MetaballShaderBackground] shader compile:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/** 8×8 Bayer-ish values 0–255 for iChannel0-style modulation */
function makeDitherTextureData(): Uint8Array {
  const bayer8 = [
    0, 48, 12, 60, 3, 51, 15, 63,
    32, 16, 44, 28, 35, 19, 47, 31,
    8, 56, 4, 52, 11, 59, 7, 55,
    40, 24, 36, 20, 43, 27, 39, 23,
    2, 50, 14, 62, 1, 49, 13, 61,
    34, 18, 46, 30, 33, 17, 45, 29,
    10, 58, 6, 54, 9, 57, 5, 53,
    42, 26, 38, 22, 41, 25, 37, 21,
  ];
  const rgba = new Uint8Array(8 * 8 * 4);
  for (let i = 0; i < 64; i++) {
    const v = bayer8[i];
    const o = i * 4;
    rgba[o] = rgba[o + 1] = rgba[o + 2] = v;
    rgba[o + 3] = 255;
  }
  return rgba;
}

type MetaballShaderBackgroundProps = {
  className?: string;
};

export function MetaballShaderBackground({ className = "" }: MetaballShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("[MetaballShaderBackground] program link:", gl.getProgramInfoLog(prog));
      gl.deleteProgram(prog);
      return;
    }

    const aPos = gl.getAttribLocation(prog, "a_position");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uChan = gl.getUniformLocation(prog, "u_channel0");

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 8, 8, 0, gl.RGBA, gl.UNSIGNED_BYTE, makeDitherTextureData());

    let raf = 0;

    const draw = () => {
      if (document.hidden) {
        raf = 0;
        return;
      }
      const t = (performance.now() - METABALL_EPOCH_MS) / 1000;
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.uniform1i(uChan, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!document.hidden) raf = requestAnimationFrame(draw);
      else raf = 0;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const pw = Math.max(1, Math.floor(w * dpr));
      const ph = Math.max(1, Math.floor(h * dpr));
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onVis = () => {
      if (!document.hidden && raf === 0) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 size-full max-w-none ${className}`}
      aria-hidden
    />
  );
}
