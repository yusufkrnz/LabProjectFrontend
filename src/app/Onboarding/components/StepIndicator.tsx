import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, onStepClick }) => {
  const handleStepClick = (index: number) => {
    // Sadece tamamlanmış adımlara veya mevcut adıma tıklanabilir
    if (onStepClick && (index <= currentStep || index === 0)) {
      onStepClick(index);
    }
  };

  return (
    <div className="step-indicator">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = index <= currentStep || index === 0;
        const Icon = step.icon;

        return (
          <div
            key={step.id}
            className={`step-indicator-item ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isClickable ? 'clickable' : ''}`}
            onClick={() => handleStepClick(index)}
            role="button"
            tabIndex={isClickable ? 0 : -1}
            aria-label={`Go to step ${index + 1}: ${step.title}`}
          >
            <div className="step-indicator-line" />
            <div className="step-indicator-circle">
              {isCompleted ? (
                <Check size={16} strokeWidth={3} />
              ) : (
                <Icon size={16} />
              )}
            </div>
            <div className="step-indicator-label">
              <span>{step.title}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;

