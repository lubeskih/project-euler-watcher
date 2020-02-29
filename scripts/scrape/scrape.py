import requests
import json
import time
import datetime

from bs4 import BeautifulSoup

num_of_pages = 14
dump = []

def extract(rows, dump_position):
    for row in rows:
        cells = row.findChildren('td')
        json_object = dict()

        try:
            json_object["id"] = int(cells[0].string)
            json_object["link"] = f"https://projecteuler.net/problem={cells[0].string}"
            json_object["title"] = cells[1].string
            json_object["solves"] = int(cells[2].string)

            if (dump_position == 1):
              dump[3] += 1 # number of records + 1

            dump[dump_position].append(json_object)
        except IndexError as e:
            pass

def main():
    json_object = dict()
    currentDT = datetime.datetime.now()
    dump.append(currentDT.strftime("%a, %b %d, %Y at %I:%M %p"))
    
    dump.append([]) # Archive
    dump.append([]) # Recent

    number_of_records = 0
    dump.append(number_of_records)

    for page in range(1, num_of_pages + 1):
        page_body = requests.get(f"https://projecteuler.net/archives;page={page}")
        soup = BeautifulSoup(page_body.content, 'html.parser')
        tables = soup.findChildren('table')
        rows = tables[0].findChildren(['th', 'tr'])

        extract(rows, 1)
        print(f"Page {page} extracted.")
        time.sleep(2)
    
    # Scrape top 10 recent
    page_body = requests.get("https://projecteuler.net/recent")
    soup = BeautifulSoup(page_body.content, 'html.parser')
    tables = soup.findChildren('table')
    rows = tables[0].findChildren(['th', 'tr'])

    extract(rows, 2)

    with open('archive.json', 'w') as w:
        json.dump(dump, w)

main()