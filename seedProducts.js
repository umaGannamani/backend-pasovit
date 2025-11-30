require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');

const products = [
  {
    "name": "Classic Cotton T-Shirt",
    "category": "Men",
    "description": "Soft cotton round-neck t-shirt perfect for everyday wear.",
    "price": 499,
    "sizes": ["S", "M", "L", "XL"],
    "stock": 45,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764474089/mediamodifier-gEupiRvyxh0-unsplash_fhaxqb.jpg"
  },
  {
    "name": "Slim Fit Denim Jeans",
    "category": "Men",
    "description": "Dark blue slim-fit stretchable denim jeans.",
    "price": 1299,
    "sizes": ["30", "32", "34", "36"],
    "stock": 30,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764474460/syed-hussaini-P0bap_GI7Fw-unsplash_cklq0w.jpg"
  },
  {
    "name": "Oversized Hoodie",
    "category": "Unisex",
    "description": "Warm oversized hoodie with kangaroo pocket.",
    "price": 1499,
    "sizes": ["M", "L", "XL"],
    "stock": 20,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764474687/jonathan-delange-pHQk0kFJ7Dg-unsplash_cditb2.jpg"
  },
  {
    "name": "Cotton Casual Shirt",
    "category": "Men",
    "description": "Full-sleeve cotton shirt for casual outings.",
    "price": 899,
    "sizes": ["S", "M", "L", "XL"],
    "stock": 34,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764474834/yi-sk-xs7OP1rruVY-unsplash_mbwtze.jpg"
  },
  {
    "name": "Women’s Floral Kurti",
    "category": "Women",
    "description": "Beautiful floral printed kurti made from rayon fabric.",
    "price": 799,
    "sizes": ["S", "M", "L", "XL"],
    "stock": 40,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764475013/nikhil-uttam-owGZUFZvIDw-unsplash_u6ggtj.jpg"
  },
  {
    "name": "Women’s Palazzo Pants",
    "category": "Women",
    "description": "Comfortable free-flow palazzo pants with elastic waist.",
    "price": 699,
    "sizes": ["M", "L", "XL"],
    "stock": 28,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764475176/nikhil-uttam-pYioB1N6t9o-unsplash_kbpish.jpg"
  },
  {
    "name": "Unisex Track Pants",
    "category": "Unisex",
    "description": "Lightweight track pants ideal for workouts.",
    "price": 599,
    "sizes": ["S", "M", "L", "XL"],
    "stock": 50,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764475282/israel-musa-jG4wLYlQF-g-unsplash_wvdq10.jpg"
  },
  {
    "name": "Kids Printed T-Shirt",
    "category": "Kids",
    "description": "Cute cartoon printed tee made with organic cotton.",
    "price": 349,
    "sizes": ["2-3Y", "3-4Y", "4-5Y"],
    "stock": 25,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764475411/hector-reyes-WNQLkBUV68k-unsplash_rrydrl.jpg"
  },
  {
    "name": "Women’s Denim Jacket",
    "category": "Women",
    "description": "Light-wash denim jacket with button closure.",
    "price": 1599,
    "sizes": ["S", "M", "L"],
    "stock": 18,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764475970/kemal-alkan-_BDBEP0ePQc-unsplash_cytapp.jpg"
  },
  {
    "name": "Men’s Cargo Shorts",
    "category": "Men",
    "description": "Comfortable cargo shorts with multiple pockets.",
    "price": 799,
    "sizes": ["30", "32", "34", "36"],
    "stock": 32,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764476369/nikola-ABHLcp7juXU-unsplash_hm3lt0.jpg"
  },
  {
    "name": "Women’s Cotton Leggings",
    "category": "Women",
    "description": "High-stretch leggings made with premium cotton.",
    "price": 399,
    "sizes": ["S", "M", "L", "XL"],
    "stock": 55,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764476754/victor-volkov-memVwP598cA-unsplash_ljzrls.jpg"
  },
  {
    "name": "Men’s Sports Jersey",
    "category": "Men",
    "description": "Breathable dry-fit sports jersey for athletes.",
    "price": 699,
    "sizes": ["M", "L", "XL"],
    "stock": 29,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764476875/vladislav-igumnov-nU2xyrpa0tg-unsplash_sguk9b.jpg"
  },
  {
    "name": "Women’s Summer Dress",
    "category": "Women",
    "description": "Lightweight sleeveless summer dress with floral print.",
    "price": 1199,
    "sizes": ["S", "M", "L"],
    "stock": 22,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764476974/alex-gagareen-ZQcVyo6fz34-unsplash_wk4l2i.jpg"
  },
  {
    "name": "Kids Cotton Shorts",
    "category": "Kids",
    "description": "Soft cotton shorts with elastic waistband.",
    "price": 299,
    "sizes": ["2-3Y", "3-4Y", "4-5Y"],
    "stock": 33,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764477108/ruslan-mingazhov-MSsS1WPukEw-unsplash_atquts.jpg"
  },
  {
    "name": "Men’s Formal Trousers",
    "category": "Men",
    "description": "Slim-fit wrinkle-free formal trousers.",
    "price": 999,
    "sizes": ["30", "32", "34", "36"],
    "stock": 26,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764477202/rahul-himkar-ysg2mPKECbI-unsplash_zn4yky.jpg"
  },
  {
    "name": "Women’s Woolen Sweater",
    "category": "Women",
    "description": "Soft knitted wool sweater perfect for winters.",
    "price": 1399,
    "sizes": ["S", "M", "L"],
    "stock": 16,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764477280/nataliya-melnychuk-E2o_fY_9KWs-unsplash_mh1amf.jpg"
  },
  {
    "name": "Men’s Kurta Set",
    "category": "Men",
    "description": "Traditional cotton kurta with matching pajama.",
    "price": 1499,
    "sizes": ["M", "L", "XL"],
    "stock": 20,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764477388/royal-photography-S9cIv71NRuE-unsplash_nuwzva.jpg"
  },
  {
    "name": "Kids Hooded Jacket",
    "category": "Kids",
    "description": "Warm hooded jacket with soft inner lining.",
    "price": 799,
    "sizes": ["2-3Y", "3-4Y", "4-5Y"],
    "stock": 19,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764477496/syle-studio-MO7avgJzpYo-unsplash_ogn7ab.jpg"
  },
  {
    "name": "Unisex Raincoat",
    "category": "Unisex",
    "description": "Waterproof raincoat with hood and zip closure.",
    "price": 999,
    "sizes": ["S", "M", "L", "XL"],
    "stock": 38,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764477586/mehran-biabani-bWDT63-XTFA-unsplash_c1xq23.jpg"
  },
  {
    "name": "Women’s Long Skirt",
    "category": "Women",
    "description": "Flowy ankle-length skirt with waistband.",
    "price": 899,
    "sizes": ["S", "M", "L"],
    "stock": 24,
    "image": "https://res.cloudinary.com/dlx9tnj7p/image/upload/v1764477672/giulia-bertelli-qg5CJdIJqfY-unsplash_rnrllr.jpg"
  }
];


const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products seeded');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
