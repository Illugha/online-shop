from duckduckgo_search import DDGS
import json

queries = [
    "camel cashmere sweater luxury fashion close up detail",
    "olive green pleated wide leg trousers luxury fashion detail",
    "white poplin boyfriend shirt luxury fashion detail",
    "black leather structured tote bag luxury fashion detail"
]

results = {}
with DDGS() as ddgs:
    for q in queries:
        images = []
        for i, res in enumerate(ddgs.images(q)):
            if i >= 3:
                break
            images.append(res['image'])
        results[q] = images

print(json.dumps(results, indent=2))
