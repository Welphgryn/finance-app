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
  netWorth
