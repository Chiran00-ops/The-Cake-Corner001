/* ============================================================
   CAKE CORNER BADULLA — script.js
   Vanilla JS SPA: router, shop, cart, wishlist, WhatsApp checkout
   ============================================================ */
"use strict";

/* ---------------- Shop configuration ----------------
   ▶ OWNER: replace the WhatsApp number below with the real
     business number (country code + number, no "+" or spaces). */
const SHOP = {
  name: "CAKE Corner Badulla",
  owner: "Priyangika Weerasingha",
  whatsapp: "+94701758700",                 // ← configurable business number
  phone: "+94 77 123 4567",
  email: "hello@cakecornerbadulla.lk",
  address: "Badulla, Sri Lanka",
  deliveryFee: 350,
  freeDeliveryOver: 5000,
  facebook: "https://facebook.com/cakecornerbadulla",
  instagram: "https://instagram.com/cakecornerbadulla"
};

/* ---------------- Product catalogue (editable) ---------------- */
const CATEGORIES = ["Birthday Cakes","Wedding Cakes","Anniversary Cakes","Chocolate Cakes","Butter Cakes","Ribbon Cakes","Cupcakes","Custom Designed Cakes","Special Occasion Cakes"];

const PRODUCTS = [
 {id:1, name:"Chocolate Truffle Dream", cat:"Chocolate Cakes", price:2850, img:"images/cake-01.svg", rating:4.9, reviews:132, badge:"best",
  desc:"Rich Belgian chocolate sponge layered with silky dark chocolate ganache and a glossy truffle glaze.",
  long:"Our signature chocolate cake, made with premium Belgian cocoa and layered three times with hand-whipped dark ganache. Finished with a mirror glaze and chocolate curls. A crowd favourite for every celebration.",
  sizes:["1 lb","2 lb","3 lb","5 lb"], flavors:["Dark Chocolate","Milk Chocolate","Chocolate Mint"]},
 {id:2, name:"Vanilla Butter Bliss", cat:"Butter Cakes", price:1950, img:"images/cake-02.svg", rating:4.8, reviews:98, badge:"best",
  desc:"Light, moist golden butter cake with pure vanilla bean frosting — a timeless classic.",
  long:"Baked fresh every morning with pure butter and real vanilla pods. Soft crumb, delicate vanilla aroma, and our signature buttercream. Perfect with a cup of Ceylon tea.",
  sizes:["1 lb","2 lb","3 lb"], flavors:["Classic Vanilla","Vanilla Almond","Vanilla Rose"]},
 {id:3, name:"Red Velvet Romance", cat:"Anniversary Cakes", price:3250, img:"images/cake-03.svg", rating:4.9, reviews:76, badge:"new",
  desc:"Velvety crimson sponge with tangy cream cheese frosting and rose-gold accents.",
  long:"Moist cocoa-kissed red velvet layers paired with lightly tangy cream cheese frosting, decorated with elegant rose-gold touches. The cake of choice for anniversaries and romantic surprises.",
  sizes:["1 lb","2 lb","3 lb"], flavors:["Cream Cheese","White Chocolate Cream"]},
 {id:4, name:"Berry Lavender Cloud", cat:"Special Occasion Cakes", price:3450, img:"images/cake-04.svg", rating:4.7, reviews:54, badge:"new",
  desc:"Fluffy lavender-infused sponge with mixed berry compote and whipped mascarpone.",
  long:"A dreamy combination of delicate lavender sponge, homemade strawberry and blueberry compote, and airy mascarpone cream. Sophisticated, floral, and unforgettable.",
  sizes:["1 lb","2 lb"], flavors:["Mixed Berry","Strawberry","Blueberry"]},
 {id:5, name:"Pandan Ribbon Delight", cat:"Ribbon Cakes", price:2250, img:"images/cake-05.svg", rating:4.8, reviews:143, badge:"best",
  desc:"The Sri Lankan classic — soft pandan and vanilla ribbons in every slice.",
  long:"A beloved island classic: alternating ribbons of fragrant pandan and vanilla sponge, baked to a soft, moist perfection. Nostalgia in every bite.",
  sizes:["1 lb","2 lb","3 lb","5 lb"], flavors:["Pandan Vanilla","Pandan Coconut"]},
 {id:6, name:"Rose Pistachio Elegance", cat:"Wedding Cakes", price:5950, img:"images/cake-06.svg", rating:5.0, reviews:41, badge:"",
  desc:"Delicate rosewater sponge, pistachio praline crunch, and ivory buttercream rosettes.",
  long:"An elegant tiered creation with rosewater-infused sponge, a crunchy pistachio praline layer, and hand-piped ivory rosettes. Designed to be the centrepiece of your special day.",
  sizes:["2 lb","3 lb","5 lb","7 lb"], flavors:["Rose Pistachio","Rose Cardamom"]},
 {id:7, name:"Caramel Crunch Feast", cat:"Birthday Cakes", price:2650, img:"images/cake-07.svg", rating:4.8, reviews:88, badge:"",
  desc:"Butterscotch sponge, salted caramel drip, and a crunchy honeycomb surprise.",
  long:"Golden butterscotch layers smothered in homemade salted caramel, topped with a dramatic caramel drip and crunchy honeycomb pieces. A birthday show-stopper.",
  sizes:["1 lb","2 lb","3 lb"], flavors:["Salted Caramel","Butterscotch","Toffee Nut"]},
 {id:8, name:"Blueberry Velvet Tier", cat:"Wedding Cakes", price:5450, img:"images/cake-08.svg", rating:4.9, reviews:37, badge:"new",
  desc:"Lavender-blue velvet sponge with blueberry coulis and cream cheese clouds.",
  long:"A stunning tiered cake in soft blue velvet, layered with fresh blueberry coulis and light cream cheese frosting. Beautiful pastel tones for weddings and bridal showers.",
  sizes:["2 lb","3 lb","5 lb"], flavors:["Blueberry","Blueberry Lemon"]},
 {id:9, name:"Honey Butter Gold", cat:"Butter Cakes", price:2150, img:"images/cake-09.svg", rating:4.7, reviews:112, badge:"",
  desc:"Golden honey-kissed butter cake with a brown-butter glaze and toasted almonds.",
  long:"Simple perfection: pure butter cake sweetened with wild honey, finished with a warm brown-butter glaze and toasted almond flakes. Best enjoyed fresh with tea.",
  sizes:["1 lb","2 lb","3 lb"], flavors:["Wild Honey","Honey Almond"]},
 {id:10, name:"Ocean Breeze Cream", cat:"Special Occasion Cakes", price:3150, img:"images/cake-10.svg", rating:4.6, reviews:49, badge:"",
  desc:"Sky-blue vanilla sponge with coconut cream and white chocolate waves.",
  long:"A refreshing celebration cake with airy blue-tinted vanilla sponge, fluffy coconut cream, and elegant white chocolate waves. Ideal for baby showers and beach-themed parties.",
  sizes:["1 lb","2 lb","3 lb"], flavors:["Coconut Vanilla","Coconut Lime"]},
 {id:11, name:"Spiced Chai Celebration", cat:"Birthday Cakes", price:2550, img:"images/cake-11.svg", rating:4.8, reviews:67, badge:"new",
  desc:"Warm chai-spiced sponge with cinnamon cream and caramelised nutmeg.",
  long:"Inspired by Sri Lankan spiced tea: cardamom, cinnamon and clove folded into a tender sponge, with cinnamon cream and a caramelised nutmeg finish. Cosy and rich.",
  sizes:["1 lb","2 lb","3 lb"], flavors:["Masala Chai","Cinnamon Spice"]},
 {id:12, name:"Strawberry Fantasy Cupcakes (6)", cat:"Cupcakes", price:1450, img:"images/cake-12.svg", rating:4.9, reviews:154, badge:"best",
  desc:"Six fluffy strawberry cupcakes crowned with swirls of strawberry buttercream.",
  long:"A box of six pillowy strawberry cupcakes, each topped with a generous swirl of real-strawberry buttercream and a sprinkle of freeze-dried berries. Perfect for gifting.",
  sizes:["Box of 6","Box of 12"], flavors:["Strawberry","Strawberry Cream","Strawberry Chocolate"]},
 {id:13, name:"Custom Photo Cake", cat:"Custom Designed Cakes", price:3950, img:"images/cake-01.svg", rating:4.9, reviews:63, badge:"",
  desc:"Your design, your message — fully customised cakes made to order for any theme.",
  long:"Tell us your theme and we will bring it to life: edible photo prints, 3D toppers, themed colours and personalised messages. Order at least 3 days in advance for custom work.",
  sizes:["2 lb","3 lb","5 lb"], flavors:["Chocolate","Vanilla","Butter","Red Velvet"]},
 {id:14, name:"Golden Anniversary Tower", cat:"Anniversary Cakes", price:6950, img:"images/cake-06.svg", rating:5.0, reviews:28, badge:"",
  desc:"A majestic two-tier golden cake with champagne-infused cream and gold leaf.",
  long:"Celebrate decades of love with this two-tier golden masterpiece: champagne-kissed cream, vanilla bean sponge, and hand-applied gold leaf details. Truly grand.",
  sizes:["3 lb","5 lb","7 lb"], flavors:["Champagne Vanilla","Vanilla Almond"]},
 {id:15, name:"Kids' Rainbow Party Cake", cat:"Birthday Cakes", price:2950, img:"images/cake-04.svg", rating:4.8, reviews:91, badge:"best",
  desc:"Five colourful rainbow layers with vanilla buttercream and rainbow sprinkles.",
  long:"Five vibrant rainbow layers that reveal a surprise in every slice, wrapped in sweet vanilla buttercream and showered with rainbow sprinkles. Every child's dream cake.",
  sizes:["1 lb","2 lb","3 lb"], flavors:["Rainbow Vanilla","Funfetti"]},
 {id:16, name:"Ribbon Cake Slices Box", cat:"Ribbon Cakes", price:1250, img:"images/cake-05.svg", rating:4.7, reviews:118, badge:"",
  desc:"Eight generous pandan-vanilla ribbon slices, gift-boxed and ready to share.",
  long:"Our famous ribbon cake cut into eight generous slices and beautifully gift-boxed. The perfect token for visits, office treats, and family gatherings.",
  sizes:["Box of 8"], flavors:["Pandan Vanilla"]}
];

const TESTIMONIALS = [
 {name:"Nadeesha Perera", place:"Badulla", text:"Ordered a birthday cake for my daughter — it looked exactly like the photos and tasted even better. The WhatsApp ordering was so easy!"},
 {name:"Samantha Ekanayake", place:"Bandarawela", text:"Our wedding cake from Cake Corner was the highlight of the reception. Priyangika ma'am understood exactly what we wanted."},
 {name:"Ravindu Fernando", place:"Badulla", text:"The chocolate truffle cake is hands-down the best in Badulla. Delivered on time, fresh and beautifully packed."},
 {name:"Ayesha Rahman", place:"Mahiyanganaya", text:"Customised a cake for my parent's anniversary with a photo print. They were in tears. Thank you Cake Corner!"}
];

/* ---------------- Storage helpers ---------------- */
const store = {
  get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d; }catch(e){ return d; } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};
let cart = store.get("ccb_cart", []);        // [{id,size,flavor,msg,qty}]
let wishlist = store.get("ccb_wishlist", []); // [id]

const $ = s => document.querySelector(s);
const app = $("#app");
const fmt = n => "Rs " + n.toLocaleString("en-LK");
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const product = id => PRODUCTS.find(p => p.id === id);
const cartQty = () => cart.reduce((a,i)=>a+i.qty,0);
const cartSubtotal = () => cart.reduce((a,i)=>a + product(i.id).price * i.qty, 0);

/* ---------------- UI helpers ---------------- */
function toast(msg){
  const t = $("#toast");
  t.innerHTML = "🧁 " + esc(msg);
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(()=>t.classList.remove("show"), 2600);
}
function syncBadges(){
  $("#cartCount").textContent = cartQty();
  $("#wishCount").textContent = wishlist.length;
}
function stars(rating){
  let h = "";
  for(let i=1;i<=5;i++)
    h += `<img src="icons/star.svg" alt="" style="opacity:${i<=Math.round(rating)?1:.25}">`;
  return h;
}
function save(){ store.set("ccb_cart",cart); store.set("ccb_wishlist",wishlist); syncBadges(); }

/* ---------------- Cart operations ---------------- */
function addToCart(id, size, flavor, msg, qty){
  qty = qty || 1;
  const key = i => i.id===id && i.size===size && i.flavor===flavor && i.msg===msg;
  const found = cart.find(key);
  if(found) found.qty += qty; else cart.push({id,size,flavor,msg,qty});
  save();
  toast(`${product(id).name} added to cart`);
}
function removeFromCart(idx){ cart.splice(idx,1); save(); render(); toast("Removed from cart"); }
function setQty(idx, qty){
  if(qty<=0){ removeFromCart(idx); return; }
  cart[idx].qty = qty; save(); render();
}
function toggleWish(id){
  const i = wishlist.indexOf(id);
  if(i>-1){ wishlist.splice(i,1); toast("Removed from wishlist"); }
  else { wishlist.push(id); toast("Saved to wishlist ♥"); }
  save();
  document.querySelectorAll(`[data-wish="${id}"]`).forEach(b=>b.classList.toggle("active", wishlist.includes(id)));
  if(location.hash.startsWith("#wishlist")) render();
}

/* ---------------- Reveal-on-scroll ---------------- */
let observer;
function observeReveals(){
  if(observer) observer.disconnect();
  observer = new IntersectionObserver(es => es.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add("visible"); observer.unobserve(e.target); }
  }), {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* ---------------- Components ---------------- */
function cardHTML(p){
  const inWish = wishlist.includes(p.id);
  return `
  <article class="card reveal">
    <div class="card-img">
      ${p.badge ? `<span class="tag ${p.badge==="new"?"new":""}">${p.badge==="new"?"New Arrival":"Best Seller"}</span>` : ""}
      <button class="wish-btn ${inWish?"active":""}" data-wish="${p.id}" aria-label="Wishlist" onclick="toggleWish(${p.id})">
        <img src="icons/heart.svg" alt=""></button>
      <a href="#product/${p.id}"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy"></a>
    </div>
    <div class="card-body">
      <span class="card-cat">${esc(p.cat)}</span>
      <h3 class="card-title">${esc(p.name)}</h3>
      <p class="card-desc">${esc(p.desc)}</p>
      <div class="card-meta">
        <span class="price">${fmt(p.price)} <small>/ ${p.sizes[0]}</small></span>
        <span class="stars">${stars(p.rating)}</span>
      </div>
      <div class="card-actions">
        <a class="btn btn-outline" href="#product/${p.id}">View Details</a>
        <button class="btn btn-primary" onclick="addToCart(${p.id},'${p.sizes[0]}','${p.flavors[0]}','')">Add to Cart</button>
      </div>
    </div>
  </article>`;
}

/* ---------------- Pages ---------------- */
function homePage(){
  const best = PRODUCTS.filter(p=>p.badge==="best").slice(0,4);
  const fresh = PRODUCTS.filter(p=>p.badge==="new").slice(0,4);
  return `
  <section class="hero">
    <div class="container hero-inner">
      <span class="kicker">Premium Bakery • Badulla, Sri Lanka</span>
      <h1>Every Celebration Deserves a <span>Special Cake!</span></h1>
      <p class="sub">Freshly baked happiness, made with love. Handcrafted cakes for birthdays, weddings and every sweet moment in between.</p>
      <div class="hero-cta">
        <a href="#shop" class="btn btn-primary">Shop Now →</a>
        <a href="#shop" class="btn btn-outline">Explore Our Cakes</a>
      </div>
      <div class="hero-stats">
        <div class="stat"><b>500+</b><span>Happy Customers</span></div>
        <div class="stat"><b>120+</b><span>Cake Designs</span></div>
        <div class="stat"><b>4.9★</b><span>Average Rating</span></div>
        <div class="stat"><b>100%</b><span>Fresh &amp; Homemade</span></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Handpicked For You</span>
        <h2>Best-Selling Cakes</h2>
        <p>Loved by our customers across Badulla — these cakes never stay on the shelf for long.</p>
      </div>
      <div class="grid">${best.map(cardHTML).join("")}</div>
    </div>
  </section>

  <section class="section section-pink">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Just Out Of The Oven</span>
        <h2>New Arrivals</h2>
        <p>Fresh flavours and brand-new creations from our bakery.</p>
      </div>
      <div class="grid">${fresh.map(cardHTML).join("")}</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="promo-grid reveal">
        <div class="promo">
          <img src="images/hero.svg" alt="Celebration cake promotion">
          <div class="promo-content">
            <h3>Custom Cakes, Made Your Way</h3>
            <p>Birthday themes, photo prints, wedding tiers — dream it and we bake it. Order 3 days in advance.</p>
            <a href="#shop?cat=Custom Designed Cakes" class="btn">Design My Cake</a>
          </div>
        </div>
        <div class="promo-stack">
          <div class="promo">
            <img src="images/cake-03.svg" alt="Anniversary offer">
            <div class="promo-content">
              <h3>Anniversary Special</h3>
              <p>Free "Happy Anniversary" topper with every anniversary cake.</p>
              <a href="#shop?cat=Anniversary Cakes" class="btn">Shop Now</a>
            </div>
          </div>
          <div class="promo">
            <img src="images/cake-09.svg" alt="Free delivery promotion">
            <div class="promo-content">
              <h3>Free Delivery In Badulla</h3>
              <p>On all orders over ${fmt(SHOP.freeDeliveryOver)}. Order before 2 PM for same-day.</p>
              <a href="#shop" class="btn">Order Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-pink">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Sweet Words</span>
        <h2>What Our Customers Say</h2>
        <p>Real reviews from cake lovers around Badulla.</p>
      </div>
      <div class="testi-grid">
        ${TESTIMONIALS.map(t=>`
        <div class="testi reveal">
          <div class="stars">${stars(5)}</div>
          <p>${esc(t.text)}</p>
          <div class="testi-author">
            <div class="avatar">${esc(t.name[0])}</div>
            <div><b>${esc(t.name)}</b><span>${esc(t.place)}, Sri Lanka</span></div>
          </div>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container" style="text-align:center">
      <div class="section-head reveal">
        <span class="kicker">Craving Something Sweet?</span>
        <h2>Order Your Cake In Minutes</h2>
        <p>Browse the collection, add to cart, and confirm your order through WhatsApp — it's that simple.</p>
      </div>
      <a href="#shop" class="btn btn-primary reveal" style="padding:15px 40px">Browse All Cakes →</a>
    </div>
  </section>`;
}

let shopState = { q:"", cat:"All", sort:"featured" };
function shopPage(params){
  if(params.get("cat")) shopState.cat = params.get("cat");
  return `
  <div class="container">
    <div class="page-head">
      <span class="kicker" style="color:var(--rose);font-weight:600;letter-spacing:2px;text-transform:uppercase;font-size:.78rem">Our Collection</span>
      <h1>Shop Cakes</h1>
      <p>Freshly baked daily in Badulla — prices in Sri Lankan Rupees.</p>
    </div>
    <div class="toolbar">
      <div class="search-box">
        <img src="icons/search.svg" alt="">
        <input type="text" id="shopSearch" placeholder="Search cakes, flavours…" value="${esc(shopState.q)}">
      </div>
      <div class="select-wrap">
        <select id="shopSort">
          <option value="featured">Sort: Featured</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>
    </div>
    <div class="chips" id="catChips">
      ${["All",...CATEGORIES].map(c=>`<button class="chip ${shopState.cat===c?"active":""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("")}
    </div>
    <div class="result-count" id="resultCount"></div>
    <div class="grid" id="shopGrid" style="padding-bottom:80px"></div>
  </div>`;
}
function bindShop(){
  $("#shopSort").value = shopState.sort;
  const draw = () => {
    let list = PRODUCTS.filter(p =>
      (shopState.cat==="All" || p.cat===shopState.cat) &&
      (p.name+" "+p.cat+" "+p.desc).toLowerCase().includes(shopState.q.toLowerCase()));
    if(shopState.sort==="low") list=[...list].sort((a,b)=>a.price-b.price);
    if(shopState.sort==="high") list=[...list].sort((a,b)=>b.price-a.price);
    if(shopState.sort==="rating") list=[...list].sort((a,b)=>b.rating-a.rating);
    if(shopState.sort==="name") list=[...list].sort((a,b)=>a.name.localeCompare(b.name));
    $("#resultCount").textContent = `${list.length} cake${list.length!==1?"s":""} found`;
    $("#shopGrid").innerHTML = list.length ? list.map(cardHTML).join("") :
      `<div class="empty-state" style="grid-column:1/-1"><div class="big">🍰</div><h3>No cakes found</h3><p>Try a different search or category.</p></div>`;
    observeReveals();
  };
  $("#shopSearch").addEventListener("input", e => { shopState.q = e.target.value; draw(); });
  $("#shopSort").addEventListener("change", e => { shopState.sort = e.target.value; draw(); });
  $("#catChips").addEventListener("click", e => {
    const b = e.target.closest("[data-cat]"); if(!b) return;
    shopState.cat = b.dataset.cat;
    document.querySelectorAll("#catChips .chip").forEach(c=>c.classList.toggle("active", c===b));
    draw();
  });
  draw();
}

function productPage(id){
  const p = product(+id);
  if(!p) return notFoundPage();
  const inWish = wishlist.includes(p.id);
  return `
  <div class="container" style="padding-bottom:80px">
    <p style="padding-top:26px;font-size:.85rem"><a href="#home">Home</a> / <a href="#shop">Shop</a> / ${esc(p.name)}</p>
    <div class="pd-grid" style="margin-top:18px">
      <div class="pd-img"><img src="${p.img}" alt="${esc(p.name)}"></div>
      <div class="pd-info">
        <span class="card-cat">${esc(p.cat)}</span>
        <h1>${esc(p.name)}</h1>
        <div class="pd-rating"><span class="stars">${stars(p.rating)}</span><span>${p.rating} (${p.reviews} reviews)</span></div>
        <p class="pd-desc">${esc(p.long)}</p>
        <div class="pd-price">${fmt(p.price)} <small>/ ${p.sizes[0]} — larger sizes priced accordingly</small></div>

        <div class="opt-group"><label>Select Weight / Size</label>
          <div class="opt-row" id="sizeOpts">${p.sizes.map((s,i)=>`<button class="opt ${i===0?"active":""}" data-v="${esc(s)}">${esc(s)}</button>`).join("")}</div>
        </div>
        <div class="opt-group"><label>Select Flavour</label>
          <div class="opt-row" id="flavorOpts">${p.flavors.map((f,i)=>`<button class="opt ${i===0?"active":""}" data-v="${esc(f)}">${esc(f)}</button>`).join("")}</div>
        </div>
        <div class="opt-group"><label>Message On Cake (optional)</label>
          <input class="pd-input" id="cakeMsg" maxlength="60" placeholder="e.g. Happy Birthday Sithum! 🎂">
        </div>
        <div class="opt-group"><label>Quantity</label>
          <div class="qty">
            <button id="qMinus" aria-label="Decrease">−</button><span id="qVal">1</span><button id="qPlus" aria-label="Increase">+</button>
          </div>
        </div>
        <div class="pd-actions">
          <button class="btn btn-outline" id="pdWish">${inWish?"♥ Saved":"♡ Add to Wishlist"}</button>
          <button class="btn btn-primary" id="pdAdd">Add to Cart</button>
          <button class="btn btn-rose" id="pdBuy">Order Now</button>
        </div>
        <div class="pd-perks">
          <div class="perk"><b>🚚 Delivery</b>Badulla &amp; nearby areas</div>
          <div class="perk"><b>🥚 Fresh</b>Baked to order, never frozen</div>
          <div class="perk"><b>💬 Support</b>WhatsApp ordering &amp; help</div>
        </div>
      </div>
    </div>
  </div>`;
}
function bindProduct(id){
  const p = product(+id); if(!p) return;
  let size = p.sizes[0], flavor = p.flavors[0], qty = 1;
  const pick = (wrapId, cb) => $(wrapId).addEventListener("click", e => {
    const b = e.target.closest(".opt"); if(!b) return;
    $(wrapId).querySelectorAll(".opt").forEach(o=>o.classList.remove("active"));
    b.classList.add("active"); cb(b.dataset.v);
  });
  pick("#sizeOpts", v => size = v);
  pick("#flavorOpts", v => flavor = v);
  $("#qMinus").onclick = () => { qty=Math.max(1,qty-1); $("#qVal").textContent=qty; };
  $("#qPlus").onclick = () => { qty++; $("#qVal").textContent=qty; };
  $("#pdAdd").onclick = () => addToCart(p.id,size,flavor,$("#cakeMsg").value.trim(),qty);
  $("#pdBuy").onclick = () => { addToCart(p.id,size,flavor,$("#cakeMsg").value.trim(),qty); location.hash = "#cart"; };
  $("#pdWish").onclick = () => toggleWish(p.id);
}

function cartPage(){
  if(!cart.length) return `
    <div class="container"><div class="page-head"><h1>Your Cart</h1></div>
    <div class="empty-state"><div class="big">🛒</div><h3>Your cart is empty</h3>
    <p>Looks like you haven't added any cakes yet.</p>
    <a href="#shop" class="btn btn-primary" style="margin-top:20px">Browse Cakes</a></div></div>`;
  const sub = cartSubtotal();
  const deliv = sub >= SHOP.freeDeliveryOver ? 0 : SHOP.deliveryFee;
  return `
  <div class="container">
    <div class="page-head"><h1>Your Cart</h1><p>Review your cakes before checkout.</p></div>
    <div class="cart-layout">
      <div>
        ${cart.map((it,i)=>{ const p=product(it.id); return `
        <div class="cart-item">
          <a href="#product/${p.id}"><img src="${p.img}" alt="${esc(p.name)}"></a>
          <div>
            <h4>${esc(p.name)}</h4>
            <p class="meta">${esc(it.size)} • ${esc(it.flavor)}${it.msg?` • “${esc(it.msg)}”`:""}</p>
            <span class="price">${fmt(p.price)}</span>
          </div>
          <div class="cart-item-right">
            <div class="qty" style="box-shadow:none;border:1.5px solid #f0e2d8">
              <button onclick="setQty(${i},${it.qty-1})">−</button><span>${it.qty}</span><button onclick="setQty(${i},${it.qty+1})">+</button>
            </div>
            <b class="price">${fmt(p.price*it.qty)}</b>
            <button class="remove-btn" onclick="removeFromCart(${i})">✕ Remove</button>
          </div>
        </div>`;}).join("")}
      </div>
      <aside class="summary">
        <h3>Order Summary</h3>
        <div class="sum-row"><span>Subtotal (${cartQty()} items)</span><span>${fmt(sub)}</span></div>
        <div class="sum-row"><span>Delivery (Badulla)</span><span class="${deliv===0?"free-deliv":""}">${deliv===0?"FREE":fmt(deliv)}</span></div>
        <div class="sum-row total"><span>Total</span><span>${fmt(sub+deliv)}</span></div>
        <a href="#checkout" class="btn btn-primary">Proceed to Checkout →</a>
        <a href="#shop" class="btn btn-outline" style="width:100%;justify-content:center;margin-top:10px">Continue Shopping</a>
      </aside>
    </div>
  </div>`;
}

function checkoutPage(){
  if(!cart.length) return `<div class="container"><div class="page-head"><h1>Checkout</h1></div>
    <div class="empty-state"><div class="big">🧾</div><h3>Nothing to checkout</h3><p>Add some cakes to your cart first.</p>
    <a href="#shop" class="btn btn-primary" style="margin-top:20px">Go To Shop</a></div></div>`;
  const sub = cartSubtotal();
  const deliv = sub >= SHOP.freeDeliveryOver ? 0 : SHOP.deliveryFee;
  const today = new Date().toISOString().split("T")[0];
  return `
  <div class="container">
    <div class="page-head"><h1>Checkout</h1><p>Fill in your details — your order will be sent to us on WhatsApp.</p></div>
    <div class="checkout-layout">
      <form class="checkout-form" id="checkoutForm" novalidate>
        <h3>Delivery Details</h3>
        <div class="form-grid">
          <div class="field"><label>Full Name *</label><input class="pd-input" id="f-name" placeholder="e.g. Kasun Silva"><p class="err">Please enter your full name.</p></div>
          <div class="field"><label>Contact Number *</label><input class="pd-input" id="f-phone" placeholder="07X XXX XXXX"><p class="err">Enter a valid Sri Lankan mobile number.</p></div>
          <div class="field full"><label>Email Address *</label><input class="pd-input" id="f-email" type="email" placeholder="you@example.com"><p class="err">Enter a valid email address.</p></div>
          <div class="field full"><label>Delivery Address *</label><input class="pd-input" id="f-address" placeholder="Street, Town, District"><p class="err">Please enter your delivery address.</p></div>
          <div class="field"><label>Required Delivery Date *</label><input class="pd-input" id="f-date" type="date" min="${today}"><p class="err">Please choose a date (today or later).</p></div>
          <div class="field"><label>Required Delivery Time *</label>
            <select class="pd-input" id="f-time">
              <option value="">Select a time…</option>
              <option>Morning (8 AM – 12 PM)</option><option>Afternoon (12 PM – 4 PM)</option>
              <option>Evening (4 PM – 7 PM)</option><option>Night (7 PM – 9 PM)</option>
            </select><p class="err">Please choose a delivery time.</p></div>
          <div class="field full"><label>Special Instructions</label><textarea class="pd-input" id="f-notes" rows="2" placeholder="Allergies, colours, candles, delivery notes…"></textarea></div>
        </div>
        <button type="submit" class="btn btn-rose" style="width:100%;justify-content:center;margin-top:22px;padding:15px">
          <img src="icons/whatsapp.svg" alt=""> Confirm Order via WhatsApp
        </button>
        <p style="text-align:center;font-size:.78rem;color:#9b7f73;margin-top:10px">You'll be redirected to WhatsApp to send your order to ${esc(SHOP.name)}.</p>
      </form>
      <aside class="summary">
        <h3>Order Summary</h3>
        ${cart.map(it=>{const p=product(it.id);return `<div class="order-item"><span>${esc(p.name)}<br><small>${esc(it.size)} • ${esc(it.flavor)} × ${it.qty}</small></span><span>${fmt(p.price*it.qty)}</span></div>`;}).join("")}
        <div class="sum-row"><span>Subtotal</span><span>${fmt(sub)}</span></div>
        <div class="sum-row"><span>Delivery</span><span class="${deliv===0?"free-deliv":""}">${deliv===0?"FREE":fmt(deliv)}</span></div>
        <div class="sum-row total"><span>Total</span><span>${fmt(sub+deliv)}</span></div>
        <div class="note">💵 Payment: Cash on delivery or bank transfer. Delivery within Badulla town ${fmt(SHOP.deliveryFee)}, FREE over ${fmt(SHOP.freeDeliveryOver)}.</div>
      </aside>
    </div>
  </div>`;
}
function bindCheckout(){
  const form = $("#checkoutForm"); if(!form) return;
  const V = {
    name: v => v.trim().length >= 3,
    phone: v => /^(?:\+94|0)?7\d{8}$/.test(v.replace(/[\s-]/g,"")),
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    address: v => v.trim().length >= 5,
    date: v => v && v >= new Date().toISOString().split("T")[0],
    time: v => v !== ""
  };
  form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = true;
    ["name","phone","email","address","date","time"].forEach(k => {
      const input = $("#f-"+k), field = input.closest(".field");
      const valid = V[k](input.value);
      field.classList.toggle("invalid", !valid);
      if(!valid) ok = false;
    });
    if(!ok){ toast("Please fix the highlighted fields"); return; }

    const d = k => $("#f-"+k).value;
    const sub = cartSubtotal();
    const deliv = sub >= SHOP.freeDeliveryOver ? 0 : SHOP.deliveryFee;
    const orderId = "CCB-" + Date.now().toString().slice(-6);

    const lines = [
      `🧁 *NEW ORDER — ${SHOP.name}*`,
      `🧾 Order ID: ${orderId}`, "",
      `👤 *Customer Details*`,
      `Name: ${d("name")}`,
      `Phone: ${d("phone")}`,
      `Email: ${d("email")}`,
      `Address: ${d("address")}`,
      `Delivery: ${d("date")} — ${d("time")}`, "",
      `🎂 *Order Items*`
    ];
    cart.forEach(it => {
      const p = product(it.id);
      lines.push(`• ${p.name} (${it.size}, ${it.flavor}) × ${it.qty} — ${fmt(p.price*it.qty)}`);
      if(it.msg) lines.push(`  ✍️ Message: "${it.msg}"`);
    });
    lines.push("", `Subtotal: ${fmt(sub)}`,
      `Delivery: ${deliv===0 ? "FREE" : fmt(deliv)}`,
      `💰 *Total: ${fmt(sub+deliv)}*`);
    if(d("notes")) lines.push("", `📝 Instructions: ${d("notes")}`);
    lines.push("", "— sent from the Cake Corner Badulla website");

    window.open(`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");

    const ov = $("#modalOverlay");
    ov.innerHTML = `
      <div class="modal">
        <div class="check">✓</div>
        <h3>Order Confirmed!</h3>
        <p>Thank you, ${esc(d("name").split(" ")[0])}! Your order <b>${orderId}</b> has been prepared. We've opened WhatsApp — just press <b>Send</b> to deliver it to us and we'll confirm your baking time.</p>
        <button class="btn btn-primary" id="modalClose">Continue Shopping</button>
        <a class="btn btn-outline" href="#shop" id="modalShop" style="text-decoration:none">Back to Shop</a>
      </div>`;
    ov.classList.add("show");
    const close = () => { ov.classList.remove("show"); cart = []; save(); location.hash = "#home"; };
    $("#modalClose").onclick = close;
    $("#modalShop").onclick = close;
    ov.onclick = e => { if(e.target === ov) close(); };
  });
}

function aboutPage(){
  return `
  <div class="container" style="padding-bottom:80px">
    <div class="page-head">
      <span class="kicker" style="color:var(--rose);font-weight:600;letter-spacing:2px;text-transform:uppercase;font-size:.78rem">Our Story</span>
      <h1>About Us</h1>
    </div>
    <div class="about-grid">
      <div class="about-img reveal"><img src="images/about.svg" alt="Cake Corner Badulla celebration cake"></div>
      <div class="about-text reveal">
        <h2>Baked With Love, In The Heart Of Badulla</h2>
        <p>At Cake Corner Badulla, we believe every special moment deserves something sweet. We create delicious, freshly prepared cakes with love, creativity, and attention to detail. From birthdays to weddings and every celebration in between, we make your moments unforgettable.</p>
        <p>Every cake is baked to order using quality ingredients — real butter, pure vanilla, premium chocolate and fresh local produce. No frozen cakes, no shortcuts. Just honest, beautiful baking.</p>
        <div class="owner-card">
          <div class="avatar">P</div>
          <div><b>Priyangika Weerasingha</b><span>Founder &amp; Head Baker, Cake Corner Badulla</span></div>
        </div>
        <div class="values">
          <div class="value"><b>🌿 Fresh</b><span>Baked to order, never frozen</span></div>
          <div class="value"><b>🎨 Creative</b><span>Custom designs for any theme</span></div>
          <div class="value"><b>💛 Caring</b><span>Treated like family, every order</span></div>
        </div>
      </div>
    </div>
  </div>`;
}

function contactPage(){
  return `
  <div class="container">
    <div class="page-head"><h1>Contact Us</h1><p>We'd love to hear from you — questions, custom orders or bulk bookings.</p></div>
    <div class="contact-grid">
      <div class="contact-card reveal">
        <h3 style="margin-bottom:14px">Get In Touch</h3>
        <div class="contact-line"><img src="icons/pin.svg" alt=""><div><b>Visit Us</b><span>${esc(SHOP.address)}</span></div></div>
        <div class="contact-line"><img src="icons/phone.svg" alt=""><div><b>Call Us</b><span>${esc(SHOP.phone)}</span></div></div>
        <div class="contact-line"><img src="icons/mail.svg" alt=""><div><b>Email</b><span>${esc(SHOP.email)}</span></div></div>
        <div class="contact-line"><img src="icons/whatsapp.svg" alt=""><div><b>WhatsApp</b><span>Fastest way to order!</span></div></div>
        <a class="btn btn-rose" style="width:100%;justify-content:center;margin-top:18px" href="https://wa.me/${SHOP.whatsapp}" target="_blank" rel="noopener">
          <img src="icons/whatsapp.svg" alt=""> Chat on WhatsApp</a>
        <div class="map-wrap">
          <iframe title="Cake Corner Badulla location map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Badulla%2C%20Sri%20Lanka&output=embed"></iframe>
        </div>
      </div>
      <div class="contact-card reveal">
        <h3 style="margin-bottom:20px">Send A Message</h3>
        <form id="contactForm" class="form-grid" novalidate>
          <div class="field"><label>Your Name *</label><input class="pd-input" id="c-name" placeholder="Your name"><p class="err">Please enter your name.</p></div>
          <div class="field"><label>Phone / Email *</label><input class="pd-input" id="c-contact" placeholder="How can we reach you?"><p class="err">Please enter a phone number or email.</p></div>
          <div class="field full"><label>Message *</label><textarea class="pd-input" id="c-msg" rows="5" placeholder="Tell us about your order or question…"></textarea><p class="err">Please write a message.</p></div>
          <div class="full"><button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">Send Message →</button></div>
        </form>
      </div>
    </div>
  </div>`;
}
function bindContact(){
  const f = $("#contactForm"); if(!f) return;
  f.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#c-name"), cont = $("#c-contact"), msg = $("#c-msg");
    let ok = true;
    [[name, v=>v.trim().length>=2],[cont, v=>v.trim().length>=5],[msg, v=>v.trim().length>=5]]
      .forEach(([el, test]) => { const good = test(el.value); el.closest(".field").classList.toggle("invalid", !good); if(!good) ok=false; });
    if(!ok) return;
    const text = encodeURIComponent(`Hello ${SHOP.name}!\n\n👤 ${name.value}\n📞 ${cont.value}\n\n${msg.value}`);
    window.open(`https://wa.me/${SHOP.whatsapp}?text=${text}`, "_blank");
    toast("Opening WhatsApp to send your message…");
    f.reset();
  });
}

function wishlistPage(){
  const list = wishlist.map(product).filter(Boolean);
  if(!list.length) return `<div class="container"><div class="page-head"><h1>Your Wishlist</h1></div>
    <div class="empty-state"><div class="big">💗</div><h3>No saved cakes yet</h3><p>Tap the heart on any cake to save it here.</p>
    <a href="#shop" class="btn btn-primary" style="margin-top:20px">Find a Favourite</a></div></div>`;
  return `<div class="container">
    <div class="page-head"><h1>Your Wishlist</h1><p>${list.length} saved cake${list.length!==1?"s":""} — tap the heart again to remove.</p></div>
    <div class="grid" style="padding-bottom:80px">${list.map(cardHTML).join("")}</div>
  </div>`;
}

function notFoundPage(){
  return `<div class="container"><div class="page-head"><h1>Page Not Found</h1></div>
    <div class="empty-state"><div class="big">🍰</div><h3>Oops — this page crumbled</h3>
    <a href="#home" class="btn btn-primary" style="margin-top:20px">Back Home</a></div></div>`;
}

/* ---------------- Router ---------------- */
function render(){
  const loader = $("#loader");
  loader.classList.remove("hidden");
  const raw = location.hash.slice(1) || "home";
  const [pathPart, queryPart] = raw.split("?");
  const params = new URLSearchParams(queryPart || "");
  const [page, arg] = pathPart.split("/");

  document.querySelectorAll(".nav-links a").forEach(a =>
    a.classList.toggle("active", a.dataset.nav === page || (page==="" && a.dataset.nav==="home")));

  setTimeout(() => {
    let html;
    switch(page){
      case "": case "home": html = homePage(); break;
      case "shop": html = shopPage(params); break;
      case "product": html = productPage(arg); break;
      case "cart": html = cartPage(); break;
      case "checkout": html = checkoutPage(); break;
      case "about": html = aboutPage(); break;
      case "contact": html = contactPage(); break;
      case "wishlist": html = wishlistPage(); break;
      default: html = notFoundPage();
    }
    app.innerHTML = html;
    window.scrollTo({top:0});
    if(page==="shop") bindShop();
    if(page==="product") bindProduct(arg);
    if(page==="checkout") bindCheckout();
    if(page==="contact") bindContact();
    observeReveals();
    loader.classList.add("hidden");
    document.title = ({
      home:"CAKE CORNER BADULLA | Freshly Baked Cakes in Badulla, Sri Lanka",
      shop:"Shop Cakes | CAKE CORNER BADULLA",
      cart:"Your Cart | CAKE CORNER BADULLA",
      checkout:"Checkout | CAKE CORNER BADULLA",
      about:"About Us | CAKE CORNER BADULLA",
      contact:"Contact Us | CAKE CORNER BADULLA",
      wishlist:"Wishlist | CAKE CORNER BADULLA"
    })[page] || "CAKE CORNER BADULLA";
  }, 350);
}

/* ---------------- Global bindings ---------------- */
window.addEventListener("hashchange", render);

document.addEventListener("DOMContentLoaded", () => {
  // Configurable shop details injected into static chrome
  $("#footPhone").textContent = SHOP.phone;
  $("#footEmail").textContent = SHOP.email;
  $("#fbLink").href = SHOP.facebook;
  $("#igLink").href = SHOP.instagram;
  $("#waLink").href = `https://wa.me/${SHOP.whatsapp}`;
  document.querySelector(".btn-nav").href = `https://wa.me/${SHOP.whatsapp}`;
  $("#year").textContent = new Date().getFullYear();

  // Mobile navigation
  const ham = $("#hamburger"), nav = $("#navLinks");
  ham.addEventListener("click", () => {
    ham.classList.toggle("open"); nav.classList.toggle("open");
  });
  nav.addEventListener("click", e => {
    if(e.target.tagName === "A"){ ham.classList.remove("open"); nav.classList.remove("open"); }
  });

  syncBadges();
  render();

  // Intro loader
  setTimeout(() => $("#loader").classList.add("hidden"), 900);
});
