// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  places: PlaceType[];
}

type PlaceType = {
  id: string;
  name: string;
  categories: {
    label: string;
    img: string;
  }
  distance: number;
  formatted_address: string;
  photo: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  try {
    const mapParameters = Object.keys(req.query).map((param) => `${param}=${req.query[param]}`);
    const requestUrl = [process.env.KYRA_BACKEND_URL, '/places', '?', mapParameters.join('&')].join('');
    const response = await fetch(requestUrl);
    const places = await response.json();
    res.status(200).json(places);
  } catch (error) {
    res.status(400).send('Could not retrieve places');
  }
}
