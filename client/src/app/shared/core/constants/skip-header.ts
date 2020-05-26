import { HttpHeaders } from '@angular/common/http';

export const SKIP_TOKEN_INTERCEPTOR = 'X-Skip-Interceptor';
export const SKIP_TOKEN_INTERCEPTOR_HEADER = new HttpHeaders({'X-Skip-Interceptor': ''});
