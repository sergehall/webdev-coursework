"""Animate code inside the three screen regions; preserve the rest of the photo."""
from pathlib import Path
import math
import re
import subprocess
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent
FPS, SECONDS = 20, 12
SIZE = (1280, 720)
BASE = Image.open(ROOT / 'web-development-v2.png').convert('RGB').resize(SIZE, Image.Resampling.LANCZOS)
FONT = ImageFont.truetype('/System/Library/Fonts/Menlo.ttc', 14)
BG = (24, 32, 42)
CODE = '''function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="project-card">
      <img src={project.image} alt={project.name} />
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <button onClick={() => setIsOpen(!isOpen)}>
        Explore project
      </button>
      {isOpen && <ProjectDetails project={project} />}
    </article>
  );
}

export default ProjectCard;

'''
CSS = '''.project-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--surface);
  border-radius: 16px;
  transition: transform 200ms;
}

.project-card:hover {
  transform: translateY(-4px);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.site-header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: var(--surface);
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
}

'''
LOGS = [
    '[vite] hot update /src/App.tsx',
    '[vite] hot update /src/styles.css',
    '✓ ProjectCard.tsx compiled in 24ms',
    '✓ GET /projects 200 OK',
    '✓ Build successful · watching files',
    '➜ Local: http://localhost:5173/',
]
TOKENS = re.compile(r'(\"[^\"]*\"|\x27[^\x27]*\x27|\b(?:const|function|return|export|default|import|from)\b|\b\d+(?:\.\d+)?(?:px|ms|rem)?\b|[{}<>();=])')

def code_line(draw, y, text, number=None):
    x = 42
    if number is not None:
        draw.text((8, y), str(number).rjust(3), font=FONT, fill=(105, 118, 130))
    for part in TOKENS.split(text):
        if not part.strip():
            x += draw.textlength(part, font=FONT)
            continue
        color = (193, 213, 231)
        if part.startswith(('"', "'")):
            color = (162, 203, 136)
        elif part in ('const', 'function', 'return', 'export', 'default', 'import', 'from'):
            color = (199, 143, 219)
        elif part and part[0].isdigit():
            color = (234, 177, 119)
        elif part in '{}<>();=':
            color = (111, 186, 227)
        draw.text((x, y), part, font=FONT, fill=color)
        x += draw.textlength(part, font=FONT)
    return x

def laptop(t):
    im = Image.new('RGB', (540, 650), BG)
    draw = ImageDraw.Draw(im)
    offset = len(CODE) * 3 + int(t / SECONDS * len(CODE))
    text = (CODE * 6)[:offset]
    lines = text.split('\n')
    visible = lines[-34:]
    start = max(0, len(lines) - 34)
    for i, line in enumerate(visible):
        y = 10 + i * 18
        if i == len(visible) - 1:
            draw.rectangle((37, y - 1, 539, y + 17), fill=(32, 45, 61))
        x = code_line(draw, y, line, i + 1)
    if int(t * 2) % 2 == 0:
        draw.rectangle((x + 1, y + 2, x + 2, y + 15), fill=(218, 231, 241))
    return im

def monitor(t):
    im = Image.new('RGB', (430, 650), BG)
    draw = ImageDraw.Draw(im)
    lines = CSS.splitlines()
    cycle = len(lines) * 18
    offset = t / SECONDS * cycle
    for i in range(-2, len(lines) + 40):
        y = 10 + i * 18 - offset
        if -18 < y < 650:
            code_line(draw, y, lines[i % len(lines)], i % len(lines) + 1)
    return im

def terminal(t):
    im = Image.new('RGB', (500, 124), (12, 19, 22))
    draw = ImageDraw.Draw(im)
    offset = t / SECONDS * len(LOGS) * 18
    for i in range(-2, 20):
        y = 4 + i * 18 - offset
        if -18 < y < 124:
            draw.text((8, y), LOGS[i % len(LOGS)], font=FONT, fill=(53, 219, 115))
    return im

def solve(a, b):
    rows = [list(row) + [v] for row, v in zip(a, b)]
    for c in range(8):
        pivot = max(range(c, 8), key=lambda r: abs(rows[r][c]))
        rows[c], rows[pivot] = rows[pivot], rows[c]
        d = rows[c][c]
        rows[c] = [v / d for v in rows[c]]
        for r in range(8):
            if r != c:
                d = rows[r][c]
                rows[r] = [v - d * w for v, w in zip(rows[r], rows[c])]
    return [row[-1] for row in rows]

def prepare(source_size, corners):
    pts = [(x * SIZE[0] / 1672, y * SIZE[1] / 941) for x, y in corners]
    left, top = math.floor(min(p[0] for p in pts)), math.floor(min(p[1] for p in pts))
    right, bottom = math.ceil(max(p[0] for p in pts)), math.ceil(max(p[1] for p in pts))
    pts = [(x - left, y - top) for x, y in pts]
    w, h = source_size
    a, b = [], []
    for (x, y), (u, v) in zip(pts, [(0, 0), (w, 0), (w, h), (0, h)]):
        a.extend([[x, y, 1, 0, 0, 0, -u*x, -u*y], [0, 0, 0, x, y, 1, -v*x, -v*y]])
        b.extend([u, v])
    mask = Image.new('L', (right-left, bottom-top))
    ImageDraw.Draw(mask).polygon(pts, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(.65))
    return (left, top), mask, solve(a, b)

LAYERS = [
    (laptop, prepare((540, 650), [(307, 274), (715, 296), (769, 757), (334, 781)])),
    (monitor, prepare((430, 650), [(845, 91), (1174, 112), (1175, 605), (842, 611)])),
    (terminal, prepare((500, 124), [(1195, 543), (1555, 542), (1554, 633), (1194, 632)])),
]

def frame(t):
    result = BASE.copy()
    for render, (position, mask, coefficients) in LAYERS:
        patch = render(t).transform(mask.size, Image.Transform.PERSPECTIVE, coefficients, Image.Resampling.BICUBIC)
        result.paste(patch, position, mask)
    return result

if '--preview' in sys.argv:
    frame(5).save(ROOT / 'web-development-animation-preview.png')
else:
    output = ROOT / 'web-development-animated.mp4'
    command = ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pixel_format', 'rgb24', '-video_size', '1280x720', '-framerate', str(FPS), '-i', '-', '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '19', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(output)]
    with subprocess.Popen(command, stdin=subprocess.PIPE) as encoder:
        for i in range(FPS * SECONDS):
            encoder.stdin.write(frame(i / FPS).tobytes())
        encoder.stdin.close()
        if encoder.wait() != 0:
            raise RuntimeError('Video encoding failed')
    print(output)
