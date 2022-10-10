import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  categories: CategoryType[];
}

type CategoryType = {
  label: string;
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(`${process.env.KYRA_BACKEND_URL}/places/categories`);
  const categories = await response.json();
  res.status(200).json(categories);
}