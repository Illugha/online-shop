import os
import urllib.request
import time

products = [
    # products
    ("silk-dress", "dress,fashion"),
    ("wool-blazer", "blazer,fashion"),
    ("cashmere-knit", "sweater,fashion"),
    ("wide-trouser", "trousers,fashion"),
    ("poplin-shirt", "shirt,fashion"),
    ("structured-tote", "bag,fashion"),
    ("minimalist-trench", "coat,fashion"),
    # homeProducts
    ("stoneware-vase", "vase,decor"),
    ("oak-candleholder", "candleholder,decor"),
    ("linen-throw", "blanket,decor"),
    ("linen-duvet", "bedding,decor"),
    ("woven-throw", "blanket,decor"),
    ("bath-towel-set", "towel,decor"),
    ("brass-task-lamp", "lamp,lighting"),
    ("opal-table-lamp", "lamp,lighting"),
    ("linen-wall-sconce", "sconce,lighting"),
    ("stoneware-dinner-set", "plate,dining"),
    ("linen-napkin-set", "napkin,dining"),
    ("glassware-set", "glass,dining"),
    # categoryProductAdditions
    ("travertine-bookend", "bookend,decor"),
    ("glass-bud-vase", "vase,decor"),
    ("wool-seat-cushion", "cushion,decor"),
    ("marble-tray", "tray,decor"),
    ("paper-lantern", "lantern,lighting"),
    ("brass-incense-holder", "incense,decor"),
    ("ash-wood-stool", "stool,furniture"),
    ("waffle-blanket", "blanket,textile"),
    ("striped-pillowcase", "pillow,textile"),
    ("cotton-bedspread", "bedspread,textile"),
    ("hemp-curtain", "curtain,textile"),
    ("boucle-pillow", "pillow,textile"),
    ("linen-tablecloth", "tablecloth,textile"),
    ("cotton-robe", "robe,textile"),
    ("ceramic-pendant", "pendant,lighting"),
    ("portable-lamp", "lamp,lighting"),
    ("floor-reading-lamp", "lamp,lighting"),
    ("glass-wall-light", "light,lighting"),
    ("dome-desk-lamp", "lamp,lighting"),
    ("linen-pendant", "pendant,lighting"),
    ("brass-picture-light", "light,lighting"),
    ("linen-runner", "runner,dining"),
    ("oak-serving-board", "board,dining"),
    ("porcelain-bowl-set", "bowl,dining"),
    ("ceramic-pitcher", "pitcher,dining"),
    ("brass-salad-servers", "cutlery,dining"),
    ("woven-placemat-set", "placemat,dining"),
    ("stoneware-mug-set", "mug,dining")
]

os.makedirs('ethereal_commerce/img/products', exist_ok=True)

for product_id, keywords in products:
    for i in range(1, 5):
        filename = f'ethereal_commerce/img/products/{product_id}_{i}.jpg'
        if os.path.exists(filename):
            continue
        
        lock_id = abs(hash(f"{product_id}_{i}")) % 10000 + 1
        url = f'https://loremflickr.com/800/800/{keywords}/all?lock={lock_id}'
        
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req) as response:
                with open(filename, 'wb') as out_file:
                    out_file.write(response.read())
            print(f"Downloaded {filename}")
        except Exception as e:
            print(f"Failed to download {filename}: {e}")
        
        time.sleep(0.1)
