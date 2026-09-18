import test from "node:test";
import assert from "node:assert/strict";
import { bandFromClasses, isBandEscura } from "./band.ts";

test("sem classe de contexto, a banda e clara", () => {
  assert.equal(bandFromClasses(["panel"]), "light");
});

test("le a banda a partir da classe de contexto", () => {
  assert.equal(bandFromClasses(["panel", "ctx-dim"]), "dim");
  assert.equal(bandFromClasses(["panel", "ctx-navy"]), "navy");
  assert.equal(bandFromClasses(["cover", "ctx-dark"]), "dark");
});

test("com mais de uma classe, a mais escura manda", () => {
  assert.equal(bandFromClasses(["ctx-dim", "ctx-dark"]), "dark");
  assert.equal(bandFromClasses(["ctx-dim", "ctx-navy"]), "navy");
});

test("so preto e navy pedem texto claro", () => {
  assert.equal(isBandEscura("dark"), true);
  assert.equal(isBandEscura("navy"), true);
  assert.equal(isBandEscura("dim"), false);
  assert.equal(isBandEscura("light"), false);
});
