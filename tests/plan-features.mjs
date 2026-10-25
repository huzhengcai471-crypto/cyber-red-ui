import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { Script, createContext } from 'node:vm';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const runtimeModules = process.env.PLAYWRIGHT_MODULE_DIR || path.join(os.homedir(),
  '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
const { chromium } = createRequire(path.join(runtimeModules, 'package.json'))('playwright');
const source = await fs.readFile(path.join(packageRoot, 'client.js'), 'utf8');
const slice = (start, end) => {
  const offset = source.indexOf(start);
  assert.ok(offset >= 0, `missing source boundary: ${start}`);
  const limit = source.indexOf(end, offset);
  assert.ok(limit > offset, `missing source boundary: ${end}`);
  return source.slice(offset, limit);
};

const appearanceFactory = slice('const createPlanAppearanceController =', 'const createRightbarMutualExclusion =');
const appearanceHarness = new Script(`(() => {
  const PLAN_APPEARANCE_KEY = 'cr-plan-original-appearance';
  const PLAN_APPEARANCES = ['light', 'dark', 'system'];
  let planEnabled = true;
  ${appearanceFactory}
  return { create: createPlanAppearanceController, setEnabled(value) { planEnabled = value; } };
})()`);
const store = new Map();
const windowStub = { localStorage: {
  getItem: key => store.has(key) ? store.get(key) : null,
  setItem: (key, value) => store.set(key, String(value)),
  removeItem: key => store.delete(key),
} };
const appearanceContext = createContext({ window: windowStub });
const appearance = appearanceHarness.runInContext(appearanceContext);
const createAppearanceCase = (preference, stored) => {
  appearance.setEnabled(true);
  store.clear();
  if (stored) store.set('cr-plan-original-appearance', stored);
  const form = { snapshot: { status: 'ready', value: { preference } },
    getSnapshot() { return this.snapshot; }, subscribe() { return () => {}; } };
  const theme = { preference, onChange: null,
    getTheme() { return { preference: this.preference }; },
    setTheme(next) {
      this.preference = next;
      form.snapshot.value.preference = next;
      this.onChange?.({ preference: next });
    } };
  const controller = appearance.create(theme, form);
  theme.onChange = controller.enforce;
  return { form, theme, controller };
};

{
  const state = createAppearanceCase('light');
  state.controller.sync();
  assert.equal(state.theme.preference, 'dark');
  assert.equal(store.get('cr-plan-original-appearance'), 'light');
  appearance.setEnabled(false);
  state.controller.sync();
  assert.equal(state.theme.preference, 'light');
  assert.equal(store.has('cr-plan-original-appearance'), false);
}
{
  const state = createAppearanceCase('dark');
  state.controller.sync();
  assert.equal(state.theme.preference, 'dark');
  appearance.setEnabled(false);
  state.controller.sync();
  assert.equal(state.theme.preference, 'dark');
}
{
  const state = createAppearanceCase('system');
  state.controller.sync();
  assert.equal(state.theme.preference, 'dark');
  appearance.setEnabled(false);
  state.controller.sync();
  assert.equal(state.theme.preference, 'system');
}
{
  const state = createAppearanceCase('dark', 'light');
  state.controller.sync();
  state.form.snapshot.status = 'loading';
  state.theme.setTheme('light');
  assert.equal(state.theme.preference, 'dark', 'manual appearance changes are held dark while the plan is on');
  appearance.setEnabled(false);
  state.controller.sync();
  assert.equal(state.theme.preference, 'dark', 'wait for DSH settings before restoring');
  state.form.snapshot.status = 'ready';
  state.controller.sync();
  assert.equal(state.theme.preference, 'light');
}
{
  const state = createAppearanceCase('light');
  state.form.snapshot.status = 'loading';
  state.controller.sync();
  assert.equal(state.theme.preference, 'light', 'wait for the saved DSH appearance to load');
  assert.equal(store.has('cr-plan-original-appearance'), false);
  state.form.snapshot.status = 'ready';
  state.controller.sync();
  assert.equal(state.theme.preference, 'dark');
  assert.equal(store.get('cr-plan-original-appearance'), 'light');
}

const rightbarFactory = slice('const createRightbarMutualExclusion =', 'const planListeners');
const railSetter = slice('const setRailOpen = (next) => {', 'const useRailOpen =');
const restoreRailFactory = slice('const restoreRailAfterGate =', '/* Budget for the whole startup pass.');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage();
  await page.setContent('<!doctype html><body><div id="rightbar" data-sidebar-right-session="session-1" aria-hidden="true"><button data-sidebar-right-toggle>Close</button></div></body>');
  await page.evaluate(({ rightbarFactory, railSetter, restoreRailFactory }) => {
    let railOpen = false;
    let railOpenBeforeGate = null;
    const rightbar = document.querySelector('#rightbar');
    rightbar.querySelector('[data-sidebar-right-toggle]').addEventListener('click', function () {
      rightbar.removeAttribute('data-sidebar-right-open');
      rightbar.setAttribute('aria-hidden', 'true');
    });
    const applyRailWidth = function () {};
    const emitRail = function () {};
    eval(`const closeNativeRightbarForRail = () => closeOpenRightbar(null);
      ${railSetter}; ${restoreRailFactory}; ${rightbarFactory}
      window.setLabOpen = setRailOpen;
      window.isLabOpen = () => railOpen;
      window.startMutualExclusion = () => createRightbarMutualExclusion(
        setRailOpen, () => railOpen, closeNativeRightbarForRail
      );
      window.stopMutualExclusion = window.startMutualExclusion();
      window.pauseLabForGate = () => {
        if (railOpen) {
          railOpenBeforeGate = railOpen;
          setRailOpen(false);
        }
      };
      window.restoreLabAfterGate = restoreRailAfterGate;`);
  }, { rightbarFactory, railSetter, restoreRailFactory });

  await page.evaluate(() => {
    const panel = document.querySelector('#rightbar');
    panel.removeAttribute('aria-hidden');
    panel.setAttribute('data-sidebar-right-open', '');
  });
  assert.equal(await page.locator('#rightbar').getAttribute('data-sidebar-right-open'), '');
  assert.equal(await page.evaluate(() => window.setLabOpen(true)), undefined);
  assert.equal(await page.locator('#rightbar').getAttribute('data-sidebar-right-open'), null,
    'opening the lab rail closes the native rightbar');

  await page.evaluate(() => {
    const panel = document.querySelector('#rightbar');
    panel.removeAttribute('aria-hidden');
    panel.setAttribute('data-sidebar-right-open', '');
  });
  await page.waitForFunction(() => !window.isLabOpen());
  assert.equal(await page.locator('#rightbar').getAttribute('data-sidebar-right-open'), '');

  await page.evaluate(() => window.setLabOpen(true));
  await page.evaluate(() => window.stopMutualExclusion());
  await page.evaluate(() => window.pauseLabForGate());
  await page.evaluate(() => {
    const panel = document.querySelector('#rightbar');
    panel.removeAttribute('aria-hidden');
    panel.setAttribute('data-sidebar-right-open', '');
  });
  await page.evaluate(() => { window.stopMutualExclusion = window.startMutualExclusion(); });
  await page.evaluate(() => window.restoreLabAfterGate());
  assert.equal(await page.evaluate(() => window.isLabOpen()), true,
    'the remembered lab rail is restored after the plan gate re-arms');
  assert.equal(await page.locator('#rightbar').getAttribute('data-sidebar-right-open'), null,
    'restoring the lab rail after a gate closes a rightbar opened while the plan was paused');

  await page.evaluate(() => window.stopMutualExclusion());
  await page.evaluate(() => window.setLabOpen(false));
  await page.evaluate(() => {
    const panel = document.querySelector('#rightbar');
    panel.removeAttribute('aria-hidden');
    panel.setAttribute('data-sidebar-right-open', '');
  });
  assert.equal(await page.locator('#rightbar').getAttribute('data-sidebar-right-open'), '',
    'observer is removed cleanly when plan runtime disarms');
  assert.equal(await page.evaluate(() => window.isLabOpen()), false);
  console.log('ok: appearance restore/lock, settings readiness, rail/rightbar mutual exclusion');
} finally {
  await browser.close();
}
