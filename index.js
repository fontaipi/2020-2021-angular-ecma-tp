import fastify from 'fastify';
import axios from 'axios';

const app = fastify({ logger: true });

async function getCatFacts() {
  try {
    const response = await axios({
      url: 'https://cat-fact.herokuapp.com/facts/random?amount=3',
      method: 'GET',
    });
    return response.data;
  } catch (err) {
    return null;
  }
}

async function getFoxPicture() {
  try {
    const response = await axios({
      url: 'https://randomfox.ca/floof/',
      method: 'GET',
    });
    return response.data.image;
  } catch (err) {
    return null;
  }
}

async function getHolidays(countryCode) {
  try {
    const response = await axios({
      url: `https://date.nager.at/api/v2/PublicHolidays/2021/${countryCode}`,
      method: 'GET',
    });
    return response.data;
  } catch (err) {
    return null;
  }
}

app.post('/', async (req, res) => {
  const countryCode = req.body.countryCode;
  const catsFact = await getCatFacts();
  const foxPicture = await getFoxPicture();
  const holidays = await getHolidays(countryCode);

  return {
    foxPicture: foxPicture,
    catFacts: catsFact.map(cat => cat.text),
    holidays: holidays,

  };
});

// Run the server!
const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
