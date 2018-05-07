const fs = require('fs-extra');

const CATEGORIES_AMOUNT = 30;
const DELIVERIES_AMOUNT = 50;

let categoryId = 1;
let productId = 1;

const rnd = (min, max, decimals = 0) => {
  const m = Math.pow(10, decimals);
  const number = Math.random() * (max - min + 1) + min;

  return Math.floor(number * m) / m;
}

const getRandomItems = (arr, percentage = 0.5) => {
  let items = arr.filter(() => Math.random() < percentage);

  if (!items.length) {
    const rndItem = arr[rnd(0, arr.length - 1)];

    items = [rndItem];
  }

  return items;
};

const getRandomWords = (words, n = 1) =>
  Array(n)
    .fill(null)
    .map(() =>
      words[rnd(0, words.length - 1)]
        .replace(/^./, (c) => c.toUpperCase())
    );

const buildDelivery = (allCategories, words) => (v, deliveryIndex) => {
  const categories = getRandomItems(allCategories, 0.1)
    .map(category => ({
      id: category.id,
      products: getRandomItems(category.products)
    }));

  const name = getRandomWords(words, rnd(1, 3)).join(' ');

  return {
    categories,
    id: deliveryIndex + 1,
    name
  };
};

const buildProducts = (words, n) =>
  Array(n)
    .fill(null)
    .map(() => ({
      id: productId++,
      name: getRandomWords(words, rnd(1, 6)).join(' '),
      price: rnd(1, 1000, 2)
    }));

const writeCategoriesMock = async (productsByCategories, words) => {
  const response = {};

  response.results = productsByCategories.map(productsByCategory => {
    const products = productsByCategory.response.results.map(product => product.id);

    return {
      id: productsByCategory.id,
      name: getRandomWords(words, rnd(1, 5)).join(' '),
      products
    }
  });

  await fs.writeJson('./src/mockups/categories.json', response);

  return response.results;
};

const writeAllDeliveriesMock = async (categories, words) => {
  let response = {};

  response.results = Array(DELIVERIES_AMOUNT)
    .fill(null)
    .map(buildDelivery(categories, words));

  await fs.writeJson('./src/mockups/deliveries.json', response);

  return response.results;
};

const writeDeliveriesMock = async (deliveries) => {
  for (const delivery of deliveries) {
    await fs.writeJson(`./src/mockups/deliveries/${delivery.id}.json`, delivery);
  }
};

const writeProductsByCategoriesMock = async (words) => {
  let response = {};

  const productsByCategories = Array(CATEGORIES_AMOUNT)
    .fill(null)
    .map((v, index) => ({
      id: index + 1,
      response: {
        results: buildProducts(words, rnd(1,10))
      }
    }));

  for (const productsByCategory of productsByCategories) {
    await fs.writeJson(
      `./src/mockups/products-by-categories/${productsByCategory.id}.json`,
      productsByCategory.response
    );
  }

  return productsByCategories;
};

const writeMocks = async () => {
  console.log('Removing mockups directory...');
  await fs.remove('./src/mockups');

  console.log('Making mockups directory...');
  await fs.mkdirs('./src/mockups/deliveries');
  await fs.mkdirs('./src/mockups/products-by-categories');

  console.log('Reading mock text file...');
  const file = await fs.readFile('./mock-text.txt', 'utf8');
  const words = file
    .replace(/\n/g, ' ')
    .replace(/(\.|,)/g, '')
    .split(' ')
    .map(word => word.toLowerCase().trim());

  console.log('Writing products by categories mock...');
  const productsByCategories = await writeProductsByCategoriesMock(words);

  console.log('Writing all categories mock...');
  const categories = await writeCategoriesMock(productsByCategories, words);

  console.log('Writing all deliveries mock...');
  const deliveries = await writeAllDeliveriesMock(categories, words);

  console.log('Writing deliveries mock...');
  await writeDeliveriesMock(deliveries);

  console.log('Mockups have been written successfully!');
};

writeMocks();
