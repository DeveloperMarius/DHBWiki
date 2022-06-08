from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from time import sleep


def run_selenium():
    print("Konfiguriere Umgebung...")

    print("Starte Chrome mit Selenium...")
    chrome_options = Options()
    chrome_options.add_experimental_option("detach", True)
    chrome_options.add_argument("--start-maximized")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    print("Öffne 'https://dhbwiki.de'...")
    driver.get("https://dhbwiki.de")
    return driver


def stop_selenium(driver):
    print("Stoppe Chrome mit Selenium...")
    driver.close()


def test_register(driver):
    print("Registrieren test wird ausgeführt...")

    header = driver.find_element(By.TAG_NAME, "header")
    buttons = header.find_elements(By.TAG_NAME, "a")
    buttons[1].click()

    register_container = driver.find_element(By.ID, "register")
    register_inputs = register_container.find_elements(By.TAG_NAME, "input")
    register_inputs[0].send_keys("Tester")
    register_inputs[1].send_keys("tester@dhbwiki.de")
    register_inputs[2].send_keys("password")
    register_inputs[3].send_keys("password")
    register_container.find_element(By.TAG_NAME, "button").click()

    print("Test beendet")


def test_login(driver):
    print("Login test wird ausgeführt...")

    header = driver.find_element(By.TAG_NAME, "header")
    buttons = header.find_elements(By.TAG_NAME, "a")
    buttons[0].click()

    register_container = driver.find_element(By.ID, "login")
    register_inputs = register_container.find_elements(By.TAG_NAME, "input")
    register_inputs[0].send_keys("tester@dhbwiki.de")
    register_inputs[1].send_keys("password")
    register_container.find_element(By.TAG_NAME, "button").click()

    print("Test beendet")


def test_feedback(driver):
    print("Feedback test wird ausgeführt...")

    container = driver.find_element(By.ID, "feedback")

    driver.execute_script("arguments[0].scrollIntoView(true);", container)
    sleep(1)

    email_input = container.find_element(By.NAME, "email")
    email_input.send_keys("tester@dhbwiki.de")

    feedback_input = container.find_element(By.NAME, "feedback")
    feedback_input.send_keys("Dies ist ein Test der Feedback-Funktion")

    submit_button = container.find_element(By.TAG_NAME, "a")
    submit_button.click()

    print("Test beendet")


def test_delete_user(driver):
    pass


def test_register_login_delete(driver):
    print("Das Test Szenario wird ausgeführt...")

    test_register(driver)
    driver.get("https://dhbwiki.de")
    test_login(driver)
    driver.get("https://dhbwiki.de")
    test_delete_user(driver)

    print("Test beendet")


if __name__ == '__main__':
    test_type = input("Welcher test soll ausgeführt werden?\n1. Registrieren\n2. Feedback\n3. Registrieren -> Login -> Delete\nAntwort: ")
    if test_type == '1' or test_type == '2':
        driver = run_selenium()
        if test_type == '1':
            test_register(driver)
        elif test_type == '2':
            test_feedback(driver)
        elif test_type == '3':
            test_register_login_delete(driver)
        stop_selenium(driver)
    else:
        print("Test not found")
