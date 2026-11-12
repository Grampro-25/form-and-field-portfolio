from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import Request, urlopen

photos = {
    'architecture': 'photo-1600210492486-724fe5c67fb0',
    'landscape': 'photo-1464822759023-fed622ff2c3b',
    'objects': 'photo-1494438639946-1ebd1d20bf85',
    'culture': 'photo-1577083552431-6e5fd01aa342',
}
destination = Path(__file__).resolve().parent.parent / 'public' / 'images'
destination.mkdir(parents=True, exist_ok=True)

def download(item):
    name, photo = item
    url = f'https://images.unsplash.com/{photo}?auto=format&fit=crop&w=1800&q=85'
    request = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(request, timeout=45) as response:
        data = response.read()
    (destination / f'{name}.jpg').write_bytes(data)
    return f'{name}: {len(data)} bytes'

if __name__ == '__main__':
    print('\n'.join(ThreadPoolExecutor().map(download, photos.items())))
