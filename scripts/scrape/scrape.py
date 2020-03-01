import requests
import json
import time
import datetime

from bs4 import BeautifulSoup

num_of_pages = 14 # TODO: This shoud not be hardcoded
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
              dump[0]["records"] += 1 # number of records + 1

            dump[dump_position].append(json_object)
        except IndexError as e:
            pass

def main():
    meta = dict()

    currentDT = datetime.datetime.now()
    meta["stamp"] = currentDT.strftime("%a, %b %d, %Y at %I:%M %p")
    meta["records"] = 0

    print(f"Starting a scrape, date is: {meta['stamp']}")
    
    dump.append(meta) # Metadata
    dump.append([]) # Archive
    dump.append([]) # Recent

    """ 
    [
      {stamp: "Sat, Feb 29, 2020 at 10:45 PM", records: 600 }, # METADATA
      [{ id: 1, title: "example title" }, {...}], # ARCHIVE
      [{ id: 5, title: "another example title" }, {...}] # RECENT PROBLEMS
    ]
    """

    for page in range(1, num_of_pages + 1):
        page_body = requests.get(f"https://projecteuler.net/archives;page={page}")
        soup = BeautifulSoup(page_body.content, 'html.parser')
        tables = soup.findChildren('table')
        rows = tables[0].findChildren(['th', 'tr'])

        extract(rows, 1)
        print(f"Results from page {page} were extracted successfully.")
        time.sleep(2)
    
    print("Done with extracting the archive problems.")
    print("Moving to extracting the most recent problems.")

    # Scrape top 10 recent
    page_body = requests.get("https://projecteuler.net/recent")
    soup = BeautifulSoup(page_body.content, 'html.parser')
    tables = soup.findChildren('table')
    rows = tables[0].findChildren(['th', 'tr'])

    extract(rows, 2)

    print("Most recent problems extracted successfully.")

    with open('archive.json', 'w') as w:
        print("Dumping the data to a file..")
        json.dump(dump, w)
        print("Done.")

main()