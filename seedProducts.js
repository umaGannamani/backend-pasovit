require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');

const products = [
  {
    name: "Classic White Tee",
    description: "Comfortable cotton t-shirt",
    price: 499,
    image: "https://picsum.photos/400?random=1",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 50
  },
  {
    name: "Blue Denim Jacket",
    description: "Stylish denim jacket",
    price: 2499,
    image: "https://picsum.photos/400?random=2",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 20
  },
  {
    name: "Black Hoodie",
    description: "Cozy fleece hoodie",
    price: 1299,
    image: "https://picsum.photos/400?random=3",
    category: "Unisex",
    sizes: ["S", "M", "L", "XL"],
    stock: 60
  },
  {
    name: "Red Summer Dress",
    description: "Flowy A-line dress perfect for summer",
    price: 1899,
    image: "https://picsum.photos/400?random=4",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 30
  },
  {
    name: "Men's Slim Fit Jeans",
    description: "Dark blue denim jeans",
    price: 1599,
    image: "https://picsum.photos/400?random=5",
    category: "Men",
    sizes: ["30", "32", "34", "36"],
    stock: 40
  },
  {
    name: "Women’s Printed Kurti",
    description: "Soft cotton kurti with floral design",
    price: 999,
    image: "https://picsum.photos/400?random=6",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 25
  },
  {
    name: "Unisex Oversized T-Shirt",
    description: "Trendy oversized streetwear tee",
    price: 699,
    image: "https://picsum.photos/400?random=7",
    category: "Unisex",
    sizes: ["M", "L", "XL"],
    stock: 70
  },
  {
    name: "Black Formal Trousers",
    description: "Perfect office wear trousers",
    price: 1499,
    image: "https://picsum.photos/400?random=8",
    category: "Men",
    sizes: ["30", "32", "34"],
    stock: 50
  },
  {
    name: "Women’s Woolen Cardigan",
    description: "Soft wool cardigan for winter",
    price: 1799,
    image: "https://picsum.photos/400?random=9",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 45
  },
  {
    name: "Kids Cotton Shorts",
    description: "Comfortable summer shorts for kids",
    price: 499,
    image: "https://picsum.photos/400?random=10",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 80
  },
  {
    name: "Men's Polo T-Shirt",
    description: "Premium cotton polo t-shirt",
    price: 899,
    image: "https://picsum.photos/400?random=11",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 55
  },
  {
    name: "Women’s High-Waist Jeans",
    description: "Comfort stretch denim",
    price: 1499,
    image: "https://picsum.photos/400?random=12",
    category: "Women",
    sizes: ["26", "28", "30", "32"],
    stock: 35
  },
  {
    name: "Men's Checked Shirt",
    description: "Casual wear cotton shirt",
    price: 999,
    image: "https://picsum.photos/400?random=13",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 65
  },
  {
    name: "Women’s Black Leggings",
    description: "Stretchable cotton leggings",
    price: 599,
    image: "https://picsum.photos/400?random=14",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 70
  },
  {
    name: "Unisex Track Pants",
    description: "Comfortable and breathable",
    price: 799,
    image: "https://picsum.photos/400?random=15",
    category: "Unisex",
    sizes: ["S", "M", "L", "XL"],
    stock: 55
  },
  {
    name: "Women’s Party Dress",
    description: "Elegant and premium quality",
    price: 2599,
    image: "https://picsum.photos/400?random=16",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 25
  },
  {
    name: "Men’s Sports Shoes",
    description: "Running shoes with foam sole",
    price: 1999,
    image: "https://picsum.photos/400?random=17",
    category: "Men",
    sizes: ["7", "8", "9", "10"],
    stock: 40
  },
  {
    name: "Women’s Sneakers",
    description: "Trendy street sneakers",
    price: 1799,
    image: "https://picsum.photos/400?random=18",
    category: "Women",
    sizes: ["5", "6", "7", "8"],
    stock: 38
  },
  {
    name: "Unisex Cap",
    description: "Adjustable cotton cap",
    price: 399,
    image: "https://picsum.photos/400?random=19",
    category: "Unisex",
    sizes: ["Free"],
    stock: 120
  },
  {
    name: "Kids Winter Jacket",
    description: "Warm padded jacket for kids",
    price: 1499,
    image: "https://picsum.photos/400?random=20",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 30
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
