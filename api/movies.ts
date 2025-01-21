import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const apiResponse = await fetch("https://www.jsondataai.com/api/guK8Sdo");
  const data = await apiResponse.json();

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET");

  return response.json(data);
}
