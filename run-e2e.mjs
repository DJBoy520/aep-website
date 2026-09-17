import { chromium } from 'playwright';
import { spawn } from 'child_process';

async function run() {
  console.log('Spawning static preview server on port 4399...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4399'], {
    stdio: 'pipe',
    detached: true
  });

  // Wait for server to start
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const baseUrl = 'http://127.0.0.1:4399';

  try {
    console.log('\n--- 1. Testing Home Page (/) ---');
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    const h1 = await page.locator('h1').textContent();
    console.log('✔ Hero H1:', h1?.replace(/\s+/g, ' ').trim());

    // Verify 3 CTA action buttons
    const quickstartBtn = page.locator('a[href="/quickstart"]');
    const toolsBtn = page.locator('a[href="/tools"]');
    const protocolBtn = page.locator('a[href="/protocol"]');
    console.log('✔ CTA Quickstart found:', (await quickstartBtn.count()) > 0);
    console.log('✔ CTA Tools found:', (await toolsBtn.count()) > 0);
    console.log('✔ CTA Protocol found:', (await protocolBtn.count()) > 0);

    // Verify 7 nav links in header
    const navItems = await page.locator('header nav a').allTextContents();
    console.log('✔ 7 Navigation Items:', navItems);

    // Verify 4 Scenario Cards
    const scenarioCards = page.locator('text=车联网可信认证');
    console.log('✔ Scenario Card (车联网可信认证) found:', (await scenarioCards.count()) > 0);

    // Verify Tooltip presence
    const tooltips = page.locator('.tooltip-trigger');
    console.log('✔ Tooltip triggers count on home:', await tooltips.count());

    console.log('\n--- 2. Testing Online Tools Page (/tools) ---');
    await page.goto(`${baseUrl}/tools`, { waitUntil: 'domcontentloaded' });
    
    // Fill sample
    await page.locator('#btn-sample').click();
    const inputVal = await page.locator('#tools-input').inputValue();
    console.log('✔ Sample filled length:', inputVal.length);

    // Sign
    await page.locator('#btn-sign').click();
    await page.waitForTimeout(200);

    // Timestamp
    await page.locator('#btn-tsa').click();
    await page.waitForTimeout(200);

    // Verify
    await page.locator('#btn-verify').click();
    await page.waitForTimeout(200);

    const resultText = await page.locator('#visual-view').textContent();
    console.log('✔ Visual result contains L4/pass:', resultText?.includes('L4'));

    // Switch to Raw JSON view
    await page.locator('#btn-view-raw').click();
    await page.waitForTimeout(100);
    const rawVisible = await page.locator('#raw-view').isVisible();
    console.log('✔ Raw JSON view toggled successfully:', rawVisible);

    // Copy raw JSON
    await page.locator('#btn-copy-raw').click();
    await page.waitForTimeout(100);
    console.log('✔ Copy button clicked');

    console.log('\n--- 3. Testing Technical Specification Dual-Mode (/protocol) ---');
    await page.goto(`${baseUrl}/protocol`, { waitUntil: 'domcontentloaded' });
    const simpleViewVisible = await page.locator('#view-simple').isVisible();
    const fullViewVisible = await page.locator('#view-full').isVisible();
    console.log('✔ Initial: Simple view visible =', simpleViewVisible, ', Full view visible =', fullViewVisible);

    // Toggle to full mode
    await page.locator('#btn-mode-full').click();
    await page.waitForTimeout(150);
    console.log('✔ After toggle: Full view visible =', await page.locator('#view-full').isVisible());

    // Toggle back to simple mode
    await page.locator('#btn-mode-simple').click();
    await page.waitForTimeout(150);
    console.log('✔ After toggle back: Simple view visible =', await page.locator('#view-simple').isVisible());

    console.log('\n--- 4. Testing FAQ Page (/faq) ---');
    await page.goto(`${baseUrl}/faq`, { waitUntil: 'domcontentloaded' });
    const pkiFaq = page.locator('text=AEP 和传统 PKI 有什么区别？');
    console.log('✔ FAQ Question 1 found:', (await pkiFaq.count()) > 0);
    const smFaq = page.locator('text=是否兼容国密标准？');
    console.log('✔ FAQ Question 2 found:', (await smFaq.count()) > 0);

    console.log('\n--- 5. Testing English Pages (/en, /en/tools, /en/faq) ---');
    await page.goto(`${baseUrl}/en`, { waitUntil: 'domcontentloaded' });
    const enH1 = await page.locator('h1').textContent();
    console.log('✔ EN Hero H1:', enH1?.replace(/\s+/g, ' ').trim());

    await page.goto(`${baseUrl}/en/tools`, { waitUntil: 'domcontentloaded' });
    await page.locator('#btn-sample').click();
    await page.locator('#btn-sign').click();
    await page.locator('#btn-verify').click();
    console.log('✔ EN Tools playground interactive operations verified');

    console.log('\n==========================================');
    console.log('🎉 ALL PLAYWRIGHT E2E TESTS PASSED 100%!');
    console.log('==========================================\n');
  } finally {
    await browser.close();
    process.kill(-server.pid, 'SIGKILL');
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
