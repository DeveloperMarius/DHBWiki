import random

from selenium import webdriver
from selenium.common.exceptions import UnexpectedAlertPresentException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from time import sleep
from datetime import datetime


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


def test_register(driver, email=f"tester-{datetime.timestamp(datetime.now())}@dhbwiki.de"):
    print("Registrieren test wird ausgeführt...")

    header = driver.find_element(By.TAG_NAME, "header")
    buttons = header.find_elements(By.TAG_NAME, "a")
    buttons[2].click()

    register_container = driver.find_element(By.ID, "register")
    register_inputs = register_container.find_elements(By.TAG_NAME, "input")
    register_inputs[0].send_keys("Herr")
    register_inputs[1].send_keys("Tester")
    register_inputs[2].send_keys("Tester")
    register_inputs[3].send_keys(email)
    register_inputs[4].send_keys("password")
    register_inputs[5].send_keys("password")
    register_container.find_element(By.TAG_NAME, "button").click()
    try:
        wait = WebDriverWait(driver, 5)
        wait.until(EC.url_contains("/kurse"))
    except UnexpectedAlertPresentException as e:
        print(e.msg)
    if driver.current_url.endswith("/kurse"):
        print("Test Erfolgreich")
    else:
        print("Test Fehlgeschlagen")

    print("Test beendet")
    if driver.current_url.endswith("/kurse"):
        return email
    else:
        return None


def test_login(driver, email="tester@dhbwiki.de", password="password"):
    print("Login test wird ausgeführt...")

    header = driver.find_element(By.TAG_NAME, "header")
    buttons = header.find_elements(By.TAG_NAME, "a")
    buttons[1].click()

    register_container = driver.find_element(By.ID, "login")
    register_inputs = register_container.find_elements(By.TAG_NAME, "input")
    register_inputs[0].send_keys(email)
    register_inputs[1].send_keys(password)
    register_container.find_element(By.TAG_NAME, "button").click()

    try:
        wait = WebDriverWait(driver, 5)
        wait.until(EC.url_contains("/kurse"))
    except UnexpectedAlertPresentException as e:
        print(e.msg)
    if driver.current_url.endswith("/kurse"):
        print("Test Erfolgreich")
    else:
        print("Test Fehlgeschlagen")

    print("Test beendet")
    return driver.current_url.endswith("/kurse")


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
    print("Logout test wird ausgeführt...")

    header = driver.find_element(By.TAG_NAME, "header")
    buttons = header.find_elements(By.TAG_NAME, "a")
    buttons[2].click()

    settings = driver.find_element(By.ID, "settings")
    buttons = settings.find_elements(By.TAG_NAME, "button")
    buttons[1].click()

    wait = WebDriverWait(driver, 5)
    wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "swal2-confirm")))
    driver.find_element(By.CLASS_NAME, "swal2-confirm").click()

    wait = WebDriverWait(driver, 5)
    wait.until(lambda driver: driver.current_url.endswith('/'))
    if driver.current_url.endswith("/"):
        print("Test Erfolgreich")
    else:
        print("Test Fehlgeschlagen")

    print("Test beendet")


def test_logout_user(driver):
    print("Logout test wird ausgeführt...")

    header = driver.find_element(By.TAG_NAME, "header")
    buttons = header.find_elements(By.TAG_NAME, "a")
    buttons[1].click()

    wait = WebDriverWait(driver, 5)
    wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "swal2-confirm")))
    driver.find_element(By.CLASS_NAME, "swal2-confirm").click()

    wait = WebDriverWait(driver, 5)
    wait.until(lambda driver: driver.current_url.endswith('/'))
    if driver.current_url.endswith("/"):
        print("Test Erfolgreich")
    else:
        print("Test Fehlgeschlagen")

    print("Test beendet")


def test_register_login_delete(driver):
    print("Das Test Szenario wird ausgeführt...")

    email = test_register(driver)
    if email is not None:
        test_logout_user(driver)
        if test_login(driver, email):
            if test_delete_user(driver):
                print("Test Erfolgreich")
            else:
                print("Test Fehlgeschlagen")
        else:
            print("Test Fehlgeschlagen")
    else:
        print("Test Fehlgeschlagen")

    print("Test beendet")


if __name__ == '__main__':
    test_type = input("Welcher test soll ausgeführt werden?\n1. Registrieren\n2. Feedback\n3. Registrieren -> Login -> Delete\nAntwort: ")
    if test_type == '1' or test_type == '2' or test_type == '3':
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
