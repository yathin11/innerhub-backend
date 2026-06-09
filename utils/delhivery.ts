import axios from "axios";

export const createShipment = async (
  order: any
): Promise<string | null> => {
  try {
    const response = await axios.post(
      "https://track.delhivery.com/api/cmu/create.json",
      {},
      {
        headers: {
          Authorization: `Token ${process.env.DELHIVERY_API_KEY}`,
        },
      }
    );

    return response?.data?.packages?.[0]?.waybill || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};