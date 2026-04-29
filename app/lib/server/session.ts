import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose'
import config from '@/app/lib/server/config';
import { SessionPayload } from '@/app/lib/server/definitions'

const encodedKey = new TextEncoder().encode(config.JWT_SECRET);

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
}

export async function setSessionId(id: string) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const token = await encrypt({ id, expiresAt });
    const cookieStore = await cookies();

    cookieStore.set('session', token, {
        httpOnly: true,
        secure: false,
        expires: expiresAt,
        sameSite: "strict",
        path: '/',
    });
}

export async function getSessionId() {
  const session = (await cookies()).get('session')?.value;
  console.log('getJWTToken()');
  console.log(session);
  if (!session) {
    console.log('returning null');
    return null;
  }

  const payload = await decrypt(session);
  if (!payload) {
    return null;
  }

  console.log('getJWTToken');
  console.log(payload);
  return payload.id;
}

export async function deleteSessionId() {
  try {
    (await cookies()).delete('session');
  } catch(error) {
    console.log('Failed to delete JWT-Token');
  }
}