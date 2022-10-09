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
  res: NextApiResponse<Data>
) {
  try {
    const response = await fetch(`${process.env.KYRA_BACKEND_URL}/places/categories`);
    const categories = await response.json();
    res.status(200).json(categories);
  } catch (error) {
    res.status(response.status)
  }
}
