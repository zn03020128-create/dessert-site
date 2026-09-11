const desserts = [
  {
    id: 'strawberry-mille-crepe',
    title: '草莓香草千層',
    category: '蛋糕',
    tags: ['季節限定', '奶油', '草莓'],
    summary: '薄透餅皮堆疊香草鮮奶油，以新鮮草莓收尾，口感輕盈又帶有細緻層次。',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
    content: {
      text: '以低甜度香草鮮奶油搭配柔軟餅皮，讓草莓的酸香成為主角。適合春季甜點企劃、咖啡館菜單展示或烘焙作品集。',
      video: '',
      html: '<div style="padding:20px;border-radius:16px;background:#fff5f3"><strong>HTML 作品示例：</strong><p style="margin-bottom:0">可在此嵌入互動式食譜、動畫、甜點切面圖或其他前端作品。</p></div>',
      slides: ''
    }
  },
  {
    id: 'lemon-tart',
    title: '焦糖檸檬塔',
    category: '塔派',
    tags: ['酸甜', '焦糖', '法式'],
    summary: '酥脆塔殼填入明亮檸檬餡，再用薄脆焦糖片增加香氣與口感對比。',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=1200&q=80',
    content: {
      text: '檸檬餡保留鮮明酸度，搭配奶油塔殼與焦糖香，形成乾淨俐落的風味結構。',
      video: '',
      html: '',
      slides: ''
    }
  },
  {
    id: 'matcha-parfait',
    title: '宇治抹茶聖代',
    category: '冰品',
    tags: ['抹茶', '紅豆', '夏日'],
    summary: '濃厚抹茶冰淇淋、白玉、紅豆與酥脆穀物交錯，帶來多層次的日式甜味。',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80',
    content: {
      text: '以抹茶的微苦平衡紅豆甜味，白玉提供Q彈口感，適合做成夏季主題作品。',
      video: '',
      html: '',
      slides: ''
    }
  }
];

const grid = document.querySelector('#dessert-grid');
const modal = document.querySelector('#detail-modal');
const modalContent = document.querySelector('#modal-content');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

document.querySelector('#year').textContent = new Date().getFullYear();

function renderCards() {
  grid.innerHTML = desserts.map(item => `
    <article class="dessert-card">
      <div class="card-visual">
        ${item.image
          ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
          : `<div class="card-placeholder">${item.title.slice(0, 1)}</div>`}
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="tag">${item.category}</span>
          ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <button class="card-link" data-open-dessert="${item.id}">查看完整內容 →</button>
      </div>
    </article>
  `).join('');
}

function renderDetail(item) {
  const blocks = [];

  if (item.content.text) {
    blocks.push(`<section class="modal-content-block"><h3>文字介紹</h3><p>${item.content.text}</p></section>`);
  }

  if (item.image) {
    blocks.push(`<section class="modal-content-block"><h3>圖片</h3><img src="${item.image}" alt="${item.title}" style="border-radius:16px"></section>`);
  }

  blocks.push(`
    <section class="modal-content-block">
      <h3>影片</h3>
      ${item.content.video
        ? `<video controls src="${item.content.video}"></video>`
        : `<div class="embed-placeholder">尚未加入影片。可將影片網址或本機影片路徑填入 <code>content.video</code>。</div>`}
    </section>
  `);

  blocks.push(`
    <section class="modal-content-block">
      <h3>HTML 作品</h3>
      ${item.content.html
        ? item.content.html
        : `<div class="embed-placeholder">尚未加入 HTML 作品。可直接放入 HTML 字串，或改用 iframe 嵌入獨立作品頁。</div>`}
    </section>
  `);

  blocks.push(`
    <section class="modal-content-block">
      <h3>簡報</h3>
      ${item.content.slides
        ? `<iframe src="${item.content.slides}" title="${item.title} 簡報" height="480" allowfullscreen></iframe>`
        : `<div class="embed-placeholder">尚未加入簡報。可填入 Google Slides、Canva 或其他可嵌入的簡報網址。</div>`}
    </section>
  `);

  modalContent.innerHTML = `
    <p class="eyebrow">${item.category.toUpperCase()}</p>
    <h2 id="modal-title">${item.title}</h2>
    <p>${item.summary}</p>
    ${blocks.join('')}
  `;
}

function openModal(id) {
  const item = desserts.find(d => d.id === id);
  if (!item) return;
  renderDetail(item);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('click', event => {
  const openButton = event.target.closest('[data-open-dessert]');
  const closeTarget = event.target.closest('[data-close-modal]');
  if (openButton) openModal(openButton.dataset.openDessert);
  if (closeTarget) closeModal();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.addEventListener('click', event => {
  if (event.target.matches('a')) {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

renderCards();
