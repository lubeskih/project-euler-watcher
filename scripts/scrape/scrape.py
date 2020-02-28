import requests
import json
import time

from bs4 import BeautifulSoup

num_of_pages = 14

dump = []

def extract(rows):
    for row in rows:
        cells = row.findChildren('td')
        json_object = dict()

        try:
            json_object["id"] = int(cells[0].string)
            json_object["link"] = f"https://projecteuler.net/problem={cells[0].string}"
            json_object["title"] = cells[1].string
            json_object["solves"] = int(cells[2].string)

            dump.append(json_object)
        except IndexError as e:
            pass


def main():
    for page in range(1, num_of_pages + 1):
        page_body = requests.get(f"https://projecteuler.net/archives;page={page}")
        soup = BeautifulSoup(page_body.content, 'html.parser')
        tables = soup.findChildren('table')
        rows = tables[0].findChildren(['th', 'tr'])

        extract(rows)
        print(f"Page {page} extracted.")
        time.sleep(2)
    
    with open('archive2.json', 'w') as w:
        json.dump(dump, w)

main()