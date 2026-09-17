import test from "node:test";
import assert from "node:assert/strict";
import { pickActiveId } from "./activeSection.ts";

test("sem secoes, devolve null", () => {
  assert.equal(pickActiveId([]), null);
});

test("escolhe a secao visivel mais proxima do topo da viewport", () => {
  assert.equal(
    pickActiveId([
      { id: "logo", top: -40, isIntersecting: true },
      { id: "cor", top: 320, isIntersecting: true },
    ]),
    "logo",
  );
});

test("com nada visivel, mantem a ultima secao ja ultrapassada", () => {
  assert.equal(
    pickActiveId([
      { id: "logo", top: -900, isIntersecting: false },
      { id: "cor", top: -200, isIntersecting: false },
      { id: "tipografia", top: 1400, isIntersecting: false },
    ]),
    "cor",
  );
});

test("antes da primeira secao entrar, devolve null", () => {
  assert.equal(
    pickActiveId([{ id: "logo", top: 800, isIntersecting: false }]),
    null,
  );
});
