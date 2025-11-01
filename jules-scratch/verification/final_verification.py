from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000")
    page.screenshot(path="jules-scratch/verification/final-light-mode.png")

    # Toggle dark mode
    page.click("button:has(svg.lucide-moon)")
    page.screenshot(path="jules-scratch/verification/final-dark-mode.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
