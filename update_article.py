import os
import re
import json
path1 = "./article/"
json1 = {}
# for path, _, files in os.walk(path1):
    # for f in files:
for f in reversed(sorted(filter(lambda x: os.path.isfile(os.path.join(path1, x)), os.listdir(path1)))):
    with open(os.path.join(path1, f), "r", encoding="UTF-8") as file:
        content = file.read()
        if re.search(r"<!--.*TITLE:\s.*PREVIEW:\s.*CREATED_ON:\s.*-->", content, flags=re.MULTILINE | re.DOTALL) is not None:
            title = re.sub("TITLE: ", "", re.search(pattern=r"TITLE:.+", string=content).group(0))
            preview = re.sub("PREVIEW: ", "", re.search(pattern=r"PREVIEW:.+", string=content).group(0))[:100]
            createdon = re.sub("CREATED_ON: ", "", re.search(pattern=r"CREATED_ON:.+", string=content).group(0))
            connect_link = re.sub(r"\s", "-", title.lower())
            json1.update(
                {
                    connect_link: {
                        "title": title,
                        "preview_text": preview,
                        "created_on": createdon,
                        "link": os.path.join(path1, f)
                    }
                }
            )
        else:
            print(f"Hello {f}")
            print(f"Error: Invalid or missing metadata in file \"{f}\". Example of a valid metadata:\n<!--\nTITLE: <insert_title>\nPREVIEW: <insert_preview(limit=100)>\nCREATED_ON: <insert_creation_date>\n-->")
with open("./article.json", "w", encoding="UTF-8") as json_data:
    json.dump(json1, json_data, indent=4)