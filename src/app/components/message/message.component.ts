import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../models/message.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="message" [class.user-message]="message.sender === 'user'" [class.assistant-message]="message.sender === 'assistant'">
      <div class="message-avatar" *ngIf="message.sender === 'assistant'">
        <i class="fas fa-globe"></i>
      </div>
      
      <div class="message-content">
        <div class="message-bubble">
          <div class="message-text" [innerHTML]="getRenderedContent(message)"></div>
          <div class="message-timestamp">
            {{ formatTimestamp(message.timestamp) }}
          </div>
        </div>
      </div>
      
      <div class="message-avatar" *ngIf="message.sender === 'user'">
        <i class="fas fa-user"></i>
      </div>
    </div>
  `,
  styles: [`
    .message { display: flex; align-items: flex-end; gap: 1rem; max-width: 100%; animation: slideUp .6s cubic-bezier(.4,0,.2,1); }
    .user-message { flex-direction: row-reverse; }
    .assistant-message { flex-direction: row; }
    .message-avatar { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.25rem; position: relative; overflow: hidden; }
    .user-message .message-avatar { background: linear-gradient(135deg, var(--secondary-blue), var(--accent-blue)); box-shadow: 0 8px 32px rgba(99,102,241,.3); }
    .assistant-message .message-avatar { background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue)); box-shadow: 0 8px 32px rgba(99,102,241,.3); }
    .message-avatar::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(255,255,255,.2), transparent); animation: shimmer 3s infinite; }
    .message-avatar i { color: var(--text-white); z-index: 1; position: relative; }
    .message-content { flex: 1; min-width: 0; }
    .message-bubble { max-width: 70%; word-wrap: break-word; }
    .user-message .message-bubble { margin-left: auto; }
    .assistant-message .message-bubble { margin-right: auto; }
    .message-text { padding: 1.25rem 1.5rem; border-radius: var(--radius-xl); font-size: 1rem; line-height: 1.6; font-weight: 500; position: relative; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
    .message-text :is(p, ul, ol) { margin: 0.5rem 0; }
    .message-text pre { background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 8px; overflow: auto; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 0.875rem; }
    .message-text code { background: rgba(15, 23, 42, 0.08); padding: 0.1rem 0.35rem; border-radius: 4px; font-size: 0.9em; }
    .message-text h1, .message-text h2, .message-text h3 { margin: 0.5rem 0; font-weight: 700; }
    .message-text table { width: 100%; border-collapse: collapse; margin: 0.5rem 0; }
    .message-text th, .message-text td { border: 1px solid var(--border-light); padding: 0.5rem; text-align: left; }
    .user-message .message-text { background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue)); color: var(--text-white); border-bottom-right-radius: var(--radius-sm); box-shadow: 0 8px 32px rgba(99,102,241,.3); }
    .assistant-message .message-text { background: rgba(255,255,255,.95); color: var(--text-primary); border: 1px solid var(--border-light); border-bottom-left-radius: var(--radius-sm); box-shadow: 0 8px 32px rgba(0,0,0,.1); }
    .message-timestamp { font-size: .75rem; color: var(--text-muted); margin-top: .75rem; text-align: center; font-weight: 500; }
    .user-message .message-timestamp { color: rgba(255,255,255,.7); }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes shimmer { 0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); } 100% { transform: translateX(100%) translateY(100%) rotate(45deg); } }
    @media (max-width: 768px) { .message-bubble { max-width: 85%; } .message-text { padding: 1rem 1.25rem; font-size: .875rem; } .message-avatar { width: 40px; height: 40px; font-size: 1rem; } .message { gap: .75rem; } }
  `]
})
export class MessageComponent {
  @Input() message!: Message;

  constructor(private sanitizer: DomSanitizer) {
    marked.setOptions({ headerIds: true, breaks: true });
  }

  getRenderedContent(message: Message): SafeHtml {
    if (message.sender === 'assistant') {
      const html = marked.parse(message.content || '');
      return this.sanitizer.bypassSecurityTrustHtml(html as string);
    }
    // Escape user text and convert newlines to <br/>
    const escaped = (message.content || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>');
    return this.sanitizer.bypassSecurityTrustHtml(escaped);
  }

  formatTimestamp(timestamp: Date): string {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
} 