import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-container">
        <div class="header-left">
          <div class="logo">
            <div class="logo-icon">
              <i class="fas fa-shield-check"></i>
            </div>
            <span class="logo-text">ComplianceGuard</span>
            <span class="ai-badge">AI</span>
          </div>
        </div>
        
        <div class="header-center">
          <h1 class="header-title">Enterprise AML Compliance Assistant</h1>
          <p class="header-subtitle">AI-powered anti-money laundering compliance for financial institutions</p>
        </div>
        
        <div class="header-right">
          <button class="help-btn glass" title="Documentation">
            <i class="fas fa-book"></i>
          </button>
          <button class="settings-btn glass" title="Enterprise Settings">
            <i class="fas fa-cog"></i>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      color: var(--text-white);
      padding: 1.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2));
      z-index: -1;
    }
    
    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .header-left {
      flex: 0 0 auto;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .logo-icon {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #22c55e, #10b981);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
      position: relative;
      overflow: hidden;
    }
    
    .logo-icon::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer 3s infinite;
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
      100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
    }
    
    .logo-icon i {
      font-size: 1.5rem;
      color: var(--text-white);
      z-index: 1;
      position: relative;
    }
    
    .logo-text {
      color: var(--text-white);
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .ai-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
      color: var(--text-white);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-lg);
      font-size: 0.75rem;
      font-weight: 700;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }
    
    .header-center {
      flex: 1;
      text-align: center;
      padding: 0 2rem;
    }
    
    .header-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--text-white);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      background: linear-gradient(135deg, #ffffff, #d1fae5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .header-subtitle {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      font-weight: 400;
    }
    
    .header-right {
      flex: 0 0 auto;
      display: flex;
      gap: 1rem;
    }
    
    .help-btn,
    .settings-btn {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    
    .help-btn::before,
    .settings-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }
    
    .help-btn:hover::before,
    .settings-btn:hover::before {
      left: 100%;
    }
    
    .help-btn:hover,
    .settings-btn:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    
    .help-btn i,
    .settings-btn i {
      font-size: 1.25rem;
      color: var(--text-white);
      z-index: 1;
      position: relative;
    }
    
    @media (max-width: 768px) {
      .header-container {
        padding: 0 1rem;
      }
      
      .header-center {
        padding: 0 1rem;
      }
      
      .header-title {
        font-size: 1.5rem;
      }
      
      .header-subtitle {
        font-size: 0.875rem;
      }
      
      .logo-text {
        display: none;
      }
      
      .logo-icon {
        width: 40px;
        height: 40px;
      }
      
      .logo-icon i {
        font-size: 1.25rem;
      }
    }
  `]
})
export class HeaderComponent {} 