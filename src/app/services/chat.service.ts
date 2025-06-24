import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '../models/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new Subject<Message[]>();
  private messages: Message[] = [];

  constructor() {}

  getMessages(): Observable<Message[]> {
    return this.messagesSubject.asObservable();
  }

  sendMessage(content: string): Observable<Message> {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    this.messages.push(userMessage);
    this.messagesSubject.next([...this.messages]);

    // Simulate AI response
    return new Observable(observer => {
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: this.generateResponse(content),
          sender: 'assistant',
          timestamp: new Date(),
          type: 'text'
        };

        this.messages.push(aiResponse);
        this.messagesSubject.next([...this.messages]);
        observer.next(aiResponse);
        observer.complete();
      }, 1000 + Math.random() * 2000);
    });
  }

  private generateResponse(userMessage: string): string {
    // Simple response generation for demo
    const responses = [
      "I understand you're asking about banking services. How can I assist you further?",
      "Let me help you with that banking question. Could you provide more details?",
      "That's a great question! I'm here to help with all your SecureBank needs.",
      "I can definitely help you with that. Let me guide you through the process."
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  clearMessages(): void {
    this.messages = [];
    this.messagesSubject.next([]);
  }
} 