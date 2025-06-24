import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../models/message.interface';
import { MessageComponent } from '../components/message/message.component';
import { QuickActionsComponent } from '../components/quick-actions/quick-actions.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent, QuickActionsComponent],
  template: `
    <div class="chat-container">
      <!-- Chat Messages Area -->
      <div class="chat-messages" #messagesContainer>
        <div class="welcome-section" *ngIf="messages.length === 0">
          <div class="welcome-content glass-card">
            <div class="welcome-icon floating">
              <i class="fas fa-shield-check"></i>
            </div>
            <h2 class="welcome-title">ComplianceGuard AI</h2>
            <p class="welcome-description">
              Your enterprise-grade AML compliance assistant. I help financial institutions 
              detect, prevent, and report money laundering activities while ensuring regulatory compliance.
            </p>
            <div class="compliance-badges">
              <span class="badge">FATF Compliant</span>
              <span class="badge">GDPR Ready</span>
              <span class="badge">SOC 2 Type II</span>
            </div>
            <app-quick-actions (actionSelected)="handleQuickAction($event)"></app-quick-actions>
          </div>
        </div>
        
        <div class="messages-list" *ngIf="messages.length > 0">
          <app-message 
            *ngFor="let message of messages; trackBy: trackByMessage" 
            [message]="message"
            [class.fade-in]="true">
          </app-message>
        </div>
        
        <!-- Typing Indicator -->
        <div class="typing-indicator" *ngIf="isTyping">
          <div class="typing-avatar">
            <i class="fas fa-shield-check"></i>
          </div>
          <div class="typing-bubble glass">
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Input Area -->
      <div class="chat-input-area">
        <div class="input-container glass-card">
          <div class="input-wrapper">
            <textarea
              #messageInput
              [(ngModel)]="currentMessage"
              (keydown.enter)="handleKeyDown($event)"
              placeholder="Ask about AML compliance, risk assessment, or regulatory requirements..."
              class="message-input"
              rows="1"
              [disabled]="isTyping"
            ></textarea>
            <button 
              class="send-button"
              (click)="sendMessage()"
              [disabled]="!currentMessage.trim() || isTyping"
              [class.active]="currentMessage.trim()">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          <div class="input-footer">
            <div class="powered-by">
              <i class="fas fa-shield-check"></i>
              <span>Powered by ComplianceGuard AI • Enterprise-grade AML Compliance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 140px);
      max-width: 900px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 2rem 0;
      scroll-behavior: smooth;
    }
    
    .welcome-section {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
    }
    
    .welcome-content {
      max-width: 600px;
      padding: 3rem 2rem;
      border-radius: var(--radius-2xl);
      position: relative;
      overflow: hidden;
    }
    
    .welcome-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1));
      z-index: -1;
    }
    
    .welcome-icon {
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, #22c55e, #10b981);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 2rem;
      box-shadow: 0 16px 64px rgba(34, 197, 94, 0.3);
      position: relative;
      overflow: hidden;
    }
    
    .welcome-icon::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer 3s infinite;
    }
    
    .welcome-icon i {
      font-size: 2.5rem;
      color: var(--text-white);
      z-index: 1;
      position: relative;
    }
    
    .welcome-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #22c55e, #10b981);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .welcome-description {
      font-size: 1.125rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 2rem;
    }
    
    .compliance-badges {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
    }
    
    .badge {
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1));
      color: #22c55e;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-lg);
      font-size: 0.875rem;
      font-weight: 600;
      border: 1px solid rgba(34, 197, 94, 0.2);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    
    .messages-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .typing-indicator {
      display: flex;
      align-items: flex-end;
      gap: 1rem;
      padding: 1rem 0;
      animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .typing-avatar {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #22c55e, #10b981);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
    }
    
    .typing-avatar i {
      font-size: 1.25rem;
      color: var(--text-white);
    }
    
    .typing-bubble {
      border-radius: var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm);
      padding: 1.25rem 1.75rem;
      min-width: 120px;
    }
    
    .typing-dots {
      display: flex;
      gap: 0.375rem;
    }
    
    .typing-dots span {
      width: 10px;
      height: 10px;
      background: #22c55e;
      border-radius: 50%;
      animation: typing 1.4s infinite;
    }
    
    .typing-dots span:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .typing-dots span:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    .chat-input-area {
      padding: 2rem 0;
    }
    
    .input-container {
      width: 100%;
      border-radius: var(--radius-2xl);
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
    }
    
    .input-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(16, 185, 129, 0.05));
      z-index: -1;
    }
    
    .input-wrapper {
      display: flex;
      align-items: flex-end;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-xl);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .input-wrapper:focus-within {
      border-color: #22c55e;
      box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(34, 197, 94, 0.2);
      transform: translateY(-2px);
    }
    
    .message-input {
      flex: 1;
      border: none;
      outline: none;
      resize: none;
      font-size: 1rem;
      line-height: 1.6;
      color: var(--text-primary);
      background: transparent;
      max-height: 120px;
      min-height: 24px;
      font-family: inherit;
      font-weight: 500;
    }
    
    .message-input::placeholder {
      color: var(--text-muted);
      font-weight: 400;
    }
    
    .message-input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .send-button {
      width: 48px;
      height: 48px;
      border: none;
      border-radius: 50%;
      background: var(--border-light);
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }
    
    .send-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }
    
    .send-button:hover::before {
      left: 100%;
    }
    
    .send-button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    
    .send-button.active {
      background: linear-gradient(135deg, #22c55e, #10b981);
      color: var(--text-white);
      box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
    }
    
    .send-button.active:hover:not(:disabled) {
      background: linear-gradient(135deg, #16a34a, #22c55e);
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 12px 48px rgba(34, 197, 94, 0.4);
    }
    
    .send-button i {
      font-size: 1.125rem;
      z-index: 1;
      position: relative;
    }
    
    .input-footer {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }
    
    .powered-by {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-muted);
      font-weight: 500;
    }
    
    .powered-by i {
      color: #22c55e;
      font-size: 1rem;
    }
    
    @keyframes typing {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.4;
      }
      30% {
        transform: translateY(-10px);
        opacity: 1;
      }
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
      100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
    }
    
    @media (max-width: 768px) {
      .chat-container {
        padding: 0 1rem;
        height: calc(100vh - 120px);
      }
      
      .welcome-title {
        font-size: 2rem;
      }
      
      .welcome-description {
        font-size: 1rem;
      }
      
      .welcome-icon {
        width: 80px;
        height: 80px;
      }
      
      .welcome-icon i {
        font-size: 2rem;
      }
      
      .compliance-badges {
        gap: 0.5rem;
      }
      
      .badge {
        font-size: 0.75rem;
        padding: 0.375rem 0.75rem;
      }
      
      .chat-input-area {
        padding: 1.5rem 0;
      }
      
      .input-container {
        padding: 1rem;
      }
      
      .input-wrapper {
        padding: 0.875rem;
      }
      
      .send-button {
        width: 44px;
        height: 44px;
      }
    }
  `]
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  messages: Message[] = [];
  currentMessage = '';
  isTyping = false;
  private shouldScrollToBottom = false;

  ngOnInit(): void {
    // Initialize chat
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  sendMessage(): void {
    if (!this.currentMessage.trim() || this.isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: this.currentMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    this.messages.push(userMessage);
    this.shouldScrollToBottom = true;
    
    const messageToSend = this.currentMessage.trim();
    this.currentMessage = '';
    this.isTyping = true;

    // Simple response - just reply "hi"
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "hi",
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };

      this.messages.push(aiResponse);
      this.isTyping = false;
      this.shouldScrollToBottom = true;
    }, 1000);
  }

  handleKeyDown(event: any): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  handleQuickAction(action: string): void {
    this.currentMessage = action;
    this.sendMessage();
  }

  trackByMessage(index: number, message: Message): string {
    return message.id;
  }

  private scrollToBottom(): void {
    try {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}