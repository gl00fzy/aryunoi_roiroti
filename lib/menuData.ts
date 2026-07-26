// lib/menuData.ts
// ข้อมูลเมนูร้านอายุน้อยร้อยโรตี — แสดงเฉพาะเมนูหลัก (Base Items) พร้อมรูปภาพคมชัดพรีเมียม

export type Category = "sweet" | "savory" | "drink";

export type ToppingGroup = "dessert" | "fruit" | "cheese-sauce";

export interface Topping {
  id: string;
  name: string;
  price: number;
  group: ToppingGroup;
}

export interface Variant {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  badge?: string;
  toppingIds?: string[];       // IDs ของท็อปปิ้งที่ใช้ได้กับเมนูนี้
  variants?: Variant[];        // ตัวเลือก เช่น ไก่/เนื้อ
  note?: string;               // หมายเหตุ เช่น "ใช้แป้ง 2 แผ่น"
  available: boolean;
}

// ============================================================
// 15 TOPPINGS — แบ่ง 3 กลุ่ม
// ============================================================
export const toppings: Topping[] = [
  // ── ของหวาน (Dessert) ──
  { id: "whipped-cream",    name: "วิปครีม",               price: 15, group: "dessert" },
  { id: "marshmallow",      name: "มาร์ชเมลโลว์",          price: 10, group: "dessert" },
  { id: "cherry-jelly",     name: "เชอร์รี่เจลลี่สีแดง",    price: 5,  group: "dessert" },
  { id: "kitkat",           name: "คิทแคท",                price: 20, group: "dessert" },
  { id: "golden-threads",   name: "ฝอยทอง",                price: 10, group: "dessert" },
  { id: "ovaltine",         name: "โอวัลติน",               price: 10, group: "dessert" },

  // ── ผลไม้/ถั่ว (Fruit/Peanut) ──
  { id: "corn",             name: "ข้าวโพด",               price: 10, group: "fruit" },
  { id: "raisins",          name: "ลูกเกด",                price: 10, group: "fruit" },
  { id: "young-coconut",    name: "มะพร้าวอ่อน",           price: 10, group: "fruit" },

  // ── ชีส/ซอส (Cheese/Sauce) ──
  { id: "mozzarella",       name: "มอสซาเรลล่าชีส",        price: 20, group: "cheese-sauce" },
  { id: "nutella",          name: "นูเทลล่า",              price: 10, group: "cheese-sauce" },
  { id: "peanut-butter",    name: "เนยถั่ว",               price: 10, group: "cheese-sauce" },
  { id: "chocolate-sauce",  name: "ช็อกโกแลต",             price: 5,  group: "cheese-sauce" },
  { id: "caramel-sauce",    name: "คาราเมล",               price: 5,  group: "cheese-sauce" },
  { id: "strawberry-sauce", name: "สตรอว์เบอร์รี่",         price: 5,  group: "cheese-sauce" },
];

const allSweetToppingIds = toppings.map((t) => t.id);

// ============================================================
// BASE MENU ITEMS — รูปภาพอัปเดตใหม่ตรงปกสวยงาม
// ============================================================
export const menuItems: MenuItem[] = [

  // ═════════════════════════════════════════════════════════════
  // โรตีของหวาน (8 เมนูหลัก)
  // ═════════════════════════════════════════════════════════════
  {
    id: "plain-roti",
    name: "โรตีธรรมดา",
    nameEn: "Plain Roti",
    description: "โรตีทอดกรอบสดใหม่ รสชาติดั้งเดิม เสิร์ฟพร้อมน้ำตาลและนมข้นหวาน",
    price: 13,
    image: "/roti-plain.jpg",
    category: "sweet",
    toppingIds: allSweetToppingIds,
    available: true,
  },
  {
    id: "soft-roti",
    name: "โรตีหนานุ่ม",
    nameEn: "Soft Roti",
    description: "โรตีใช้แป้ง 2 ก้อน เนื้อหนานุ่มพิเศษ อร่อยเต็มคำ ทอดสดใหม่ร้อนๆ",
    price: 25,
    image: "/roti-soft.jpg",
    category: "sweet",
    badge: "ใช้แป้ง 2 แผ่น",
    note: "เมนูนี้ใช้แป้ง 2 ก้อนในการทำ เพิ่มความหนานุ่มเป็นพิเศษ",
    toppingIds: allSweetToppingIds,
    available: true,
  },
  {
    id: "egg-roti",
    name: "โรตีใส่ไข่",
    nameEn: "Egg Roti",
    description: "โรตีใส่ไข่ทอดกรอบนอกนุ่มใน เมนูยอดฮิตประจำร้าน",
    price: 29,
    image: "/roti-egg-base.jpg",
    category: "sweet",
    toppingIds: allSweetToppingIds,
    available: true,
  },
  {
    id: "crispy-roti",
    name: "โรตีกรอบ",
    nameEn: "Crispy Roti",
    description: "โรตีทอดกรอบ 1 ชุดมี 2 แผ่น กรอบสัด หอมเนยนม",
    price: 30,
    image: "/roti-crispy.jpg",
    category: "sweet",
    badge: "1 ชุดมี 2 แผ่น",
    note: "1 ชุดเสิร์ฟโรตีกรอบ 2 แผ่น",
    toppingIds: allSweetToppingIds,
    available: true,
  },
  {
    id: "bomb-roti",
    name: "โรตีระเบิด",
    nameEn: "Bomb Roti",
    description: "โรตีทอดพองฟู เนื้อสัมผัสกรอบนอกนุ่มใน แป้งระเบิดเอกลักษณ์เฉพาะตัว",
    price: 30,
    image: "/roti-bomb.jpg",
    category: "sweet",
    toppingIds: allSweetToppingIds,
    available: true,
  },
  {
    id: "banana-roti",
    name: "โรตีกล้วย",
    nameEn: "Banana Roti",
    description: "โรตีสอดไส้กล้วยหอมสด ทอดกรอบ หวานหอมกลมกล่อม",
    price: 40,
    image: "/roti-banana.jpg",
    category: "sweet",
    toppingIds: allSweetToppingIds,
    available: true,
  },
  {
    id: "egg-banana-roti",
    name: "โรตีใส่ไข่+กล้วย",
    nameEn: "Banana & Egg Roti",
    description: "ผสมผสานความอร่อยของไข่ไก่สดและกล้วยหอมเต็มแผ่น อิ่มจุใจ",
    price: 45,
    image: "/roti-egg-banana.jpg",
    category: "sweet",
    toppingIds: allSweetToppingIds,
    available: true,
  },
  {
    id: "cheese-roti",
    name: "โรตีชีส",
    nameEn: "Cheese Roti",
    description: "โรตีสอดไส้ชีสยืดๆ หอมมัน ทอดสดร้อนๆ",
    price: 50,
    image: "/roti-cheese.jpg",
    category: "sweet",
    badge: "ชีสยืด",
    toppingIds: allSweetToppingIds,
    available: true,
  },

  // ═════════════════════════════════════════════════════════════
  // โรตีของคาว (3 เมนูหลัก)
  // ═════════════════════════════════════════════════════════════
  {
    id: "curry-roti",
    name: "โรตีน้ำแกง",
    nameEn: "Curry Roti",
    description: "โรตีกรอบทอดสด เสิร์ฟพร้อมไข่ดาวและน้ำแกงมัสมั่นเข้มข้น หอมเครื่องเทศแท้จากแดนใต้",
    price: 50,
    image: "/roti-namkaeng-new.jpg",
    category: "savory",
    badge: "ซิกเนเจอร์",
    variants: [
      { id: "chicken", name: "ไก่", price: 50 },
      { id: "beef",    name: "เนื้อ", price: 60 },
    ],
    note: "หมายเหตุ: โรตีน้ำแกงทั้งไก่และเนื้อมีขายทุก ๆ สัปดาห์แรกของเดือนครับ",
    available: true,
  },
  {
    id: "mataba-roti",
    name: "โรตีมะตะบะ",
    nameEn: "Mataba Roti",
    description: "โรตีไส้แน่น สูตรต้นตำรับ ผัดผงกะหรี่หอมๆ ทานคู่กับอาจาดรสเด็ดและน้ำจิ้มไก่",
    price: 50,
    image: "/roti-mataba-new.jpg",
    category: "savory",
    badge: "Best Seller",
    variants: [
      { id: "chicken", name: "ไก่", price: 50 },
      { id: "beef",    name: "เนื้อ", price: 60 },
    ],
    note: "หมายเหตุ: มะตะบะทั้งไก่และเนื้อมีขายทุก ๆ สัปดาห์แรกของเดือนครับ",
    available: true,
  },
  {
    id: "pizza-roti",
    name: "โรตีพิซซ่า",
    nameEn: "Pizza Roti",
    description: "โรตีหน้าพิซซ่า แฮมไก่ ไก่ชิ้น ปูอัด พริกหยวก หอมใหญ่ มะเขือเทศ สับปะรด และชีสแน่นๆ",
    price: 89,
    image: "/roti-pizza.jpg",
    category: "savory",
    badge: "เมนูพิเศษ",
    available: true,
  },

  // ═════════════════════════════════════════════════════════════
  // เครื่องดื่ม (1 เมนูหลัก)
  // ═════════════════════════════════════════════════════════════
  {
    id: "cha-chak",
    name: "ชาชัก",
    nameEn: "Cha Chak (Thai Pulled Tea)",
    description: "ชาไทยดั้งเดิม ชงด้วยชาโบราณ ดึงให้เกิดฟองนุ่ม หอมกลิ่นชาปักษ์ใต้แท้",
    price: 35,
    image: "/cha-chak.jpg",
    category: "drink",
    available: true,
  },
];

// ============================================================
// Labels
// ============================================================
export const categoryLabel: Record<Category, string> = {
  sweet:  "โรตีของหวาน",
  savory: "โรตีของคาว",
  drink:  "เครื่องดื่ม",
};

export const toppingGroupLabel: Record<ToppingGroup, string> = {
  dessert:       "ของหวาน / ท็อปปิ้ง",
  fruit:         "ผลไม้ / ถั่ว",
  "cheese-sauce": "ชีส / ซอส",
};
