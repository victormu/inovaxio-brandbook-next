import test from "node:test";
import assert from "node:assert/strict";
import { encontrarCorCrua } from "./colorGuard.ts";

test("token semantico passa", () => {
  assert.deepEqual(encontrarCorCrua('color: "var(--color-primary)"'), []);
});

test("color-mix sobre token semantico passa", () => {
  const src = 'background: "color-mix(in srgb, var(--color-error) 8%, transparent)"';
  assert.deepEqual(encontrarCorCrua(src), []);
});

test("hex literal e apontado", () => {
  const r = encontrarCorCrua('color: "#ffffff"');
  assert.equal(r.length, 1);
  assert.equal(r[0].motivo, "literal");
});

test("hsl e rgb literais sao apontados", () => {
  assert.equal(encontrarCorCrua('color: "hsl(140 50% 60%)"')[0].motivo, "literal");
  assert.equal(encontrarCorCrua('background: "rgb(46 46 254 / 0.2)"')[0].motivo, "literal");
});

test("token primitivo e apontado, porque nao troca por banda", () => {
  const r = encontrarCorCrua('background: "hsl(var(--c-primary) / 0.1)"');
  assert.equal(r.length, 1);
  assert.equal(r[0].motivo, "primitivo");
});

test("reporta a linha certa", () => {
  const src = 'linha um\nlinha dois\ncolor: "#000"';
  assert.equal(encontrarCorCrua(src)[0].linha, 3);
});

test("ignora cor em comentario", () => {
  assert.deepEqual(encontrarCorCrua('// medido: "#6B6D78" da 4,40:1'), []);
});
