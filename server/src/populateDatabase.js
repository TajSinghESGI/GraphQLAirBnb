const house1 = {
  id: 1,
  name: 'House 1',
  squaremeter: 120,
  price: 400000,
  rooms: 5,
  image_url: 'https://www.travaux.com/images/cms/original/ebcd4d3c-6a00-47d2-8165-6d9e192082af.jpeg',
  is_sold: false,
  balcon: false,
  options: null,
  grenier: true,
};

const house2 = {
  id: 2,
  name: 'House 2',
  squaremeter: 90,
  price: 325000,
  rooms: 12,
  image_url: 'https://www.travaux.com/images/cms/original/ebcd4d3c-6a00-47d2-8165-6d9e192082af.jpeg',
  is_sold: true,
  balcon: true,
  options: null,
  grenier: false,
};

const house3 = {
  id: 3,
  name: 'House 3',
  squaremeter: 140,
  price: 675000,
  rooms: 3,
  image_url: 'https://www.travaux.com/images/cms/original/ebcd4d3c-6a00-47d2-8165-6d9e192082af.jpeg',
  is_sold: false,
  options: ['PISCINE', 'GARAGE'],
  balcon: false,
  grenier: false,
};

export default async (supabase) => {
  const { data, error } = await supabase.from('logements').upsert([house1, house2, house3]);
  console.log(error);
  console.log('Database populated !\n');
};
