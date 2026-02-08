import * as jwtDecode from 'jwt-decode';

interface JwtPayload {
  exp: number;
}

export function isTokenExpired(token: string): boolean {
  if (!token) return true;

  try {
    const decoded = (jwtDecode as any)(token) as JwtPayload;
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}
