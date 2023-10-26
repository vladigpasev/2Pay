import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

async function accessCodeToAccessToken(accessCode: string) {
  const formData = new FormData();
  formData.append('code', accessCode);
}

const handler = async (req: NextApiRequest) => {
  const accessCode = req.query.code;
  if (typeof accessCode !== 'string') return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);

  // const googleDataReq = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
  // const googleData = await googleDataReq.json();

  // console.log(googleData);
};

export { handler as GET };
