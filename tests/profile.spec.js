import {test, expect} from '@playwright/test'

test('TC01_PrfileUpdate', async ({page})=>
{
    test.setTimeout(120000)

    // Navigating naukri.com
    await page.goto('https://www.naukri.com/')

    // Login
    let googleClose = await page.locator('iframe[title="Sign in with Google Dialogue"]').contentFrame().getByRole('button', { name: 'Close' }).click();
    let loginButton1 = await page.locator('#login_Layer').click();
    let username = await page.getByPlaceholder('Enter your active Email ID / Username').fill('himanshud7078@gmail.com');
    let password = await page.getByPlaceholder('Enter your password').fill('HIMANSHUD7078@GMAIL.COM');
    let loginButton2 = await page.locator('//button[@type="submit"]').click();
    console.log('Logged in Successfully..........');

    // Validating login
    let candidateProfile = await page.locator('//div[@class="name-wrapper"]');
    await expect.soft(candidateProfile).toBeVisible();

    // Updating resume headline
    await page.locator('//img[@alt="naukri user profile img"]/parent::div/preceding-sibling::div').click();
    await page.locator("//a[text()='View & Update Profile']").click();
    await page.locator('//div[@class="widgetHead"]/child::span[@class="edit icon"]').click();
    await page.locator('#resumeHeadlineTxt').fill('QA Automation Engineer with 3.5+ years of experience in Playwright, Selenium WebDriver, Java, JavaScript, API Testing, Jenkins, SQL, and Agile Scrum.');
    await page.locator('//div[@class="action s12"]/child::button').click();
    console.log('Updated resume headline........');

    // Validating resume headline updation
    let message = await page.getByText('Profile updated successfully');
    await expect.soft(message).toBeVisible();
    await page.locator('.lightbox.profileEditDrawer.profileUpdatedProLayer > .crossLayer > .icon').click();

    // Uploading resume
    await page.locator('//input[@id="attachCV"]').setInputFiles('testData/QA_Automation_Himanshu_Resume.pdf');
    

    // Validating resume updation
    let resumeMessage = await page.getByText('Resume has been successfully uploaded.');
    await expect.soft(resumeMessage).toBeVisible();

    // Logout
    await page.locator('//img[@alt="naukri user profile img"]').click();
    await page.locator('//div[@class="nI-gNb-list-item"]/child::a[@title="Logout"]').click();
    console.log('Logged out successfully........');

    // Validating logout
    await expect.soft(page.locator('//div[@class="qsb-header-container"]/child::h1')).toBeVisible();

})
