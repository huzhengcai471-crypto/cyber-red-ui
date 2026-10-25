import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

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

// Exercise the shipped observers and stylesheet, without media/RPC services.
const harness = String.raw`(() => {
  const CHAT_BG_URL = '';
  let heroBrandOriginal = null;
  const heroBrandOriginals = new Map();
  const heroBrandText = '', HERO_BRAND_DEFAULT = 'Test brand';
  ${slice('const restoreHeroBrandElements = function () {', 'const emitHeroBrand = function () {')}
  ${slice('const SETTINGS_ROOT_SELECTOR', '/* Frame-wide decoration:')}
  ${slice('const PLAN_CSS =', 'function PlanSettingsPage()')}
  ${slice('const RUNTIME_ATTRS =', '/* Master switch and brand-name preferences')}
  ${slice('const makeCopyRewrite =', '/* SettingsPanel is portaled')}
  ${slice('const isSettingsRoute =', '/* Arm everything last:')}
  const style = document.createElement('style');
  style.textContent = SHELL_CSS + '\n' + PLAN_CSS;
  document.head.appendChild(style);
  const disposeCopy = makeCopyRewrite();
  const disposeMarks = makeMarkingPass();
  return {
    attrs: RUNTIME_ATTRS,
    restoreHeroBrandElements,
    restoreAndStopMarking() { restoreHeroBrandElements(); disposeMarks(); },
    dispose() { disposeCopy(); disposeMarks(); clearRuntimeMarks(); style.remove(); }
  };
})()`;
new Script(harness, { filename: 'settings-browser-harness.js' });

const fixture = `<!doctype html><html><head><meta charset="utf-8"><style>
  :root { --dsw-alias-border-l1: #5a0d0d; --dsw-alias-border-l2: #6b1010;
    --dsw-alias-border-l3: #5a0d0d; --dsw-alias-brand-primary: #8b0000; }
  * { box-sizing: border-box; }
  body { margin: 0; color: white; font: 14px Arial; }
  .frame { display: grid; grid-template-columns: 260px 1fr 280px; height: 900px; }
  .sidebarCol { border-right: 1px solid var(--dsw-alias-border-l2); height: 900px; }
  [data-slot=sidebar] { height: 100%; }
  .sidebarCol nav { height: 280px; }
  .sidebarCol button { display: block; min-height: 32px; width: 220px; }
  [data-phase] { height: 900px; }
  .cr-rail { border-left: 1px solid var(--dsw-alias-border-l2); }
  .settings { display: flex; position: fixed; top: 90px; left: 280px;
    width: 760px; height: 620px; background: #181818;
    border: 1px solid var(--dsw-alias-border-l2); }
  .settings nav { width: 180px; flex: none; border-right: 1px solid var(--dsw-alias-border-l2); }
  .settings nav button { display: block; width: 160px; height: 36px; }
  .content { padding: 12px; flex: 1; min-width: 0; overflow: auto; }
  .native-group { height: 220px; border: 1px solid var(--dsw-alias-border-l2); }
  .native-field { border: 1px solid var(--dsw-alias-border-l2); }
  .native-field:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); }
</style></head><body>
  <div class="frame">
    <div class="sidebarCol" id="main-sidebar"><div data-slot="sidebar">
      <div data-window-drag>Brand</div>
      <button id="main-new">新会话</button>
      <nav><button id="main-plugins">插件</button><button>自动化任务</button>
        <div role="listitem" id="main-session" aria-selected="true">Session</div>
      </nav>
    </div></div>
    <div data-phase="chat"><h1 id="hero-title">探索未至之境</h1><div data-conversation-scroll>Conversation</div></div>
    <aside class="cr-rail">Monitor / calendar / weather</aside>
  </div>
</body></html>`;

const section = () => `<div data-slot="settings.section">
  <div class="native-group" data-cr-panel="right" data-cr-edge="left">
    <input class="native-field" id="native-field" value="Other plugin setting">
    <span id="native-copy">标准模式</span>
    <svg data-cr-wsicon width="16" height="16" style="color:rgb(0,90,255)"></svg>
  </div>
  <div class="cr-plan" data-cr-settings-self>
    <div class="cr-plan__section">
      <button class="cr-plan__music-toggle" id="music-toggle" aria-expanded="false">+</button>
      <div id="music-list" hidden><button class="cr-plan__music-preview">Play</button></div>
    </div>
    <input class="cr-plan__input" id="own-field">
    <button class="cr-plan__mark" id="own-mark" data-checked="1">Artwork</button>
  </div>
</div>`;

const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('http://cyber.test/**', route => route.fulfill({ body: fixture, contentType: 'text/html' }));
  await page.goto('http://cyber.test/');
  await page.evaluate(`window.testHarness = ${harness}`);
  await page.waitForFunction(() => document.querySelector('#hero-title').textContent === 'Test brand');
  await page.locator('#hero-title').evaluate(el => el.removeAttribute('data-cr-hero-title'));
  await page.evaluate(() => window.testHarness.restoreAndStopMarking());
  assert.equal(await page.locator('#hero-title').textContent(), '探索未至之境',
    'closing the plan restores the DSH headline even if another render removed its marker');

  const openSettings = async (legacy = false) => {
    await page.evaluate(({ content, legacy }) => {
      const modal = document.createElement('div');
      modal.id = 'settings';
      modal.className = 'settings';
      modal.setAttribute('role', 'dialog');
      if (!legacy) modal.setAttribute('data-shortcut-modal', 'settings');
      modal.setAttribute('data-cr-panel', 'left');
      modal.innerHTML = `<nav data-cr-panel="left"><button aria-current="true"
        data-cr-nav data-cr-selected>插件</button><button>通用</button><button>模型</button></nav>
        <div class="content">${content}</div>`;
      document.body.appendChild(modal);
      document.querySelector('#music-toggle').onclick = function () {
        const list = document.querySelector('#music-list');
        list.hidden = !list.hidden;
        this.setAttribute('aria-expanded', String(!list.hidden));
        list.appendChild(document.createTextNode(' '));
      };
    }, { content: section(), legacy });
  };
  const verifyIsolation = async () => {
    const state = await page.evaluate(() => {
      const settings = document.querySelector('#settings');
      const decorated = [settings, ...settings.querySelectorAll('*')].filter(el =>
        window.testHarness.attrs.some(attr => el.hasAttribute(attr)));
      return {
        decorated: decorated.map(el => el.outerHTML.slice(0, 200)),
        border: getComputedStyle(document.querySelector('#native-field')).borderTopColor,
        navShadow: getComputedStyle(settings.querySelector('nav button')).boxShadow,
        navLabel: settings.querySelector('nav button').textContent,
        nativeCopy: document.querySelector('#native-copy').textContent,
        sidebarFrame: document.querySelector('#main-sidebar').getAttribute('data-cr-panel'),
        mainNav: document.querySelector('#main-plugins').hasAttribute('data-cr-nav'),
        mainNew: document.querySelector('#main-new').hasAttribute('data-cr-newsession'),
      };
    });
    assert.deepEqual(state.decorated, [], 'settings must not retain decorative marks');
    assert.match(state.border, /^rgba\(255, 255, 255, 0\.1[0-9]+\)$/);
    assert.equal(state.navShadow, 'none');
    assert.equal(state.navLabel, '插件');
    assert.equal(state.nativeCopy, '标准模式');
    assert.equal(state.sidebarFrame, 'left', 'main sidebar must stay framed');
    assert.ok(state.mainNav && state.mainNew, `main sidebar commands must keep their styling: ${JSON.stringify(state)}`);
  };

  await openSettings();
  await verifyIsolation();
  await page.locator('#music-toggle').click();
  await verifyIsolation();
  await page.locator('#music-toggle').hover();
  assert.equal(await page.locator('#music-toggle').evaluate(el => getComputedStyle(el).boxShadow), 'none');
  await page.locator('#own-field').focus();
  await page.keyboard.press('Tab');
  const focus = await page.locator('#own-mark').evaluate(el => ({
    color: getComputedStyle(el).outlineColor,
    width: getComputedStyle(el).outlineWidth,
    shadow: getComputedStyle(el).boxShadow,
  }));
  assert.deepEqual(focus, { color: 'rgb(143, 184, 222)', width: '2px', shadow: 'none' });
  await page.screenshot({ path: path.join(packageRoot, 'tests/settings-isolation.png') });

  for (let i = 0; i < 3; i++) {
    await page.locator('.content').evaluate((el, html) => { el.innerHTML = html; }, section());
    await page.evaluate(() => window.dispatchEvent(new Event('resize')));
    await verifyIsolation();
    await page.locator('#settings').evaluate(el => el.remove());
    await openSettings(i === 2);
    await verifyIsolation();
  }

  await page.locator('#settings').evaluate(el => el.remove());
  await page.evaluate(() => {
    history.replaceState(null, '', '/settings');
    const main = document.createElement('main');
    main.id = 'route-settings';
    main.innerHTML = '<input class="native-field" data-cr-nav>';
    document.body.appendChild(main);
  });
  assert.equal(await page.locator('#route-settings').getAttribute('data-cr-settings-surface'), '');
  assert.equal(await page.locator('#route-settings input').getAttribute('data-cr-nav'), null);
  await page.evaluate(() => {
    history.replaceState(null, '', '/conversation');
    document.querySelector('#route-settings').appendChild(document.createTextNode('done'));
  });
  assert.equal(await page.locator('#route-settings').getAttribute('data-cr-settings-surface'), null);
  await page.evaluate(() => window.testHarness.dispose());
  assert.equal(await page.locator('[data-cr-settings-surface], [data-cr-panel]').count(), 0);
  assert.deepEqual(errors, []);
  console.log('ok: modal/route settings, stale marks, section changes, music expansion, keyboard focus, sidebar preservation and teardown');
} finally {
  await browser.close();
}
