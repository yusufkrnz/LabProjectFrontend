import { DollarSign, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { FinanceTab, WorkInProgressItem, PaymentHistoryItem } from '../../ManageFinance';
import './ManageFinanceContent.css';

type ManageFinanceContentProps = {
    activeTab: FinanceTab;
    workInProgressItems: WorkInProgressItem[];
    paymentHistory: PaymentHistoryItem[];
    isLoading: boolean;
};

export default function ManageFinanceContent({
    activeTab,
    workInProgressItems,
    paymentHistory,
    isLoading,
}: ManageFinanceContentProps) {

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
            case 'paid':
                return 'status-success';
            case 'in-progress':
            case 'active':
                return 'status-active';
            case 'pending':
            case 'pending-payment':
            case 'review':
                return 'status-pending';
            case 'failed':
                return 'status-failed';
            default:
                return '';
        }
    };

    const calculateProgress = (earned: number, total: number) => {
        return Math.round((earned / total) * 100);
    };

    if (isLoading) {
        return (
            <div className="finance-content">
                <div className="loading-state">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="finance-content">
            {/* Header */}
            <div className="content-header">
                <h1>{activeTab === 'in-progress' ? 'In Progress' : 'Payments'}</h1>
                <p className="content-subtitle">
                    {activeTab === 'in-progress'
                        ? 'Track your ongoing projects and milestones'
                        : 'View all your payment transactions'
                    }
                </p>
            </div>

            {/* In Progress View */}
            {activeTab === 'in-progress' && (
                <div className="wip-list">
                    {workInProgressItems.length === 0 ? (
                        <div className="empty-state">
                            <h3>No active projects</h3>
                            <p>You don't have any work in progress at the moment.</p>
                        </div>
                    ) : (
                        workInProgressItems.map((item) => (
                            <div key={item.id} className="wip-card">
                                {/* Card Header */}
                                <div className="wip-header">
                                    <div className="wip-info">
                                        <img src={item.clientAvatar} alt={item.clientName} className="client-avatar" />
                                        <div>
                                            <h3 className="wip-title">{item.projectTitle}</h3>
                                            <span className="client-name">{item.clientName}</span>
                                        </div>
                                    </div>
                                    <span className={`status-badge ${getStatusColor(item.status)}`}>
                                        {item.status === 'active' && 'Active'}
                                        {item.status === 'review' && 'In Review'}
                                        {item.status === 'pending-payment' && 'Pending Payment'}
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="progress-section">
                                    <div className="progress-header">
                                        <span className="earned-label">
                                            <DollarSign size={14} />
                                            Earned: {formatCurrency(item.earnedAmount)}
                                        </span>
                                        <span className="total-label">
                                            of {formatCurrency(item.totalBudget)}
                                        </span>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${calculateProgress(item.earnedAmount, item.totalBudget)}%` }}
                                        />
                                    </div>
                                    <span className="progress-percent">
                                        {calculateProgress(item.earnedAmount, item.totalBudget)}% completed
                                    </span>
                                </div>

                                {/* Dates */}
                                <div className="wip-dates">
                                    <span className="date-item">
                                        <Calendar size={14} />
                                        Started: {formatDate(item.startDate)}
                                    </span>
                                    <span className="date-item">
                                        <Clock size={14} />
                                        Deadline: {formatDate(item.deadline)}
                                    </span>
                                </div>

                                {/* Milestones */}
                                <div className="milestones-section">
                                    <h4 className="milestones-title">Milestones</h4>
                                    <div className="milestones-list">
                                        {item.milestones.map((milestone) => (
                                            <div key={milestone.id} className="milestone-item">
                                                <div className="milestone-info">
                                                    {milestone.status === 'paid' && <CheckCircle size={14} className="icon-success" />}
                                                    {milestone.status === 'completed' && <CheckCircle size={14} className="icon-success" />}
                                                    {milestone.status === 'in-progress' && <Clock size={14} className="icon-active" />}
                                                    {milestone.status === 'pending' && <AlertCircle size={14} className="icon-pending" />}
                                                    <span className="milestone-title">{milestone.title}</span>
                                                </div>
                                                <div className="milestone-amount">
                                                    <span>{formatCurrency(milestone.amount)}</span>
                                                    <span className={`milestone-status ${getStatusColor(milestone.status)}`}>
                                                        {milestone.status === 'in-progress' ? 'In-Progress' : milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Payments View */}
            {activeTab === 'payments' && (
                <div className="payment-list">
                    {paymentHistory.length === 0 ? (
                        <div className="empty-state">
                            <h3>No payment history</h3>
                            <p>You haven't received any payments yet.</p>
                        </div>
                    ) : (
                        <div className="payments-grid">
                            {paymentHistory.map((payment) => (
                                <div key={payment.id} className="payment-card">
                                    <div className="payment-card-header">
                                        <img src={payment.clientAvatar} alt={payment.clientName} className="payment-avatar" />
                                        <div className="payment-info">
                                            <h3 className="payment-project">{payment.projectTitle}</h3>
                                            <span className="payment-client">{payment.clientName}</span>
                                        </div>
                                        <span className={`status-badge ${getStatusColor(payment.status)}`}>
                                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="payment-details">
                                        <div className="payment-amount-row">
                                            <span className="payment-amount">{formatCurrency(payment.amount)}</span>
                                        </div>
                                        <div className="payment-meta">
                                            <span>{formatDate(payment.paymentDate)}</span>
                                            <span>•</span>
                                            <span>{payment.paymentMethod}</span>
                                        </div>
                                        <span className="transaction-id">{payment.transactionId}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
