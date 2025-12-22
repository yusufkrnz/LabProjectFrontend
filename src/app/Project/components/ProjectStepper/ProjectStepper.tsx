import './ProjectStepper.css';

type ProjectStepperProps = {
    currentStep: number;
    totalSteps: number;
};

export default function ProjectStepper({ currentStep, totalSteps }: ProjectStepperProps) {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
    const isComplete = currentStep === totalSteps;

    return (
        <div className="stepper-container">
            {steps.map((step, index) => (
                <div key={step} className="stepper-item">
                    <div
                        className={`stepper-circle ${isComplete || step < currentStep ? 'completed' :
                                step === currentStep ? 'active' : ''
                            }`}
                    >
                        {step}
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={`stepper-line ${isComplete || step < currentStep ? 'completed' : ''}`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
