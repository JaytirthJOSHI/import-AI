import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quick-actions">
      <h3 class="quick-actions-title">AML Compliance Tools</h3>
      <div class="actions-grid">
        <button 
          *ngFor="let action of actions" 
          class="action-btn glass-card"
          (click)="selectAction(action.message)"
          [title]="action.description">
          <div class="action-icon">
            <i [class]="action.icon"></i>
          </div>
          <div class="action-content">
            <div class="action-label">{{ action.label }}</div>
            <div class="action-description">{{ action.description }}</div>
          </div>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .quick-actions {
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
    }
    
    .quick-actions-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 2rem;
      text-align: center;
      background: linear-gradient(135deg, #22c55e, #10b981);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    
    .action-btn {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding: 1.5rem;
      border-radius: var(--radius-xl);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-align: left;
      position: relative;
      overflow: hidden;
      border: 1px solid var(--border-light);
    }
    
    .action-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(16, 185, 129, 0.05));
      z-index: -1;
    }
    
    .action-btn::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }
    
    .action-btn:hover::after {
      left: 100%;
    }
    
    .action-btn:hover {
      border-color: #22c55e;
      box-shadow: 0 12px 48px rgba(34, 197, 94, 0.2);
      transform: translateY(-4px) scale(1.02);
    }
    
    .action-icon {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #22c55e, #10b981);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
    }
    
    .action-icon::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer 3s infinite;
    }
    
    .action-icon i {
      font-size: 1.5rem;
      color: var(--text-white);
      z-index: 1;
      position: relative;
    }
    
    .action-content {
      flex: 1;
      min-width: 0;
    }
    
    .action-label {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    
    .action-description {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.5;
      font-weight: 500;
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
      100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
    }
    
    @media (max-width: 768px) {
      .actions-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .action-btn {
        padding: 1.25rem;
      }
      
      .action-icon {
        width: 48px;
        height: 48px;
      }
      
      .action-icon i {
        font-size: 1.25rem;
      }
      
      .action-label {
        font-size: 0.875rem;
      }
      
      .action-description {
        font-size: 0.8rem;
      }
    }
  `]
})
export class QuickActionsComponent {
  @Output() actionSelected = new EventEmitter<string>();

  actions = [
    {
      label: 'Risk Assessment',
      description: 'Evaluate customer risk profiles and transaction patterns for AML compliance',
      icon: 'fas fa-chart-line',
      message: 'I need to perform a risk assessment for AML compliance'
    },
    {
      label: 'Transaction Monitoring',
      description: 'Monitor suspicious transactions and generate compliance reports',
      icon: 'fas fa-search-dollar',
      message: 'How do I set up transaction monitoring for AML compliance?'
    },
    {
      label: 'Customer Due Diligence',
      description: 'Conduct enhanced due diligence and KYC verification processes',
      icon: 'fas fa-user-check',
      message: 'What are the requirements for customer due diligence?'
    },
    {
      label: 'Regulatory Reporting',
      description: 'Generate and submit required regulatory reports (SAR, CTR)',
      icon: 'fas fa-file-alt',
      message: 'How do I file suspicious activity reports?'
    },
    {
      label: 'Compliance Training',
      description: 'Access AML training materials and certification programs',
      icon: 'fas fa-graduation-cap',
      message: 'I need AML compliance training resources'
    },
    {
      label: 'Policy Management',
      description: 'Review and update AML policies and procedures',
      icon: 'fas fa-cogs',
      message: 'How do I update our AML compliance policies?'
    }
  ];

  selectAction(message: string): void {
    this.actionSelected.emit(message);
  }
} 