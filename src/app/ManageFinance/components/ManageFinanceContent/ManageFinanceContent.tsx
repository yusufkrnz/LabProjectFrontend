import { DollarSign, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

    // Generate chart data
    const chartData = [
        { month: 'Jul', earnings: 1850 },
        { month: 'Aug', earnings: 2400 },
        { month: 'Sep', earnings: 1900 },
        { month: 'Oct', earnings: 2800 },
        { month: 'Nov', earnings: 2100 },
        { month: 'Dec', earnings: paymentHistory.reduce((sum, p) => sum + p.amount, 0) || 4350 },
    ];

    const totalEarnings = paymentHistory.reduce((sum, p) => sum + p.amount, 0);

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
        if (active && payload && payload.length) {
            return (
                <div className="chart-tooltip">
                    <p className="tooltip-label">{label}</p>
                    <p className="tooltip-value">{formatCurrency(payload[0].value)}</p>
                </div>
            );
        }
        return null;
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
                        : 'View your earnings and payment history'
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
                <div className="payment-section">
                    {/* Chart Section */}
                    <div className="chart-container">
                        <div className="chart-header">
                            <div className="chart-info">
                                <h3 className="chart-title">Earnings</h3>
                                <span className="chart-total-value">{formatCurrency(totalEarnings)}</span>
                            </div>
                            <div className="chart-meta">
                                <span className="meta-item">
                                    <span className="meta-dot"></span>
                                    Last 6 months
                                </span>
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1f2328" stopOpacity={0.15} />
                                            <stop offset="100%" stopColor="#1f2328" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }}
                                        dy={12}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                        tickFormatter={(value) => `$${value}`}
                                        dx={-5}
                                        width={60}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="linear"
                                        dataKey="earnings"
                                        stroke="#1f2328"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorEarnings)"
                                        dot={{ fill: '#1f2328', strokeWidth: 0, r: 4 }}
                                        activeDot={{ fill: '#1f2328', strokeWidth: 3, stroke: '#fff', r: 6 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Payment History Table */}
                    <div className="payment-table-container">
                        <h3 className="table-title">Transactions</h3>
                        <div className="payments-table">
                            <div className="table-header">
                                <span>Project</span>
                                <span>Client</span>
                                <span>Amount</span>
                                <span>Date</span>
                                <span>Method</span>
                                <span>Status</span>
                            </div>
                            {paymentHistory.map((payment) => (
                                <div key={payment.id} className="table-row">
                                    <div className="table-project">
                                        <span className="project-title">{payment.projectTitle}</span>
                                        <span className="transaction-id">{payment.transactionId}</span>
                                    </div>
                                    <div className="table-client">
                                        <img src={payment.clientAvatar} alt={payment.clientName} />
                                        <span>{payment.clientName}</span>
                                    </div>
                                    <span className="table-amount">{formatCurrency(payment.amount)}</span>
                                    <span className="table-date">{formatDate(payment.paymentDate)}</span>
                                    <span className="table-method">{payment.paymentMethod}</span>
                                    <span className={`status-badge ${getStatusColor(payment.status)}`}>
                                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
