import { test, expect } from '@playwright/test'

test.describe('KYC Onboarding Flow', () => {
  test('should navigate to customer registration from homepage', async ({ page }) => {
    await page.goto('/')
    
    // Check if homepage loads correctly
    await expect(page).toHaveTitle(//)
    await expect(page.locator('h1')).toContainText('KYC Onboarding Platform')
    
    // Navigate to customer registration
    await page.click('text=Start Onboarding')
    await expect(page).toHaveURL('/customer/register')
    
    // Check if registration form is visible
    await expect(page.locator('h3')).toContainText('Start Your KYC Journey')
    await expect(page.locator('input[placeholder="Enter your email"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Enter your phone number"]')).toBeVisible()
  })

  test('should display SDK demo page correctly', async ({ page }) => {
    await page.goto('/sdk-demo')
    
    // Check if SDK demo page loads
    await expect(page.locator('h1')).toContainText('Developer SDKs')
    
    // Check if all SDK options are available
    await expect(page.locator('button:has-text("React SDK")')).toBeVisible()
    await expect(page.locator('button:has-text("Angular SDK")')).toBeVisible()
    await expect(page.locator('button:has-text("Vanilla JavaScript")')).toBeVisible()
    await expect(page.locator('button:has-text("React Native")')).toBeVisible()
    
    // Test SDK switching
    await page.click('button:has-text("Angular SDK")')
    await expect(page.locator('h2')).toContainText('Angular SDK')
  })

  test('should display admin login page correctly', async ({ page }) => {
    await page.goto('/admin/login')
    
    // Check if admin login page loads
    await expect(page.locator('h2')).toContainText('Bank Admin Portal')
    await expect(page.locator('input[placeholder="Enter your admin email"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Enter your password"]')).toBeVisible()
    
    // Check if demo credentials are shown
    await expect(page.locator('text=Demo Credentials')).toBeVisible()
  })
})