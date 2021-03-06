import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleWithAccessToken } from '../../utils/handler';

const play = async (
  accessToken: string,
  deviceId: string,
  contextUri: string
): Promise<AxiosResponse> => {
  return await axios.put(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    {
      context_uri: contextUri,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { deviceId, contextUri } = req.query;

  await handleWithAccessToken(
    async (accessToken) => {
      const res = await play(
        accessToken,
        deviceId as string,
        contextUri as string
      );
      return res.data;
    },
    req,
    res
  );
};

export default handler;
