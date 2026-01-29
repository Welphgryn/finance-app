import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Lock, TrendingUp, TrendingDown, DollarSign, CreditCard, Landmark, PiggyBank, Briefcase, Plus, Trash2, Edit2, Check, X, ChevronDown, ChevronUp, FileText } from 'lucide-react';

// Initial data structure based on Seth's spreadsheets
const initialData = {
  liquidAccounts: [
    { id: 1, name: "Seth's CPB Music/Doordash", balance: 332.01, type: "Personal Checking" },
    { id: 2, name: "Ohana Business", balance: 271.20, type: "Business Checking" },
    { id: 3, name: "Seth's Gather", balance: 94.03, type: "Savings" },
    { id: 4, name: "Emergency Fund", balance: 0.00, type: "ASB Savings", goal: 30000 },
    { id: 5, name: "General Checking", balance: 3885.92, type: "ASB Checking", goal: 10000 },
  ],
  creditCards: [
    { id: 1, name: "Chase Marriott 9021", balance: 12096.68, monthlyPayment: 417, apr: 0 },
    { id: 2, name: "Hawaiian Miles 0264", balance: 6509.08, monthlyPayment: 128, apr: 5.9 },
    { id: 3, name: "CitiCard", balance: 0, monthlyPayment: 0, apr: 20.49 },
    { id: 4, name: "Discover Card 0766", balance: 6161.63, monthlyPayment: 135.31, apr: 24 },
    { id: 5, name: "Discover It 4066", balance: 0, monthlyPayment: 100.38, apr: 24 },
    { id: 6, name: "Slate", balance: 500, monthlyPayment: 0, apr: 0 },
  ],
  loans: [
    { id: 1, name: "OneMain", balance: 0, monthlyPayment: 481.81, apr: 17.85 },
    { id: 2, name: "Sweet Water", balance: 0, monthlyPayment: 33, apr: 0 },
    { id: 3, name: "Upgrade", balance: 705.63, monthlyPayment: 65.75, apr: 0 },
    { id: 4, name: "Discover Personal Loan", balance: 8689.44, monthlyPayment: 0, apr: 18.99 },
    { id: 5, name: "Ally (Car Loan)", balance: 11400.47, monthlyPayment: 373.95, apr: 10.19 },
  ],
  studentLoans: [
    { id: 1, name: "Seth - FedLoan", balance: 78383.69 },
    { id: 2, name: "Elise - Nelnet", balance: 14921.30 },
  ],
  businessDebt: [
    { id: 1, name: "Dell (seth_macomber@hotmail.com)", balance: 0, creditLimit: 4500 },
    { id: 2, name: "Dell (seth.macomber@gmail.com)", balance: 1859.73, creditLimit: 5000 },
  ],
  investments: [
    { id: 1, name: "Seth - Schwab Brokerage", balance: 0.72, type: "Brokerage" },
    { id: 2, name: "Seth - Robinhood", balance: 5.71, type: "Stocks" },
    { id: 3, name: "Seth - Schwab Index", balance: 0.64, type: "Index" },
    { id: 4, name: "Seth - Roth IRA", balance: 50.37, type: "Roth IRA" },
    { id: 5, name: "Seth - Trad IRA", balance: 791.18, type: "Traditional IRA" },
    { id: 6, name: "Elise - Robinhood", balance: 4685.91, type: "Brokerage" },
    { id: 7, name: "Elise - 401k", balance: 24132.00, type: "401k" },
    { id: 8, name: "Crypto - Trust Wallet", balance: 4.69, type: "Crypto" },
    { id: 9, name: "Crypto - Crypto.com", balance: 2432.52, type: "Crypto" },
  ],
  vehicle: { name: "Toyota Highlander", value: 12577.00 },
  incomeStreams: [
    { id: 1, name: "Seth's W2", annualAmount: 90000, type: "Salary" },
    { id: 2, name: "Elise's W2", annualAmount: 99800, type: "Salary" },
  ],
  monthlyIncome: [
    { id: 1, month: "January 2026", obs: 10835, spencers: 4600, kmha: 1400, other: 2505, total: 19340 },
    { id: 2, month: "February 2026", obs: 565, spencers: 5200, kmha: 1400, other: 0, total: 7165 },
  ],
  invoices: [
    { id: 1, date: "2026-01-28", customer: "Semprose", description: "1099s", amount: 150, status: "NOT YET INVOICED" },
    { id: 2, date: "2026-01-28", customer: "Semprose", description: "PPR Reimbursement", amount: 9.56, status: "NOT YET INVOICED" },
    { id: 3, date: "2026-01-28", customer: "Dino", description: "1040 Tax", amount: 78, status: "NOT YET INVOICED" },
  ],
  netWorthHistory: [
    { month: "July 2025", assets: 46093.01, liabilities: 133268.23, netWorth: -87175.22 },
  ],
};

const PASSWORD = "ohana2026";

// Utility functions
const formatCurrency = (amount) => {
  const num = parseFloat(amount) || 0;
  const formatted = Math.abs(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return num < 0 ? `-$${formatted}` : `$${formatted}`;
};

const formatPercent = (num) => `${parseFloat(num || 0).toFixed(2)}%`;

// Password Screen Component
const PasswordScreen = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: '48px',
        width: '100%',
        maxWidth: '400px',
        margin: '20px',
        backdropFilter: 'blur(20px)',
        animation: shake ? 'shake 0.5s ease-in-out' : 'fadeIn 0.6s ease-out',
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
        `}</style>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 32px rgba(0, 217, 255, 0.3)',
          }}>
            <Lock size={28} color="#0a0a0f" strokeWidth={2.5} />
          </div>
          <h1 style={{
            color: '#fff',
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 8px',
            letterSpacing: '-0.5px',
          }}>Finance Dashboard</h1>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            margin: 0,
          }}>Enter password to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Password"
            style={{
              width: '100%',
              padding: '16px 20px',
              background: 'rgba(255,255,255,0.05)',
              border: error ? '2px solid #ff4757' : '2px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => e.target.style.borderColor = '#00d9ff'}
            onBlur={(e) => e.target.style.borderColor = error ? '#ff4757' : 'rgba(255,255,255,0.1)'}
          />
          {error && (
            <p style={{ color: '#ff4757', fontSize: '13px', margin: '8px 0 0', textAlign: 'center' }}>
              Incorrect password
            </p>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)',
              border: 'none',
              borderRadius: '12px',
              color: '#0a0a0f',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '20px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 24px rgba(0, 217, 255, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

// Card Component
const Card = ({ children, title, icon: Icon, color = '#00d9ff', collapsible = false, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px',
      padding: '24px',
      marginBottom: '20px',
    }}>
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: isOpen ? '20px' : '0',
          cursor: collapsible ? 'pointer' : 'default',
        }}
        onClick={() => collapsible && setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {Icon && (
            <div style={{
              width: '40px',
              height: '40px',
              background: `${color}15`,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon size={20} color={color} />
            </div>
          )}
          <h3 style={{
            color: '#fff',
            fontSize: '18px',
            fontWeight: '600',
            margin: 0,
          }}>{title}</h3>
        </div>
        {collapsible && (
          isOpen ? <ChevronUp size={20} color="rgba(255,255,255,0.5)" /> : <ChevronDown size={20} color="rgba(255,255,255,0.5)" />
        )}
      </div>
      {isOpen && children}
    </div>
  );
};

// Stat Card Component
const StatCard = ({ label, value, trend, color = '#00d9ff', subtitle }) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '20px',
    flex: 1,
    minWidth: '200px',
  }}>
    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      {label}
    </p>
    <p style={{
      color: color,
      fontSize: '28px',
      fontWeight: '700',
      margin: '0 0 4px',
      fontFamily: "'Space Mono', monospace",
    }}>
      {value}
    </p>
    {subtitle && (
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>{subtitle}</p>
    )}
    {trend && (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
        {trend > 0 ? <TrendingUp size={14} color="#00ff88" /> : <TrendingDown size={14} color="#ff4757" />}
        <span style={{ color: trend > 0 ? '#00ff88' : '#ff4757', fontSize: '13px' }}>
          {Math.abs(trend).toFixed(1)}%
        </span>
      </div>
    )}
  </div>
);

// Editable Row Component
const EditableRow = ({ item, fields, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(item);

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  return (
    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      {fields.map((field, idx) => (
        <td key={idx} style={{ padding: '12px 8px', color: field.color || 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
          {isEditing && field.editable !== false ? (
            <input
              type={field.type || 'text'}
              value={editData[field.key] || ''}
              onChange={(e) => setEditData({ ...editData, [field.key]: field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value })}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px',
                padding: '6px 10px',
                color: '#fff',
                fontSize: '14px',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
          ) : (
            field.format ? field.format(item[field.key]) : item[field.key]
          )}
        </td>
      ))}
      <td style={{ padding: '12px 8px', textAlign: 'right' }}>
        {isEditing ? (
          <>
            <button onClick={handleSave} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
              <Check size={16} color="#00ff88" />
            </button>
            <button onClick={() => { setIsEditing(false); setEditData(item); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
              <X size={16} color="#ff4757" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
              <Edit2 size={14} color="rgba(255,255,255,0.4)" />
            </button>
            <button onClick={() => onDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
              <Trash2 size={14} color="rgba(255,255,255,0.4)" />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

// Table Component
const DataTable = ({ data, fields, onUpdate, onDelete, onAdd, addFields }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({});

  const handleAdd = () => {
    if (Object.keys(newItem).length > 0) {
      onAdd({ ...newItem, id: Date.now() });
      setNewItem({});
      setShowAddForm(false);
    }
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {fields.map((field, idx) => (
              <th key={idx} style={{
                textAlign: 'left',
                padding: '12px 8px',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '12px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}>
                {field.label}
              </th>
            ))}
            <th style={{ width: '60px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <EditableRow
              key={item.id}
              item={item}
              fields={fields}
              onSave={(updated) => onUpdate(item.id, updated)}
              onDelete={onDelete}
            />
          ))}
          {showAddForm && (
            <tr>
              {(addFields || fields).map((field, idx) => (
                <td key={idx} style={{ padding: '12px 8px' }}>
                  {field.editable !== false && (
                    <input
                      type={field.type || 'text'}
                      placeholder={field.label}
                      value={newItem[field.key] || ''}
                      onChange={(e) => setNewItem({ ...newItem, [field.key]: field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value })}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        color: '#fff',
                        fontSize: '14px',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                    />
                  )}
                </td>
              ))}
              <td style={{ padding: '12px 8px' }}>
                <button onClick={handleAdd} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <Check size={16} color="#00ff88" />
                </button>
                <button onClick={() => { setShowAddForm(false); setNewItem({}); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <X size={16} color="#ff4757" />
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px dashed rgba(255,255,255,0.2)',
            borderRadius: '8px',
            padding: '10px 16px',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '14px',
            cursor: 'pointer',
            marginTop: '12px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Plus size={16} /> Add New
        </button>
      )}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = ({ data, setData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate totals
  const totalLiquid = data.liquidAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalCreditCards = data.creditCards.reduce((sum, card) => sum + card.balance, 0);
  const totalLoans = data.loans.reduce((sum, loan) => sum + loan.balance, 0);
  const totalStudentLoans = data.studentLoans.reduce((sum, loan) => sum + loan.balance, 0);
  const totalBusinessDebt = data.businessDebt.reduce((sum, debt) => sum + debt.balance, 0);
  const totalInvestments = data.investments.reduce((sum, inv) => sum + inv.balance, 0);
  const vehicleValue = data.vehicle.value;

  const totalAssets = totalLiquid + totalInvestments + vehicleValue;
  const totalLiabilities = totalCreditCards + totalLoans + totalStudentLoans + totalBusinessDebt;
  const netWorth = totalAssets - totalLiabilities;

  const totalMonthlyDebtPayment = 
    data.creditCards.reduce((sum, card) => sum + card.monthlyPayment, 0) +
    data.loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);

  // Update functions
  const updateItem = (category, id, updated) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].map(item => item.id === id ? updated : item)
    }));
  };

  const deleteItem = (category, id) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  const addItem = (category, item) => {
    setData(prev => ({
      ...prev,
      [category]: [...prev[category], item]
    }));
  };

  // Add net worth snapshot
  const addNetWorthSnapshot = () => {
    const today = new Date();
    const monthYear = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const snapshot = {
      month: monthYear,
      assets: totalAssets,
      liabilities: totalLiabilities,
      netWorth: netWorth,
    };
    setData(prev => ({
      ...prev,
      netWorthHistory: [...prev.netWorthHistory, snapshot]
    }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'debt', label: 'Debt' },
    { id: 'assets', label: 'Assets' },
    { id: 'income', label: 'Income' },
    { id: 'invoices', label: 'Invoices' },
  ];

  const COLORS = ['#00d9ff', '#00ff88', '#ff4757', '#ffa502', '#a55eea', '#ff6b81', '#70a1ff', '#7bed9f'];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '20px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <h1 style={{
              color: '#fff',
              fontSize: '32px',
              fontWeight: '700',
              margin: '0 0 4px',
              letterSpacing: '-0.5px',
            }}>Finance Dashboard</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '14px' }}>
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={addNetWorthSnapshot}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              color: '#0a0a0f',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <Plus size={18} /> Save Snapshot
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px',
                background: activeTab === tab.id ? 'rgba(0, 217, 255, 0.15)' : 'rgba(255,255,255,0.03)',
                border: activeTab === tab.id ? '1px solid rgba(0, 217, 255, 0.3)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                color: activeTab === tab.id ? '#00d9ff' : 'rgba(255,255,255,0.6)',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Summary Stats */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <StatCard
                label="Net Worth"
                value={formatCurrency(netWorth)}
                color={netWorth >= 0 ? '#00ff88' : '#ff4757'}
              />
              <StatCard
                label="Total Assets"
                value={formatCurrency(totalAssets)}
                color="#00d9ff"
              />
              <StatCard
                label="Total Liabilities"
                value={formatCurrency(totalLiabilities)}
                color="#ff4757"
              />
              <StatCard
                label="Monthly Debt Payment"
                value={formatCurrency(totalMonthlyDebtPayment)}
                color="#ffa502"
              />
            </div>

            {/* Net Worth Chart */}
            <Card title="Net Worth History" icon={TrendingUp} color="#00ff88">
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.netWorthHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 12 }} />
                    <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Line type="monotone" dataKey="assets" stroke="#00d9ff" strokeWidth={2} dot={{ fill: '#00d9ff' }} name="Assets" />
                    <Line type="monotone" dataKey="liabilities" stroke="#ff4757" strokeWidth={2} dot={{ fill: '#ff4757' }} name="Liabilities" />
                    <Line type="monotone" dataKey="netWorth" stroke="#00ff88" strokeWidth={3} dot={{ fill: '#00ff88' }} name="Net Worth" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Asset Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
              <Card title="Asset Breakdown" icon={PiggyBank} color="#00d9ff">
                <div style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Liquid', value: totalLiquid },
                          { name: 'Investments', value: totalInvestments },
                          { name: 'Vehicle', value: vehicleValue },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {[0,1,2].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        formatter={(value) => formatCurrency(value)}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  {[
                    { name: 'Liquid', value: totalLiquid, color: COLORS[0] },
                    { name: 'Investments', value: totalInvestments, color: COLORS[1] },
                    { name: 'Vehicle', value: vehicleValue, color: COLORS[2] },
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: item.color }} />
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>{item.name}: {formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Debt Breakdown" icon={CreditCard} color="#ff4757">
                <div style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Credit Cards', value: totalCreditCards },
                          { name: 'Loans', value: totalLoans },
                          { name: 'Student Loans', value: totalStudentLoans },
                          { name: 'Business', value: totalBusinessDebt },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {[0,1,2,3].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index + 3]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        formatter={(value) => formatCurrency(value)}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  {[
                    { name: 'Credit Cards', value: totalCreditCards, color: COLORS[3] },
                    { name: 'Loans', value: totalLoans, color: COLORS[4] },
                    { name: 'Student', value: totalStudentLoans, color: COLORS[5] },
                    { name: 'Business', value: totalBusinessDebt, color: COLORS[6] },
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: item.color }} />
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>{item.name}: {formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Debt Tab */}
        {activeTab === 'debt' && (
          <>
            <Card title="Credit Cards" icon={CreditCard} color="#ff4757" collapsible defaultOpen>
              <DataTable
                data={data.creditCards}
                fields={[
                  { key: 'name', label: 'Name' },
                  { key: 'balance', label: 'Balance', type: 'number', format: formatCurrency, color: '#ff4757' },
                  { key: 'monthlyPayment', label: 'Monthly Payment', type: 'number', format: formatCurrency },
                  { key: 'apr', label: 'APR', type: 'number', format: formatPercent },
                ]}
                onUpdate={(id, updated) => updateItem('creditCards', id, updated)}
                onDelete={(id) => deleteItem('creditCards', id)}
                onAdd={(item) => addItem('creditCards', item)}
              />
              <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(255,71,87,0.1)', borderRadius: '10px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Total: </span>
                <span style={{ color: '#ff4757', fontWeight: '600', fontFamily: "'Space Mono', monospace" }}>{formatCurrency(totalCreditCards)}</span>
              </div>
            </Card>

            <Card title="Loans & Installments" icon={Landmark} color="#ffa502" collapsible defaultOpen>
              <DataTable
                data={data.loans}
                fields={[
                  { key: 'name', label: 'Name' },
                  { key: 'balance', label: 'Balance', type: 'number', format: formatCurrency, color: '#ffa502' },
                  { key: 'monthlyPayment', label: 'Monthly Payment', type: 'number', format: formatCurrency },
                  { key: 'apr', label: 'APR', type: 'number', format: formatPercent },
                ]}
                onUpdate={(id, updated) => updateItem('loans', id, updated)}
                onDelete={(id) => deleteItem('loans', id)}
                onAdd={(item) => addItem('loans', item)}
              />
              <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(255,165,2,0.1)', borderRadius: '10px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Total: </span>
                <span style={{ color: '#ffa502', fontWeight: '600', fontFamily: "'Space Mono', monospace" }}>{formatCurrency(totalLoans)}</span>
              </div>
            </Card>

            <Card title="Student Loans" icon={Landmark} color="#a55eea" collapsible defaultOpen>
              <DataTable
                data={data.studentLoans}
                fields={[
                  { key: 'name', label: 'Name' },
                  { key: 'balance', label: 'Balance', type: 'number', format: formatCurrency, color: '#a55eea' },
                ]}
                onUpdate={(id, updated) => updateItem('studentLoans', id, updated)}
                onDelete={(id) => deleteItem('studentLoans', id)}
                onAdd={(item) => addItem('studentLoans', item)}
              />
              <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(165,94,234,0.1)', borderRadius: '10px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Total: </span>
                <span style={{ color: '#a55eea', fontWeight: '600', fontFamily: "'Space Mono', monospace" }}>{formatCurrency(totalStudentLoans)}</span>
              </div>
            </Card>

            <Card title="Business Debt (OBS)" icon={Briefcase} color="#70a1ff" collapsible defaultOpen>
              <DataTable
                data={data.businessDebt}
                fields={[
                  { key: 'name', label: 'Name' },
                  { key: 'balance', label: 'Balance', type: 'number', format: formatCurrency, color: '#70a1ff' },
                  { key: 'creditLimit', label: 'Credit Limit', type: 'number', format: formatCurrency },
                ]}
                onUpdate={(id, updated) => updateItem('businessDebt', id, updated)}
                onDelete={(id) => deleteItem('businessDebt', id)}
                onAdd={(item) => addItem('businessDebt', item)}
              />
              <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(112,161,255,0.1)', borderRadius: '10px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Total: </span>
                <span style={{ color: '#70a1ff', fontWeight: '600', fontFamily: "'Space Mono', monospace" }}>{formatCurrency(totalBusinessDebt)}</span>
              </div>
            </Card>
          </>
        )}

        {/* Assets Tab */}
        {activeTab === 'assets' && (
          <>
            <Card title="Liquid Accounts" icon={DollarSign} color="#00d9ff" collapsible defaultOpen>
              <DataTable
                data={data.liquidAccounts}
                fields={[
                  { key: 'name', label: 'Account' },
                  { key: 'type', label: 'Type' },
                  { key: 'balance', label: 'Balance', type: 'number', format: formatCurrency, color: '#00d9ff' },
                  { key: 'goal', label: 'Goal', type: 'number', format: (v) => v ? formatCurrency(v) : '-' },
                ]}
                onUpdate={(id, updated) => updateItem('liquidAccounts', id, updated)}
                onDelete={(id) => deleteItem('liquidAccounts', id)}
                onAdd={(item) => addItem('liquidAccounts', item)}
              />
              <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(0,217,255,0.1)', borderRadius: '10px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Total Liquid: </span>
                <span style={{ color: '#00d9ff', fontWeight: '600', fontFamily: "'Space Mono', monospace" }}>{formatCurrency(totalLiquid)}</span>
              </div>
            </Card>

            <Card title="Investments" icon={TrendingUp} color="#00ff88" collapsible defaultOpen>
              <DataTable
                data={data.investments}
                fields={[
                  { key: 'name', label: 'Account' },
                  { key: 'type', label: 'Type' },
                  { key: 'balance', label: 'Balance', type: 'number', format: formatCurrency, color: '#00ff88' },
                ]}
                onUpdate={(id, updated) => updateItem('investments', id, updated)}
                onDelete={(id) => deleteItem('investments', id)}
                onAdd={(item) => addItem('investments', item)}
              />
              <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(0,255,136,0.1)', borderRadius: '10px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Total Investments: </span>
                <span style={{ color: '#00ff88', fontWeight: '600', fontFamily: "'Space Mono', monospace" }}>{formatCurrency(totalInvestments)}</span>
              </div>
            </Card>

            <Card title="Vehicle" icon={PiggyBank} color="#ffa502" collapsible defaultOpen>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>{data.vehicle.name}</span>
                <span style={{ color: '#ffa502', fontWeight: '600', fontFamily: "'Space Mono', monospace", fontSize: '18px' }}>{formatCurrency(data.vehicle.value)}</span>
              </div>
            </Card>
          </>
        )}

        {/* Income Tab */}
        {activeTab === 'income' && (
          <>
            <Card title="Income Streams" icon={DollarSign} color="#00ff88" collapsible defaultOpen>
              <DataTable
                data={data.incomeStreams}
                fields={[
                  { key: 'name', label: 'Source' },
                  { key: 'type', label: 'Type' },
                  { key: 'annualAmount', label: 'Annual Amount', type: 'number', format: formatCurrency, color: '#00ff88' },
                ]}
                onUpdate={(id, updated) => updateItem('incomeStreams', id, updated)}
                onDelete={(id) => deleteItem('incomeStreams', id)}
                onAdd={(item) => addItem('incomeStreams', item)}
              />
            </Card>

            <Card title="Monthly Income Tracking" icon={TrendingUp} color="#00d9ff" collapsible defaultOpen>
              <div style={{ height: '300px', marginBottom: '20px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.monthlyIncome}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 12 }} />
                    <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Bar dataKey="obs" name="OBS" fill="#00d9ff" stackId="a" />
                    <Bar dataKey="spencers" name="Spencer's" fill="#00ff88" stackId="a" />
                    <Bar dataKey="kmha" name="KMHA" fill="#ffa502" stackId="a" />
                    <Bar dataKey="other" name="Other" fill="#a55eea" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <DataTable
                data={data.monthlyIncome}
                fields={[
                  { key: 'month', label: 'Month' },
                  { key: 'obs', label: 'OBS', type: 'number', format: formatCurrency },
                  { key: 'spencers', label: "Spencer's", type: 'number', format: formatCurrency },
                  { key: 'kmha', label: 'KMHA', type: 'number', format: formatCurrency },
                  { key: 'other', label: 'Other', type: 'number', format: formatCurrency },
                  { key: 'total', label: 'Total', type: 'number', format: formatCurrency, color: '#00ff88', editable: false },
                ]}
                onUpdate={(id, updated) => {
                  updated.total = (updated.obs || 0) + (updated.spencers || 0) + (updated.kmha || 0) + (updated.other || 0);
                  updateItem('monthlyIncome', id, updated);
                }}
                onDelete={(id) => deleteItem('monthlyIncome', id)}
                onAdd={(item) => {
                  item.total = (item.obs || 0) + (item.spencers || 0) + (item.kmha || 0) + (item.other || 0);
                  addItem('monthlyIncome', item);
                }}
              />
            </Card>
          </>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <Card title="Outstanding Invoices" icon={FileText} color="#ffa502" collapsible defaultOpen>
            <DataTable
              data={data.invoices}
              fields={[
                { key: 'date', label: 'Date' },
                { key: 'customer', label: 'Customer' },
                { key: 'description', label: 'Description' },
                { key: 'amount', label: 'Amount', type: 'number', format: formatCurrency, color: '#00ff88' },
                { key: 'status', label: 'Status' },
              ]}
              onUpdate={(id, updated) => updateItem('invoices', id, updated)}
              onDelete={(id) => deleteItem('invoices', id)}
              onAdd={(item) => addItem('invoices', item)}
            />
            <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(255,165,2,0.1)', borderRadius: '10px' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Total Outstanding: </span>
              <span style={{ color: '#ffa502', fontWeight: '600', fontFamily: "'Space Mono', monospace" }}>
                {formatCurrency(data.invoices.reduce((sum, inv) => sum + inv.amount, 0))}
              </span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState(initialData);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('financeData');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved data');
      }
    }
    
    const auth = sessionStorage.getItem('financeAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('financeData', JSON.stringify(data));
  }, [data]);

  const handleUnlock = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('financeAuth', 'true');
  };

  if (!isAuthenticated) {
    return <PasswordScreen onUnlock={handleUnlock} />;
  }

  return <Dashboard data={data} setData={setData} />;
}
