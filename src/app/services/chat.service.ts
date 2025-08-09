import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http: HttpClient) {}

  send(message: string, history: Array<{ role: string; content: string }> = []): Observable<string> {
    return this.http.post<{ reply: string }>(`/api/chat`, { message, history }).pipe(
      map(res => (res?.reply?.trim() ? res.reply.trim() : 'hi')),
      catchError((_e) => of('hi'))
    );
  }
} 